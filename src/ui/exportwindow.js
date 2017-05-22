import ExportManager from "../core/exportmanager";

export default class ExportWindow {

    constructor(document) {
        this._document = null;

        this._window = null;

        this._windowWidth = 200;
        this._windowHeight = 200;
        this._windowPadding = 10;

        this._buttonHeight = 20;
    }

    _layout() {
        var res = "dialog { alignChildren: 'fill', \
            configPanel: Panel { orientation: 'row', alignChildren:'right', \
                text: 'Config', \
                configPathText : EditText { characters: 30 }, \
                openConfigDialogButton: Button { text:'Open', properties:{name:'open'} } \
            }, \
            buttonGroup: Group { orientation: 'row', alignment: 'right', \
                exportButton: Button { text:'Export', properties:{name:'export'} }, \
                cancelButton: Button { text:'Cancel', properties:{name:'cancel'} } \
            } \
        }";

        this._window = new Window(res);
    }

    _bindEvents() {
        this._window.configPanel.openConfigDialogButton.onClick = this._openConfigDialogButton_onClick;
        this._window.buttonGroup.exportButton.onClick = this._exportButton_onClick;
    }

    show() {
        if (this._window === null) {
            this._layout();
            this._bindEvents();
        }
        this._window.center();
        this._window.show();
    }

    _openConfigDialogButton_onClick() {
        var configFile = File.openDialog("Open your export configuration");
        if (configFile !== null) {
            this._window.configPanel.configPathText.text = configFile.fsName;
        } else {
            this._window.configPanel.configPathText.text = null;
        }
    }

    _exportButton_onClick() {
        Window.alert("Export");
        var exportManager = new ExportManager();
        var results = exportManager.export();
        if (results.isSuccess()) {
            Window.alert("Success");
        } else {
            Window.alert("Failed: " + results.getMessagesAsString());
        }
    }
}