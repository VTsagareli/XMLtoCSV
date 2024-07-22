const xml2js = require('xml2js');
const { parse } = require('json2csv');

class XMLToCSVConverter {
    async convert(xmlData) {
        try {
            const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
            const result = await parser.parseStringPromise(xmlData);
            const flattenedData = this.flatten(result);
            const formattedData = this.formatFlattenedData(flattenedData);
            const csv = parse(formattedData.data, { fields: formattedData.fields });
            return csv;
        } catch (error) {
            throw new Error(`Error processing XML: ${error.message}`);
        }
    }

    flatten(data, parentKey = '', res = []) {
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            Object.keys(data).forEach((key) => {
                this.flatten(data[key], parentKey ? `${parentKey}.${key}` : key, res);
            });
        } else if (Array.isArray(data)) {
            data.forEach((item, index) => {
                this.flatten(item, `${parentKey}.${index}`, res);
            });
        } else {
            const pathParts = parentKey.split('.');
            const fieldName = pathParts[pathParts.length - 1];
            const rowIndex = parseInt(pathParts[pathParts.length - 2], 10);
            if (!res[rowIndex]) {
                res[rowIndex] = {};
            }
            res[rowIndex][fieldName] = data;
        }
        return res;
    }

    formatFlattenedData(flattenedData) {
        const headers = new Set();
        const data = flattenedData.map((row) => {
            const formattedRow = {};
            Object.keys(row).forEach((key) => {
                headers.add(key);
                formattedRow[key] = row[key];
            });
            return formattedRow;
        });

        return {
            fields: Array.from(headers),
            data: data,
        };
    }
}

module.exports = XMLToCSVConverter;
