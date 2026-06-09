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

if (!isset($data->text) || empty(trim($data->text))) {
    echo json_encode(["success" => false, "message" => "Text to convert is required."]);
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
$rawText = $data->text;

// Construct Prompt
$prompt = "You are an expert UI/UX developer and SEO specialist. Your task is to convert the following raw text into a beautiful, highly structured, and SEO-friendly Tailwind CSS HTML component.
DO NOT use generic markdown HTML. You MUST use the exact Tailwind HTML structures provided below for specific types of content.

MAPPING RULES:

1. For standard paragraphs and introduction:
Use: `<p class=\"text-zinc-600 leading-relaxed mb-6 font-medium\">`
Highlight keywords using `<strong class=\"text-zinc-900 font-bold\">`

2. For 'What You Will Learn' or similar lists of outcomes, use THIS exact structure:
<div class=\"bg-green-50/50 rounded-[32px] p-6 md:p-8 mb-10 border border-green-100 shadow-sm\">
  <h3 class=\"text-xl font-bold text-green-900 flex items-center gap-3 mb-6\">
    <svg class=\"w-6 h-6 text-green-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\"></path></svg>
    What You Will Learn
  </h3>
  <ul class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
    <!-- For each item: -->
    <li class=\"flex items-start gap-3\">
      <svg class=\"w-5 h-5 text-green-500 mt-0.5 shrink-0\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg>
      <span class=\"text-zinc-700 font-medium text-sm\">Item text here</span>
    </li>
  </ul>
</div>

3. For 'Prerequisites' or 'Requirements', use THIS exact structure:
<div class=\"bg-slate-50/50 rounded-[32px] p-6 md:p-8 mb-10 border border-slate-100 shadow-sm\">
  <h3 class=\"text-xl font-bold text-slate-800 flex items-center gap-3 mb-6\">
    <div class=\"w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0\">
      <svg class=\"w-4 h-4 text-blue-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253\"></path></svg>
    </div>
    Prerequisites
  </h3>
  <ul class=\"space-y-3\">
    <!-- For each item: -->
    <li class=\"bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm flex items-center gap-3\">
      <div class=\"w-2 h-2 rounded-full bg-blue-600 shrink-0\"></div>
      <span class=\"text-zinc-700 font-medium text-sm\">Item text here</span>
    </li>
  </ul>
</div>

4. For 'Why Choose Us', 'Features', or 'Benefits', use a grid of cards:
<h3 class=\"text-2xl font-bold text-zinc-900 mb-6\">Section Title</h3>
<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-10\">
  <!-- For each feature: -->
  <div class=\"bg-white rounded-[24px] p-6 border border-zinc-100 shadow-sm flex items-start gap-4 hover:border-blue-200 hover:shadow-md transition-all\">
    <div class=\"w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100\">
      <svg class=\"w-5 h-5 text-slate-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 10V3L4 14h7v7l9-11h-7z\"></path></svg>
    </div>
    <div>
      <h4 class=\"text-sm font-bold text-zinc-900 mb-1\">Feature Title</h4>
      <p class=\"text-xs text-zinc-500 font-medium leading-relaxed\">Feature description</p>
    </div>
  </div>
</div>

5. For 'Certification' and 'Job Assistance' or other major offerings, use large cards:
<div class=\"grid grid-cols-1 md:grid-cols-2 gap-6 mb-10\">
  <!-- For each item: -->
  <div class=\"bg-white rounded-[32px] p-8 border border-zinc-100 shadow-sm hover:shadow-md transition-all\">
    <div class=\"w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 mb-6\">
      <svg class=\"w-6 h-6 text-teal-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z\"></path></svg>
    </div>
    <h4 class=\"text-lg font-bold text-zinc-900 mb-3\">Card Title</h4>
    <p class=\"text-sm text-zinc-500 font-medium leading-relaxed\">Detailed description text.</p>
  </div>
</div>

Do NOT include <html>, <body>, or ```html tags. Only output the raw inner HTML string. Carefully match the raw text content into these specific templates.

Text to convert:
$rawText
";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.groq.com/openai/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);

$postData = [
    "model" => "llama-3.1-8b-instant",
    "messages" => [
        [
            "role" => "system",
            "content" => "You are an expert UI developer. Return ONLY the clean, well-formatted Tailwind HTML string following the exact template structures requested. No markdown formatting."
        ],
        [
            "role" => "user",
            "content" => $prompt
        ]
    ],
    "temperature" => 0.2, // Low temperature for consistent formatting
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
    
    // Clean up potential markdown formatting that the LLM might incorrectly output
    $content = preg_replace('/^```html\s*/i', '', $content);
    $content = preg_replace('/```\s*$/', '', $content);
    $content = trim($content);
    
    echo json_encode(["success" => true, "data" => ["html" => $content]]);
} else {
    echo json_encode(["success" => false, "message" => "API request failed.", "status" => $httpCode, "response" => $result]);
}
?>
