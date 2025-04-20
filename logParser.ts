import * as fs from 'fs';
import * as path from 'path';

const logFilePath = path.join(__dirname, 'web.log');

// Function to parse the log file
function parseLogFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        console.error(`Error: Log file not found. Please ensure 'web.log' is in the same folder as 'logParser.ts'.`);
        process.exit(1);
    }

    const logData = fs.readFileSync(filePath, 'utf-8');
    const lines = logData.split('\n').filter(line => line.trim() !== '');

    const pageViews: Record<string, number> = {};
    const uniquePageViews: Record<string, Set<string>> = {};

    lines.forEach(line => {
        const [page, ip] = line.split(' ');
        if (!page || !ip) return;

        // Count total page views
        pageViews[page] = (pageViews[page] || 0) + 1;

        // Count unique page views
        if (!uniquePageViews[page]) {
            uniquePageViews[page] = new Set();
        }
        uniquePageViews[page].add(ip);
    });

    // Convert unique views to counts
    const uniquePageViewCounts: Record<string, number> = {};
    for (const page in uniquePageViews) {
        uniquePageViewCounts[page] = uniquePageViews[page].size;
    }

    return { pageViews, uniquePageViewCounts };
}

// Function to display the results
function displayResults(pageViews: Record<string, number>, uniquePageViewCounts: Record<string, number>) {
    console.log('Webpages with Most Page Views:');
    Object.entries(pageViews)
        .sort((a, b) => b[1] - a[1])
        .forEach(([page, count]) => {
            console.log(`${page} ${count} visits`);
        });

    console.log('\nWebpages with Most Unique Page Views:');
    Object.entries(uniquePageViewCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([page, count]) => {
            console.log(`${page} ${count} unique views`);
        });
}

// Main function
function main() {
    const { pageViews, uniquePageViewCounts } = parseLogFile(logFilePath);
    displayResults(pageViews, uniquePageViewCounts);
}

// Call main function
main();