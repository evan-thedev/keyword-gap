/**
 * Test suite for keyword gap analyzer
 * Run with: node test.js
 */

const {
  tokenize,
  filterStopwords,
  getUniqueTokens,
  findMissingKeywords,
  STOPWORDS
} = require('./keywords.js');

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✓ ${testName}`);
    passed++;
  } else {
    console.error(`✗ ${testName}`);
    failed++;
  }
}

function assertArrayEquals(arr1, arr2, testName) {
  const equal = arr1.length === arr2.length && 
                arr1.every((val, idx) => val === arr2[idx]);
  assert(equal, testName);
  if (!equal) {
    console.log('  Expected:', arr2);
    console.log('  Got:     ', arr1);
  }
}

function assertSetEquals(set1, set2, testName) {
  const equal = set1.size === set2.size &&
                [...set1].every(val => set2.has(val));
  assert(equal, testName);
  if (!equal) {
    console.log('  Expected:', [...set2]);
    console.log('  Got:     ', [...set1]);
  }
}

console.log('\n=== Running Keyword Gap Tests ===\n');

// Test tokenize
console.log('--- tokenize() tests ---');
assertArrayEquals(
  tokenize('Hello World'),
  ['hello', 'world'],
  'tokenize basic words'
);

assertArrayEquals(
  tokenize('JavaScript, Python & Node.js'),
  ['javascript', 'python', 'node', 'js'],
  'tokenize with punctuation'
);

assertArrayEquals(
  tokenize('Full-Stack Developer'),
  ['full-stack', 'developer'],
  'tokenize preserves hyphens'
);

assertArrayEquals(
  tokenize(''),
  [],
  'tokenize empty string'
);

assertArrayEquals(
  tokenize(null),
  [],
  'tokenize null input'
);

assertArrayEquals(
  tokenize('AWS EC2 API'),
  ['aws', 'ec2', 'api'],
  'tokenize uppercase acronyms'
);

// Test filterStopwords
console.log('\n--- filterStopwords() tests ---');
assertArrayEquals(
  filterStopwords(['the', 'quick', 'brown', 'fox']),
  ['quick', 'brown', 'fox'],
  'filterStopwords removes common stopwords'
);

assertArrayEquals(
  filterStopwords(['react', 'and', 'node', 'with', 'express']),
  ['react', 'node', 'express'],
  'filterStopwords keeps meaningful words'
);

assertArrayEquals(
  filterStopwords([]),
  [],
  'filterStopwords handles empty array'
);

// Test getUniqueTokens
console.log('\n--- getUniqueTokens() tests ---');
assertSetEquals(
  getUniqueTokens('React React Node Node'),
  new Set(['react', 'node']),
  'getUniqueTokens returns unique tokens'
);

assertSetEquals(
  getUniqueTokens('The quick brown fox'),
  new Set(['quick', 'brown', 'fox']),
  'getUniqueTokens filters stopwords by default'
);

assertSetEquals(
  getUniqueTokens('The quick brown fox', true),
  new Set(['the', 'quick', 'brown', 'fox']),
  'getUniqueTokens includes stopwords when requested'
);

// Test findMissingKeywords
console.log('\n--- findMissingKeywords() tests ---');

const resume1 = 'JavaScript Python React Node.js';
const jobDesc1 = 'TypeScript React Angular AWS';

assertArrayEquals(
  findMissingKeywords(resume1, jobDesc1),
  ['angular', 'aws', 'typescript'],
  'findMissingKeywords finds missing keywords'
);

const resume2 = 'Senior Developer with React and Node.js experience';
const jobDesc2 = 'Looking for React and Node.js developer';

assertArrayEquals(
  findMissingKeywords(resume2, jobDesc2),
  ['looking'],
  'findMissingKeywords handles overlapping keywords'
);

const resume3 = 'Full-stack developer';
const jobDesc3 = 'full-stack engineer';

assertArrayEquals(
  findMissingKeywords(resume3, jobDesc3),
  ['engineer'],
  'findMissingKeywords is case-insensitive'
);

assertArrayEquals(
  findMissingKeywords('', 'React Node'),
  ['node', 'react'],
  'findMissingKeywords handles empty resume'
);

assertArrayEquals(
  findMissingKeywords('React Node', ''),
  [],
  'findMissingKeywords handles empty job description'
);

// Test realistic scenario
console.log('\n--- Realistic scenario test ---');
const realResume = `
Senior Software Engineer
5 years experience with JavaScript and Python
Built web applications using React and Django
Worked with PostgreSQL databases
Experience with Git and Docker
`;

const realJobDesc = `
Full Stack Engineer needed
Requirements:
- JavaScript and TypeScript experience
- React or Vue.js
- Node.js and Express
- MongoDB or PostgreSQL
- AWS cloud services
- Docker and Kubernetes
`;

const missing = findMissingKeywords(realResume, realJobDesc);
const expectedMissing = ['aws', 'cloud', 'express', 'full', 'js',
                        'kubernetes', 'mongodb', 'needed', 'node', 'requirements',
                        'services', 'stack', 'typescript', 'vue'];

assertArrayEquals(
  missing,
  expectedMissing,
  'realistic scenario finds correct missing keywords'
);

assert(
  missing.includes('typescript') && 
  missing.includes('kubernetes') && 
  missing.includes('mongodb'),
  'realistic scenario includes important technical keywords'
);

assert(
  !missing.includes('javascript') && 
  !missing.includes('react') && 
  !missing.includes('postgresql'),
  'realistic scenario excludes keywords present in resume'
);

// Test edge cases
console.log('\n--- Edge cases ---');
assert(
  STOPWORDS.has('the') && STOPWORDS.has('and') && STOPWORDS.has('is'),
  'STOPWORDS contains common words'
);

const tokens = tokenize('test-driven development');
assert(
  tokens.includes('test-driven'),
  'tokenize preserves hyphenated compound words'
);

// Summary
console.log('\n=== Test Results ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total:  ${passed + failed}`);

if (failed > 0) {
  console.log('\n❌ Some tests failed');
  process.exit(1);
} else {
  console.log('\n✅ All tests passed!');
  process.exit(0);
}
