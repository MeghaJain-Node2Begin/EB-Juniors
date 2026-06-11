/**
 * Generates an SEO-friendly URL slug from a given string.
 * 
 * Rules:
 * - Converts to lowercase
 * - Removes accents/diacritics
 * - Replaces spaces and non-alphanumeric characters with hyphens
 * - Removes duplicate hyphens
 * - Trims hyphens from the start and end
 * 
 * @param text The string to slugify
 * @returns The SEO-friendly slug
 */
export function generateSlug(text: string): string {
  if (!text) return '';

  return text
    .toString()
    .normalize('NFD')                   // Split accented characters into base character and accent
    .replace(/[\u0300-\u036f]/g, '')   // Remove the accents
    .toLowerCase()                      // Convert to lowercase
    .trim()                             // Remove leading/trailing whitespace
    .replace(/[^a-z0-9 -]/g, '')        // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-')               // Replace spaces with hyphens
    .replace(/-+/g, '-')                // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-+/, '')                 // Remove hyphens from the start
    .replace(/-+$/, '');                // Remove hyphens from the end
}
