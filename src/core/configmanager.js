import JSON from "JSON/json2";
import _ from 'underscore/underscore';
import Result from "../utils/result";
import Results from "../utils/results";
import ExportProfile from "../exporter/exportprofile";

export default class ConfigManager {

    constructor() {
        this._configurers = {};

        this._configPath = null;
        this._config = null;
        this._exportProfiles = [];
    }

    /**
     * Set the path to the export configuration.
     * @param configPath Path to configuration file in it fs form.
     */
    setConfigPath(configPath) {
        this._configPath = configPath;
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

        if ()

        return Result.success("config");
    }

    /**
     * Returns the config
     */
    get() {
        return this._config;
    }
}
