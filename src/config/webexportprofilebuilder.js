import ExportProfileBuilder from "./exportprofilebuilder";

export default class WebExportProfileBuilder extends ExportProfileBuilder {

    getName() {
        return "web";
    }

    build(baseExportProfile, outputName, outputDir, builderConfig, exportProfiles) {
        return super.build(baseExportProfile, outputName, outputDir, builderConfig, exportProfiles);
    }
}
