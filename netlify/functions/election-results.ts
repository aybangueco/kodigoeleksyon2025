import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { exec } from 'child_process';
import { promisify } from 'util';
import { ElectionResult, ResultType } from '../../src/types/electionResults';

const execAsync = promisify(exec);

async function runScrapeResults(type: ResultType): Promise<ElectionResult | null> {
    try {
        const scriptName = `npm run scrape-results -- `;
        const argument = type === 'senator' ? '--senator' : '--partylist';
        const command = `${scriptName} ${argument}`;

        console.log(`Running command: ${command}...`);
        const { stdout, stderr } = await execAsync(command);
        console.log(`Successfully executed command.`);
        if (stdout) {
            try {
                const results = JSON.parse(stdout) as ElectionResult;
                return results;
            } catch (error) {
                console.error('Error parsing JSON output from script:', error);
                return null;
            }
        }
        if (stderr) {
            console.error('Error from script:', stderr);
        }
        return null;
    } catch (error) {
        console.error(`Failed to execute npm script: scrape-results with type ${type}`);
        console.error(error);
        return null;
    }
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const type = event.queryStringParameters?.type as ResultType;

    if (!type || (type !== 'senator' && type !== 'partylist')) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Please provide a valid 'type' parameter ('senator' or 'partylist')." }),
        };
    }

    const scrapedResults = await runScrapeResults(type);

    if (scrapedResults) {
        return {
            statusCode: 200,
            body: JSON.stringify(scrapedResults),
            headers: {
                "Content-Type": "application/json",
            },
        };
    } else {
        console.log(`Falling back to mock ${type} data for Netlify Function request`);
        return {
            statusCode: 400,
            body: JSON.stringify('No data fetched'),
            headers: {
                "Content-Type": "application/json",
            },
        };
    }
};

export { handler };