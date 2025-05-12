
#!/usr/bin/env ts-node

/**
 * Script to scrape election results from ABS-CBN APIs and save to local JSON files
 * Usage: npm run scrape-results
 */

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { checkEnvironment } from './check-env';

// API URLs
const SENATOR_API_URL = "https://blob-prod-senator.abs-cbn.com/feed-0/senator-00399000-nation-location-1.json";
const PARTYLIST_API_URL = "https://blob-prod-party-list.abs-cbn.com/feed-0/party-list-01199000-nation-location-1.json";

// Output file paths
const OUTPUT_DIR = path.join(process.cwd(), 'src/data');
const SENATOR_OUTPUT_PATH = path.join(OUTPUT_DIR, 'senator-results.json');
const PARTYLIST_OUTPUT_PATH = path.join(OUTPUT_DIR, 'partylist-results.json');

async function scrapeElectionResults() {
  console.log('Starting election results scraper...');
  
  // Check environment
  const envReady = await checkEnvironment();
  if (!envReady) {
    console.error('Environment checks failed. Please fix the issues before running the scraper.');
    process.exit(1);
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }

  // Launch headless browser
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  try {
    // Set up a new page with proper headers
    const page = await context.newPage();
    await page.setExtraHTTPHeaders({
      'Origin': 'https://halalanresults.abs-cbn.com',
      'Referer': 'https://halalanresults.abs-cbn.com/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
    });

    // Scrape senator results
    console.log(`Fetching senator results from ${SENATOR_API_URL}...`);
    const senatorResponse = await page.goto(SENATOR_API_URL);
    
    if (senatorResponse && senatorResponse.ok()) {
      const senatorData = await senatorResponse.json();
      fs.writeFileSync(SENATOR_OUTPUT_PATH, JSON.stringify(senatorData, null, 2));
      console.log(`✅ Senator results saved to ${SENATOR_OUTPUT_PATH}`);
    } else {
      console.error(`❌ Failed to fetch senator results: ${senatorResponse?.status()}`);
    }

    // Scrape party list results
    console.log(`Fetching party list results from ${PARTYLIST_API_URL}...`);
    const partyListResponse = await page.goto(PARTYLIST_API_URL);
    
    if (partyListResponse && partyListResponse.ok()) {
      const partyListData = await partyListResponse.json();
      fs.writeFileSync(PARTYLIST_OUTPUT_PATH, JSON.stringify(partyListData, null, 2));
      console.log(`✅ Party list results saved to ${PARTYLIST_OUTPUT_PATH}`);
    } else {
      console.error(`❌ Failed to fetch party list results: ${partyListResponse?.status()}`);
    }

  } catch (error) {
    console.error('Error during scraping:', error);
    process.exit(1);
  } finally {
    // Close the browser
    await browser.close();
    console.log('Browser closed.');
  }
  
  console.log('Scraping complete!');
}

// Run the scraper if this file is being executed directly
if (require.main === module) {
  scrapeElectionResults().catch(console.error);
}

export { scrapeElectionResults };
