#!/usr/bin/env ts-node

/**
 * Script to scrape election results from ABS-CBN APIs and return JSON to stdout
 * Usage: npm run scrape-results -- senator | npm run scrape-results -- partylist
 */

import { chromium } from 'playwright';
import { checkEnvironment } from './check-env';

// API URLs
const SENATOR_API_URL = "https://blob-prod-senator.abs-cbn.com/feed-0/senator-00399000-nation-location-1.json";
const PARTYLIST_API_URL = "https://blob-prod-party-list.abs-cbn.com/feed-0/party-list-01199000-nation-location-1.json";

async function scrapeElectionResults(type: 'senator' | 'partylist'): Promise<any | null> {
  console.log(`Starting to fetch ${type} election results...`);

  // Check environment
  const envReady = await checkEnvironment();
  if (!envReady) {
    console.error('Environment checks failed. Please fix the issues before running the scraper.');
    process.exit(1);
  }

  // Launch headless browser
  console.log('Launching browser... headless set to false to avoid 403 error');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  try {
    const page = await context.newPage();
    let apiUrl: string;

    if (type === 'senator') {
      apiUrl = SENATOR_API_URL;
      console.log(`Fetching senator results from ${apiUrl}...`);
    } else if (type === 'partylist') {
      apiUrl = PARTYLIST_API_URL;
      console.log(`Fetching party list results from ${apiUrl}...`);
    } else {
      console.error('Invalid result type provided to scraper.');
      return null;
    }

    const response = await page.goto(apiUrl);

    if (response && response.ok()) {
      const data = await response.json();
      console.log(`✅ Successfully fetched ${type} results.`);
      return data;
    } else {
      console.error(`❌ Failed to fetch ${type} results: ${response?.status()}`);
      return null;
    }

  } catch (error) {
    console.error(`Error during scraping ${type} results:`, error);
    return null;
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

async function main() {
  const args = process.argv.slice(2);
  let type: 'senator' | 'partylist' | undefined;

  if (args.includes('--senator')) {
    type = 'senator';
  } else if (args.includes('--partylist')) {
    type = 'partylist';
  }

  if (!type) {
    console.error('Please specify the result type using "--senator" or "--partylist".');
    process.exit(1);
  }

  const results = await scrapeElectionResults(type);

  if (results) {
    // Output the JSON data to stdout
    console.log(JSON.stringify(results, null, 2));
  } else {
    console.error(`Failed to scrape ${type} results.`);
    process.exit(1);
  }
}

main();

export { scrapeElectionResults };