import Result from "../utils/result";

export default class ConfigManager {

    constructor() {
        this._configPath = null;
        this._config = null;
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
     * @return a Result
     */
    load() {
        var configFile = this._getConfigFile();
        if (this._configPath === null || this._configPath.length == 0) {
            return Result.error("config", "Configuration path is empty.");
        }
        if (!configFile.exists) {
            return Result.error("config", `Configuration file '${this._configPath}' does not exists.`);
        }

        return Result.success();
    }

    _getConfigFile() {
        if (this._configPath === null || this._configPath.length == 0) {
            return null;
        }
        return new File(this._configPath);
    }

    _parseConfig() {

    }

    /**
     * Returns the config
     */
    get() {
        return this._config;
    }
}
