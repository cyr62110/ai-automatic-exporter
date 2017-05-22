import ConfigManager from "./configmanager";
import Results from "../utils/results";

export default class ExportManager {

    constructor(configManager, formatManager) {
        this._configManager = configManager;
        this._formatManager = formatManager;
    }

    setConfigPath(configPath) {
        this._configManager.setConfigPath(configPath);
    }

    /**
     * Read the configuration and export all elements in it as images.
     * @return Results
     */
    export() {
        var loadResult = this._configManager.load();
        if (loadResult.isError()) {
            return Results.just(loadResult);
        }
        return new Results();
    }
}