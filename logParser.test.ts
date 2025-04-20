import * as fs from 'fs';
import * as path from 'path';
import { parseLogFile } from './logParser';

describe('Log Parser', () => {
    const testLogFilePath = path.join(__dirname, 'test_web.log');

    beforeAll(() => {
        // Create a test log file
        const testLogData = `
        /home 192.168.1.1
        /home 192.168.1.2
        /about 192.168.1.1
        /about 192.168.1.1
        /products/1 192.168.1.3
        /products/1 192.168.1.4
        /products/1 192.168.1.3
        `;
        fs.writeFileSync(testLogFilePath, testLogData.trim());
    });

    afterAll(() => {
        // Clean up the test log file
        fs.unlinkSync(testLogFilePath);
    });

    it('should correctly calculate total and unique page views', () => {
        const { pageViews, uniquePageViewCounts } = parseLogFile(testLogFilePath);

        expect(pageViews).toEqual({
            '/home': 2,
            '/about': 2,
            '/products/1': 3,
        });

        expect(uniquePageViewCounts).toEqual({
            '/home': 2,
            '/about': 1,
            '/products/1': 2,
        });
    });
});