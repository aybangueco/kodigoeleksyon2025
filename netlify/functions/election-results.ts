import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { chromium } from 'playwright';

// API URLs
const SENATOR_API_URL = "https://blob-prod-senator.abs-cbn.com/feed-0/senator-00399000-nation-location-1.json";
const PARTYLIST_API_URL = "https://blob-prod-party-list.abs-cbn.com/feed-0/party-list-01199000-nation-location-1.json";

async function scrapeElectionResults(type: 'senator' | 'partylist') {
    console.log(`Starting to fetch ${type} election results directly in Netlify Function...`);

    // Launch headless browser
    console.log('Launching browser... headless set to true for Netlify Function');
    const browser = await chromium.launch({ headless: true }); // Set headless to true for serverless environments
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
        console.error(`Error during scraping ${type} results in Netlify Function:`, error);
        return null;
    } finally {
        await browser.close();
        console.log('Browser closed in Netlify Function.');
    }
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const type = event.queryStringParameters?.type as 'senator' | 'partylist' | undefined;

    if (!type || (type !== 'senator' && type !== 'partylist')) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Please provide a valid 'type' parameter ('senator' or 'partylist')." }),
        };
    }

    const scrapedResults = await scrapeElectionResults(type);

    if (scrapedResults) {
        return {
            statusCode: 200,
            body: JSON.stringify(scrapedResults),
            headers: {
                "Content-Type": "application/json",
            },
        };
    } else {
        console.log(`Falling back to returning an error for Netlify Function request`);
        return {
            statusCode: 400,
            body: JSON.stringify('Failed to fetch data'),
            headers: {
                "Content-Type": "application/json",
            },
        };
    }
};

export { handler };