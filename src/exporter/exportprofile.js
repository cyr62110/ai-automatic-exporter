/**
 * Description of an exported image.
 */
export default class ExportProfile {

    constructor() {
        this._source = null;
        this._outputFile = null;
        this._outputWidth = null;
        this._outputHeight = null;
        this._outputFormat = null;
    }

    /**
     * Clone this export profile
     * @return {ExportProfile} a clone of this export profile.
     */
    clone() {
        let exportProfile = new ExportProfile();
        exportProfile._source = this._source;
        exportProfile._outputFormat = this._outputFile;
        exportProfile._outputWidth = this._outputWidth;
        exportProfile._outputHeight = this._outputHeight;
        exportProfile._outputFormat = this._outputFormat;
        return exportProfile;
    }

    /**
     * Returns the object (Artboard, Slice, etc.) that should be exported as an image.
     */
    getSource() {
        return this._source;
    }

    setSource(source) {
        this._source = source;
    }

    /**
     * Returns the file in which the image should be exported.
     */
    getOutputFile() {
        return this._outputFile;
    }

    setOutputFile(outputFile) {
        this._outputFile = outputFile;
    }

    /**
     * Returns the format in which the image should be exported.
     */
    getOutputFormat() {
        return this._outputFormat;
    }

    setOutputFormat(outputFormat) {
        this._outputFormat = outputFormat;
    }

    /**
     * Returns the width in pixels of the exported image.
     * If both with and height, the image will be exported in the specified size ignoring image ratio.
     * If none are set, the image will be exported in its natural size.
     */
    getOutputWidth() {
        return this._outputWidth;
    }

    setOutputWidth(outputWidth) {
        this._outputWidth = outputWidth;
    }

    /**
     * Return the height in pixels of the exported image.
     * If both with and height, the image will be exported in the specified size ignoring image ratio.
     * If none are set, the image will be exported in its natural size.
     */
    getOutputHeight() {
        return this._outputHeight;
    }

    setOutputHeight(outputHeight) {
        this._outputHeight = outputHeight;
    }
}