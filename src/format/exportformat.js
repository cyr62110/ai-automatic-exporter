export default class ExportFormat {

    /**
     * Returns the different name that can be used to refer to this format.
     * @return {Array} Array of names
     */
    getFormatNames() {
        return [];
    }

    /**
     * Returns the Illustrator export type associated with this format.
     * @return {ExportType} One of the ExportType enum value.
     */
    getExportType() {
        return null;
    }

    /**
     * Returns the default export options for this format
     * @return {any} an instance of the various ExportOptions.
     */
    getDefaultExportOptions() {
        return null;
    }

    /**
     * Returns the file extension associated with this format.
     * @return {string} file extension associated with this format.
     */
    getExtension() {
        return null;
    }
}