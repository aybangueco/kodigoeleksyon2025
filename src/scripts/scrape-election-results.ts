#!/usr/bin/env ts-node

/**
 * Script to scrape election results from ABS-CBN APIs and write to a .ts file.
 * Usage: npm run scrape-results -- --senator --output senator_results.ts
 * npm run scrape-results -- --partylist --output partylist_results.ts
 */

import { chromium } from 'playwright';
import { checkEnvironment } from './check-env';
import * as fs from 'fs/promises';
import * as path from 'path';

// Base API URLs
const SENATOR_BASE_API_URL = "https://blob-prod-senator.abs-cbn.com";
const SENATOR_FEED_LIST_URL = `${SENATOR_BASE_API_URL}/misc/feed-senator.json`;
const PARTYLIST_BASE_API_URL = "https://blob-prod-party-list.abs-cbn.com";
const PARTYLIST_FEED_LIST_URL = `${PARTYLIST_BASE_API_URL}/misc/feed-party-list.json`;

interface FeedResponse {
  feedNo?: string;
  groupCode?: string;
  setupType?: string;
}

async function fetchFeedNumber(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch feed list from ${url}: ${response.status}`);
      return null;
    }
    const data: FeedResponse = await response.json();
    if (data && data.feedNo) {
      return data.feedNo;
    } else {
      console.error(`Could not find feedNo in the fetched data from ${url}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching feed list from ${url}:`, error);
    return null;
  }
}

async function scrapeElectionResults(type: 'senator' | 'partylist') {
  const envReady = await checkEnvironment();
  if (!envReady) {
    console.error('Environment checks failed. Please fix the issues before running the scraper.');
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  let results = null;

  try {
    const page = await context.newPage();
    let apiUrl: string | null = null;

    if (type === 'senator') {
      const feedNo = await fetchFeedNumber(SENATOR_FEED_LIST_URL);
      if (feedNo) {
        apiUrl = `${SENATOR_BASE_API_URL}/feed-${feedNo}/senator-00399000-nation-location-1.json`;
      } else {
        console.error('Failed to fetch senator feed number.');
        return null;
      }
    } else if (type === 'partylist') {
      const feedNo = await fetchFeedNumber(PARTYLIST_FEED_LIST_URL);
      if (feedNo) {
        apiUrl = `${PARTYLIST_BASE_API_URL}/feed-${feedNo}/party-list-01199000-nation-location-1.json`;
      } else {
        console.error('Failed to fetch partylist feed number.');
        return null;
      }
    } else {
      console.error('Invalid result type provided to scraper.');
      return null;
    }

    if (apiUrl) {
      const response = await page.goto(apiUrl);

      if (response && response.ok()) {
        results = await response.json();
      } else {
        console.error(`Failed to fetch ${type} results from ${apiUrl}: ${response?.status()}`);
      }
    }

  } catch (error) {
    console.error(`Error during scraping ${type} results:`, error);
  } finally {
    await browser.close();
  }

  return results;
}

async function main() {
  const args = process.argv.slice(2);
  let type: 'senator' | 'partylist' | undefined;
  let outputFile: string | undefined;

  if (args.includes('--senator')) {
    type = 'senator';
  } else if (args.includes('--partylist')) {
    type = 'partylist';
  }

  const outputIndex = args.indexOf('--output');
  if (outputIndex > -1 && args.length > outputIndex + 1) {
    outputFile = args[outputIndex + 1];
  }

  if (!type) {
    console.error('Please specify the result type using "--senator" or "--partylist".');
    process.exit(1);
  }

  if (!outputFile || !outputFile.endsWith('.ts')) {
    console.error('Please specify the output file using "--output <filename>.ts".');
    process.exit(1);
  }

  const results = await scrapeElectionResults(type);

  if (results) {
    try {
      const variableName = outputFile.replace('.ts', '').replace(/[^a-zA-Z0-9_]/g, '_'); // Sanitize filename for variable name
      const fileContent = `export const ${variableName} = ${JSON.stringify(results, null, 2)} as const;`;
      await fs.writeFile(path.resolve(process.cwd(), outputFile), fileContent, 'utf-8');
      console.log(`✅ Successfully wrote ${type} results to ${outputFile}`);
    } catch (error) {
      console.error(`❌ Error writing ${type} results to ${outputFile}:`, error);
    }
  } else {
    console.error(`Failed to scrape ${type} results.`);
    process.exit(1);
  }
}

main();

export { scrapeElectionResults };