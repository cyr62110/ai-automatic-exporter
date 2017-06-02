import _ from 'underscore/underscore.js';

export default class FormatManager {

    constructor() {
        this._exportFormats = {};
    }

    /**
     * Returns the export format registered for this name if exists, null otherwise.
     * @param {string} formatName Name of the format.
     * @return {ExportFormat} export format registered with the provided name or null if none.
     */
    getExportFormatForName(formatName) {
        return this._exportFormats[formatName];
    }

    /**
     * Returns the file extension associated with the provided format.
     * @param {string} format Name of the format.
     * @return {string} file extension associated with the format.
     */
    getExtension(formatName) {
        let exportFormat = this.getExportFormatForName(formatName);
        if (exportFormat !== null) {
            return exportFormat.getExtension();
        }
        return null;
    }

    /**
     * Register a new export format.
     * @param {ExportFormat} exportFormat export format to register.
     */
    registerExportFormat(exportFormat) {
        _.forEach(exportFormat.getFormatNames(), (formatName) => {
            this._exportFormats[formatName] = exportFormat;
        });
    }
}
