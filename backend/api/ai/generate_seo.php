<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../../config/database.php';

require_once __DIR__ . '/../../config/image_helper.php';
$data = json_decode(file_get_contents("php://input"));
convertObjectImagesToWebp($data);

if (!isset($data->entity_type) || !isset($data->context)) {
    echo json_encode(["success" => false, "message" => "Entity type and context are required."]);
    exit();
}

// Fetch API Key from DB
$query = "SELECT groq_api_key FROM settings LIMIT 1";
$stmt = $pdo->prepare($query);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row || empty($row['groq_api_key'])) {
    echo json_encode(["success" => false, "message" => "Groq API key is not configured in settings."]);
    exit();
}

$apiKey = $row['groq_api_key'];
$entityType = $data->entity_type;
$context = $data->context;

// Construct Prompt
$prompt = "You are an expert SEO specialist for Extrabits Junior, a computer education institute in Surat, Gujarat. 
Generate highly optimized, locally focused SEO metadata for a '$entityType'. 
Details of the $entityType: $context.

Make sure the schema markup includes an \"image\" key-value pair with a placeholder link like 'https://extrabitsjunior.com/placeholder.jpg' if one is not provided in the context.

Return ONLY a valid JSON object with the following keys, and nothing else (no markdown formatting, no explanations):
{
  \"meta_title\": \"(A compelling meta title under 60 characters, including location if relevant)\",
  \"meta_description\": \"(A compelling meta description under 160 characters, including location if relevant)\",
  \"meta_keywords\": \"(Comma separated SEO keywords, including local keywords like Surat, Gujarat)\",
  \"og_title\": \"(Social media open graph title)\",
  \"og_description\": \"(Social media open graph description)\",
  \"schema_markup\": \"(Valid JSON-LD schema markup string representation. Escape quotes properly since it will be a string value in JSON)\"
}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.groq.com/openai/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);

$postData = [
    "model" => "llama-3.1-8b-instant", // Fast model for JSON tasks
    "messages" => [
        [
            "role" => "system",
            "content" => "You are an expert SEO specialist and JSON generator. Always return valid JSON."
        ],
        [
            "role" => "user",
            "content" => $prompt
        ]
    ],
    "response_format" => ["type" => "json_object"],
    "temperature" => 0.7,
    "max_tokens" => 8000
];

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));

$headers = [
    "Authorization: Bearer " . $apiKey,
    "Content-Type: application/json"
];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(["success" => false, "message" => "Curl error: " . curl_error($ch)]);
    curl_close($ch);
    exit();
}

curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    $responseObj = json_decode($result, true);
    $content = $responseObj['choices'][0]['message']['content'];
    
    // Attempt to parse the LLM's JSON response
    $parsedContent = json_decode($content, true);
    
    if ($parsedContent) {
        echo json_encode(["success" => true, "data" => $parsedContent]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to parse AI response as JSON.", "raw" => $content]);
    }
} else {
    echo json_encode(["success" => false, "message" => "API request failed.", "status" => $httpCode, "response" => $result]);
}
?>
