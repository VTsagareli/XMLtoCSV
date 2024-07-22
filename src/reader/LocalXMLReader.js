const fs = require('fs').promises;
const DataReader = require('./DataReader');

class LocalXMLReader extends DataReader {
    constructor(logger) {
        super();
        this.logger = logger;
    }

    async read(path) {
        try {
            return await fs.readFile(path, 'utf8');
        } catch (error) {
            this.logger.log(`Error reading local file: ${error.message}`);
            throw error;
        }
    }
}

module.exports = LocalXMLReader;
