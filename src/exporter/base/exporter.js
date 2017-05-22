import ExportResult from "../../utils/result";
import _ from "underscore/underscore.js";

export default class Exporter {

    constructor(formatManager) {
        this._formatManager = formatManager;
    }

    /**
     * Returns an array containing all formats in which a source can be exported by this exporter.
     * @returns {Array} image formats supported by this exporter.
     */
    getSupportedOutputFormats() {
        return [];
    }

    /**
     * Returns true if this instance can export the source into the image format described in the export profile.
     * @param {ExportProfile} exportProfile export profile.
     * @returns {boolean} true if the exporter can export what is described in the export profile.
     */
    canExport(exportProfile) {
        return _.chain(this.getSupportedOutputFormats())
            .map((format) => {
                return format.toLocaleLowerCase();
            })
            .some((format) => {
                return exportProfile.getOutputFormat().toLocaleLowerCase() === format;
            })
            .value();
    }

    /**
     * Export the source as described in the provided export profile.
     * @param {ExportProfile} exportProfile Description of the image that must be exported.
     * @returns {ExportResult} Result of the export.
     */
    exportAsFile(exportProfile) {
        if (exportProfile.getSource() === null) {
            return ExportResult.error(exportProfile.getOutputFile().name, "source must not be null nor empty.");
        }
        if (exportProfile.getOutputFormat() === null) {
            return ExportResult.error(exportProfile.getOutputFile().name, "output format must not be null nor empty.");
        }
        if (exportProfile.getOutputFile() === null) {
            return ExportResult.error(exportProfile.getOutputFile().name, "output file must not be null nor empty.")
        }
        return null;
    }
}