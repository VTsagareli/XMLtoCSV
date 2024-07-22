const axios = require('axios');
const DataReader = require('./DataReader');

class RemoteXMLReader extends DataReader {
    constructor(logger) {
        super();
        this.logger = logger;
    }

    async read(path) {
        try {
            const response = await axios.get(path);
            return response.data;
        } catch (error) {
            this.logger.log(`Error reading remote file: ${error.message}`);
            throw error;
        }
    }
}

module.exports = RemoteXMLReader;
