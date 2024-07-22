const AppConfig = require('./src/config/AppConfig');
const LocalXMLReader = require('./src/reader/LocalXMLReader');
const RemoteXMLReader = require('./src/reader/RemoteXMLReader');
const XMLToCSVConverter = require('./src/converter/XMLToCSVConverter');
const CSVStorage = require('./src/storage/CSVStorage');
const FileLogger = require('./src/logging/FileLogger');

console.log('Starting XML to CSV conversion');

const xmlPath = process.argv[2];
if (!xmlPath) {
    console.error("Usage: node main.js <path-to-xml>");
    process.exit(1);
}

const isRemote = xmlPath.startsWith('http://') || xmlPath.startsWith('https://');

console.log(`XML Path: ${xmlPath}`);
console.log(`Is Remote: ${isRemote}`);

const logger = new FileLogger('errors.log');
const reader = isRemote ? new RemoteXMLReader(logger) : new LocalXMLReader(logger);
const converter = new XMLToCSVConverter();
const storage = new CSVStorage('output.csv');

const config = new AppConfig(reader, converter, storage, logger);

config.run(xmlPath).catch(error => {
    console.error(`Error processing XML file: ${error.message}`);
    logger.log(`Error processing XML file: ${error.message}`);
});
