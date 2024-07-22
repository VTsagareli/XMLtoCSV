const fs = require('fs').promises;
const path = require('path');
const XMLToCSVConverter = require('../converter/XMLToCSVConverter');
const { Logger } = require('../logging/Logger');

class AppConfig {
    constructor() {
        this.converter = new XMLToCSVConverter();
    }

    async run(xmlFilePath, outputFilePath) {
        try {
            const xmlData = await fs.readFile(xmlFilePath, 'utf-8');
            const csvData = await this.converter.convert(xmlData);
            await fs.writeFile(outputFilePath, csvData);
            Logger.info(`CSV file created at ${outputFilePath}`);
        } catch (error) {
            Logger.error(`Error processing XML file (${xmlFilePath}):`, error.message);
            throw error;
        }
    }
}

module.exports = AppConfig;
