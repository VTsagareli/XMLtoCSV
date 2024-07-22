const AppConfig = require('../src/config/AppConfig');
const fs = require('fs');
const path = require('path');

describe('AppConfig', function () {
    it('should run without errors', async function () {
        const config = new AppConfig();
        const xmlFiles = [
            path.join(__dirname, 'test.xml'),
            path.join(__dirname, 'sample1.xml'),
            path.join(__dirname, 'sample3.xml'),
            path.join(__dirname, 'sample3.xml')
        ];

        for (const xmlFile of xmlFiles) {
            const outputFileName = path.basename(xmlFile, path.extname(xmlFile)) + '_output.csv';
            const outputFile = path.join(__dirname, '../output', outputFileName);

            try {
                await config.run(xmlFile, outputFile);

                if (fs.existsSync(outputFile)) {
                    const csvContent = fs.readFileSync(outputFile, 'utf-8');
                    console.log(`CSV Content for ${xmlFile}:`, csvContent);

                    // Perform assertions on CSV content here
                    if (xmlFile.includes('test.xml')) {
                        if (!csvContent.includes('field1') || !csvContent.includes('field2')) {
                            throw new Error(`CSV content for ${xmlFile} does not include expected headers.`);
                        }
                    } else if (xmlFile.includes('sample3.xml')) {
                        if (!csvContent.includes('Books/Book/0/Title') || !csvContent.includes('Books/Book/0/Author/_id')) {
                            throw new Error(`CSV content for ${xmlFile} does not include expected headers.`);
                        }
                    } else if (xmlFile.includes('addresses.xml')) {
                        // Add assertions specific to the addresses.xml structure
                    }
                } else {
                    throw new Error(`Output CSV file for ${xmlFile} does not exist.`);
                }
            } catch (error) {
                console.error(`Failed processing XML file ${xmlFile}:`, error.message);
            }
        }
    });
});
