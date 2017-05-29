import JSON from "JSON/json2";
import _ from 'underscore/underscore';
import Result from "../utils/result";
import Results from "../utils/results";
import ExportProfile from "../exporter/exportprofile";

export default class ConfigManager {

    constructor() {
        this._document = null;
        this._exportProfileBuilders = [];

        this._configPath = null;
        this._outputDir = null;

        this._config = null;
        this._exportProfiles = [];
    }

    /**
     * Register an export profile builder that will convert the configuration into usable export profiles.
     * @param {ExportProfileBuilder} an export profile builder
     */
    registerExportProfileBuilder(exportProfileBuilder) {
        if (exportProfileBuilder.getName() === undefined || exportProfileBuilder.getName() === null) {
            throw "Export profile builder must provide a name to be registered.";
        }
        this._exportProfileBuilders.push(exportProfileBuilder);
    }

    /**
     * Set the document from which the images will be exported.
     * @param {Document} document document from which the images will be exported.
     */
    setDocument(document) {
        this._document = document;
    }

    /**
     * Set the path to the export configuration.
     * @param configPath Path to configuration file in it fs form.
     */
    setConfigPath(configPath) {
        this._configPath = configPath;
    }

    /**
     * Set the directory in which the images must be exported.
     * @param {File} outputDir directory where the images must be exported.
     */
    setOutputDir(outputDir) {
        this._outputDir = outputDir;
    }

    /**
     * Load the configuration from the config path.
     * @return {Results} In case of error, the results will contain the different error encountered when parsing the config.
     */
    load() {
        let configFile = this._getConfigFile();
        if (configFile === null) {
            return Results.error("config", "Configuration path is empty.");
        }
        if (!configFile.exists) {
            return Results.error("config", `Configuration file '${this._configPath}' does not exists.`);
        }

        let configFileContent = this._readConfig(configFile);
        if (configFileContent === null) {
            return Results.error("config", "Cannot read configuration file. Check that you have enough rights to read the file.");
        }

        return this._parseConfig(configFileContent);
    }

    _getConfigFile() {
        if (this._configPath === null || this._configPath.length === 0) {
            return null;
        }
        return new File(this._configPath);
    }

    _readConfig(configFile) {
        let content = null;
        try {
            let openResult = configFile.open("r");
            if (!openResult) {
                throw configFile.error;
            }
            content = configFile.read();
        } finally {
            configFile.close();
        }
        return content;
    }

    _parseConfig(configFileContent) {
        let config = JSON.parse(configFileContent);
        if (config === null) {
            return Results.error("config", "Cannot parse configuration. Make sure your configuration is a valid JSON file.");
        }

        // FIXME Parse global configuration
        return this._parseExportProfiles(config);
    }

    _parseExportProfiles(config) {
        if (config["exports"] === undefined) {
            return Results.error("config", "Missing 'exports' array in root configuration object.");
        }
        return _(config["exports"]).chain()
            .map((exportConfig) => {
                return this._parseExportProfile(exportConfig);
            })
            .reduce((results, result) => {
                results.add(result);
                return results;
            }, new Results())
            .value();
    }

    /**
     * Create all export profiles required
     * @param exportConfig
     * @return {Result} a result.
     * @private
     */
    _parseExportProfile(exportConfig) {
        let exportProfile = new ExportProfile();

        let sourceName = exportConfig["artboard"];
        if (sourceName !== undefined) {
            let artboard = this._document.artboards.getByName(sourceName);
            if (artboard === null) {
                return Result.error("config", `Artboard ${sourceName} does not exists in current document.`);
            }
            exportProfile.setSource(artboard);
        } else {
            sourceName = exportConfig["slice"];
            if (sourceName !== undefined) {
                return Result.error("config", "slice cannot be exported on this version. Look after an update of the plugin.");
            }
        }

        let outputName = exportConfig["outputName"];
        if (outputName === undefined) {
            outputName = sourceName;
        }

        let outputFormat = exportConfig["outputFormat"];
        if (outputFormat === undefined) {
            return Result.error("config", `No ouput format configured to export source '${sourceName}'`);
        }
        exportProfile.setOutputFormat(outputFormat);

        let outputHeight = exportConfig["outputHeight"];
        if (outputHeight !== undefined) {
            exportProfile.setOutputHeight(outputHeight);
        }

        let outputWidth = exportConfig["outputWidth"];
        if (outputWidth !== undefined) {
            exportProfile.setOutputWidth(outputWidth);
        }

        return _(this._exportProfileBuilders).chain()
            .filter((builder) => { return exportConfig[builder.getName().toLowerCase()] !== undefined })
            .map((builder) => {
                var builderConfig = exportConfig[builder.getName().toLowerCase()];
                return builder.build(exportProfile, outputName, this._outputDir, builderConfig, this._exportProfiles);
            })
            .reduce((results, result) => {
                results.add(result);
                return results;
            }, Results())
            .value();
    }
}
