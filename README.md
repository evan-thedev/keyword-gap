# Keyword Gap

**Find missing keywords between your resume and job descriptions.**

Paste a resume and a job description. Words in the JD that are missing from the resume light up. Everything stays in the browser.

## 🔒 Privacy First

- **100% local** - Nothing you paste ever leaves your device
- **No AI** - Simple word matching
- **No backend** - Works offline from your computer
- **No accounts** - No signup, no tracking, no data collection

## 🚀 Try It Now

**Live demo:** [https://evan-thedev.github.io/keyword-gap/](https://evan-thedev.github.io/keyword-gap/)

Or download `index.html` and open it from your computer (`file://` works).

## How It Works

1. **Paste your resume** in the left pane
2. **Paste a job description** in the right pane
3. **Click "Analyze Gap"** - missing keywords are highlighted in yellow
4. See which words from the JD aren't in your resume

### Sample Data

Click **"Load Sample"** to see it in action with pre-filled resume and job description.

## What It Does

- Tokenizes both texts into words (case-insensitive)
- Filters out common stopwords (a, the, and, etc.)
- Highlights JD words missing from your resume
- Shows counts and lists missing keywords

## What It Doesn't Do

- ❌ No ATS integration or scraping
- ❌ No AI analysis or suggestions
- ❌ No data sent to servers
- ❌ No fake claims about "beating ATS systems"

## Technical Details

**Built with:**
- Vanilla HTML, CSS, JavaScript (no frameworks)
- Single page application
- Mobile-friendly with big tap targets
- Works from `file://` protocol

**Files:**
- `index.html` - Main application (two-pane interface)
- `keywords.js` - Keyword extraction and matching logic
- `test.js` - Node.js test suite
- `test.html` - Browser-based test runner

## Running Tests

### Node.js
```bash
node test.js
```

### Browser
Open `test.html` in your browser to see test results.

## Future Features

- **Premium version ($9)** - Payment integration coming soon (placeholder visible on page)
- Word count caps and other premium features will be added later

## Local Development

No build step needed! Just:

1. Clone the repo
   ```bash
   git clone https://github.com/evan-thedev/keyword-gap.git
   cd keyword-gap
   ```

2. Open `index.html` in your browser
   ```bash
   open index.html  # macOS
   # or just double-click index.html
   ```

3. Run tests
   ```bash
   node test.js
   ```

## Author

**Evan Parrott**  
GitHub: [@evan-thedev](https://github.com/evan-thedev)

## License

MIT License - See LICENSE file for details

---

## For Hiring Managers

This is a simple, honest tool that:
- Helps job seekers see which keywords they might want to include
- Respects user privacy (nothing uploaded)
- Uses straightforward word matching (no black-box AI)
- Works entirely in the browser

No exaggerated claims. No fake ATS integrations. Just a useful comparison tool.
