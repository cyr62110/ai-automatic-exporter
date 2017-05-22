import ExportResult from "../../utils/result";
import Exporter from "./exporter";
import ScaleCalculator from "../../utils/scalecalculator";

export default class ArtboardExporter extends Exporter {

    constructor(formatManager) {
        super(formatManager);
    }

    canExport(exportProfile) {
        var canExport = super.canExport(exportProfile);
        if (!canExport) {
            return canExport;
        }
        if (!exportProfile.getSource() instanceof Artboard) {
            return false;
        }
        return true;
    }

    exportAsFile(exportProfile) {
        var result = super.exportAsFile(exportProfile);
        if (result !== null) {
            return result;
        }
        if (this.getArtboard(exportProfile) === null) {
            return ExportResult.error(`Artboard '${this._source}' does not exists in current document.`);
        }

        this._setActiveArtboard(exportProfile);

        return null;
    }

    /**
     * Returns the artboard to export
     * @param {ExportProfile} exportProfile Export profile specifying the artboard to export.
     * @return {Artboard} Artboard to export.
     */
    getArtboard(exportProfile) {
        return exportProfile.getSource();
    }

    /**
     * Returns the document containing the exported artboard.
     * @param {ExportProfile} exportProfile Export profile specifying the artboard to export.
     * @return {Document} Document containing the exported artboard.
     * @private
     */
    _getDocument(exportProfile) {
        return exportProfile.getSource().parent;
    }

    /**
     * Set the artboard set as source in the export profile as active.
     * @param {ExportProfile} exportProfile An export profile.
     * @private
     */
    _setActiveArtboard(exportProfile) {
        let artboards = this._getDocument(exportProfile).artboards;
        for (var i = 0; i < artboards.length; i++) {
            var artboard = artboards[i];
            if (artboard === exportProfile.getSource()) {
                artboards.setActiveArtboardIndex(i);
                return;
            }
        }
    }

    /**
     * Returns a scale calculator to configure the scale in the export options.
     * @param {ExportProfile} exportProfile An export profile.
     * @return {ScaleCalculator} a configured scale calculator for the export profile.
     */
    getScaleCalculator(exportProfile) {
        let artboard = this.getArtboard(exportProfile);

        let scaleCalculator = new ScaleCalculator();
        scaleCalculator.setSourceRect(artboard.artboardRect);
        if (exportProfile.getOutputWidth() !== null) {
            scaleCalculator.setOutputWidth(exportProfile.getOutputWidth());
        }
        if (exportProfile.getOutputHeight() !== null) {
            scaleCalculator.setOutputHeight(exportProfile.getOutputHeight());
        }
        return scaleCalculator;
    }
}
