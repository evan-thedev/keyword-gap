/**
 * Keyword Gap Analyzer
 * Author: Evan Parrott (GitHub: evan-thedev)
 * License: MIT
 */

// Common stopwords to filter out
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'you', 'your', 'or', 'can', 'but',
  'not', 'this', 'have', 'had', 'been', 'were', 'their', 'they',
  'we', 'our', 'us', 'about', 'all', 'also', 'any', 'if', 'into',
  'may', 'more', 'most', 'than', 'then', 'there', 'these', 'those',
  'when', 'which', 'who', 'would', 'could', 'should'
]);

/**
 * Tokenize text into normalized words
 * @param {string} text - Input text to tokenize
 * @returns {string[]} Array of lowercase word tokens
 */
function tokenize(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }
  
  // Extract words (letters, numbers, hyphens within words)
  const words = text.toLowerCase()
    .match(/\b[\w-]+\b/g) || [];
  
  return words;
}

/**
 * Filter out stopwords from token array
 * @param {string[]} tokens - Array of word tokens
 * @returns {string[]} Filtered tokens without stopwords
 */
function filterStopwords(tokens) {
  return tokens.filter(word => !STOPWORDS.has(word));
}

/**
 * Create a Set of unique tokens from text
 * @param {string} text - Input text
 * @param {boolean} includeStopwords - Whether to include stopwords (default: false)
 * @returns {Set<string>} Set of unique tokens
 */
function getUniqueTokens(text, includeStopwords = false) {
  const tokens = tokenize(text);
  const filtered = includeStopwords ? tokens : filterStopwords(tokens);
  return new Set(filtered);
}

/**
 * Find keywords in job description that are missing from resume
 * @param {string} resumeText - Resume text
 * @param {string} jobDescText - Job description text
 * @returns {string[]} Array of missing keywords (sorted alphabetically)
 */
function findMissingKeywords(resumeText, jobDescText) {
  const resumeTokens = getUniqueTokens(resumeText);
  const jobTokens = getUniqueTokens(jobDescText);
  
  const missing = [];
  
  for (const token of jobTokens) {
    if (!resumeTokens.has(token)) {
      missing.push(token);
    }
  }
  
  return missing.sort();
}

/**
 * Highlight missing keywords in job description text
 * @param {string} jobDescText - Job description text
 * @param {string[]} missingKeywords - Array of missing keywords
 * @returns {string} HTML with highlighted keywords
 */
function highlightMissingKeywords(jobDescText, missingKeywords) {
  if (!missingKeywords || missingKeywords.length === 0) {
    return escapeHtml(jobDescText);
  }
  
  // Create a case-insensitive pattern for all missing keywords
  const pattern = missingKeywords
    .map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape regex special chars
    .join('|');
  
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');
  
  const highlighted = jobDescText.replace(regex, '<mark>$1</mark>');
  
  return highlighted;
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Export for Node.js testing (if in Node environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    tokenize,
    filterStopwords,
    getUniqueTokens,
    findMissingKeywords,
    highlightMissingKeywords,
    escapeHtml,
    STOPWORDS
  };
}
