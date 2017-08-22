import ExportProfileBuilder from "./exportprofilebuilder";
import URI from "urijs/src/URI";
import URITemplate from "urijs/src/URITemplate";
import Result from "../utils/result";

export default class WebExportProfileBuilder extends ExportProfileBuilder {

    /**
     * @param formatManager {FormatManager}
     */
    constructor(formatManager) {
        super();
        this._formatManager = formatManager;
    }

    getName() {
        return "web";
    }

    build(baseExportProfile, builderConfig, exportProfiles) {
        let extension = this._formatManager.getExtension(baseExportProfile.getOutputFormat());
        if (extension === null) {
            return Result.error(baseExportProfile.getOutputName(), `No extension registered for format '${baseExportProfile.getOutputFormat()}'.`);
        }

        let webExportProfile = baseExportProfile.clone();

        let outputFilePath = new URITemplate("{webOutputDir}/{outputName}.{extension}").expand({
            webOutputDir: this._getWebOutputDirPath(),
            outputName: baseExportProfile.getOutputName(),
            extension: extension
        });
        let outputFileURI = `${this.getBaseOutputDir().absoluteURI}/${outputFilePath}`;

        webExportProfile.setOutputFile(new File(outputFileURI));

        exportProfiles.push(webExportProfile);

        return Result.success(baseExportProfile.getOutputName());
    }

    /**
     * Returns the path of the directory in which all images for web must be exported.
     * The path is relative to the base output directory.
     *
     * @return {string} path of the directory in which all images for web must be exported.
     * @private
     */
    _getWebOutputDirPath() {
        // TODO: Make it configurable in configuration
        return "web"
    }
}
