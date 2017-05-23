import ArtboardExporter from "../base/artboardexporter";
import Result from "../../utils/result";
import _ from "underscore/underscore.js";

/**
 * Simple exporter that allows to export artboard as common image formats (jpeg, png).
 */
export default class SimpleArtboardExporter extends ArtboardExporter {

    /**
     *
     * @param {FormatManager} formatManager
     */
    constructor(formatManager) {
        super(formatManager);
    }

    getSupportedOutputFormats() {
        return _.chain([
            this._formatManager.getExportFormatForName("jpg"),
            this._formatManager.getExportFormatForName("png")
        ])
            .map((exportFormat) => {
                return exportFormat.getFormatNames()
            })
            .flatten()
            .value();
    }

    exportAsFile(exportProfile) {
        let result = super.exportAsFile(exportProfile);
        if (result !== null) {
            return result;
        }

        this.getArtboard(exportProfile).parent.exportFile(
            exportProfile.getOutputFile(),
            this._getFormat(exportProfile).getExportType(),
            this._getExportOptions(exportProfile)
        );

        return Result.success(exportProfile.getOutputFile().name);
    }

    _getFormat(exportProfile) {
        let formatName = exportProfile.getOutputFormat().toLocaleLowerCase();
        return this._formatManager.getExportFormatForName(formatName);
    }

    _getExportOptions(exportProfile) {
        let scaleCalculator = this.getScaleCalculator(exportProfile);
        let exportOptions = this._getFormat(exportProfile).getDefaultExportOptions();
        exportOptions.artBoardClipping = true;
        exportOptions.verticalScale = scaleCalculator.getVerticalScale();
        exportOptions.horizontalScale = scaleCalculator.getHorizontalScale();
        return exportOptions;
    }
}
