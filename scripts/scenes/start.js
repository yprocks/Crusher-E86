var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Start(assetManager, textureAtlas, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._textureAtlas = textureAtlas;
            _this._currentScene = currentScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this._gameLabel = new objects.Label("Crusher E86", "80px", "Protos", "#FFFF00", 280, 240, true);
            this._startButton = new objects.Button(this._textureAtlas, "startButton", 250, 340, true);
            this._manual = new objects.Button(this._textureAtlas, "manual", 250, 400, true);
            this._bg = new createjs.Bitmap("../../assets/images/image1.png");
            this.Main();
        };
        Start.prototype.Update = function () {
            return this._currentScene;
        };
        Start.prototype.Main = function () {
            var _this = this;
            this.addChild(this._bg);
            this.addChild(this._gameLabel);
            this.addChild(this._startButton);
            this.addChild(this._manual);
            this._startButton.on("click", function () {
                _this._currentScene = config.PLAY;
                _this.removeAllChildren();
            });
            this._manual.on("click", function () {
                _this._currentScene = config.INSTRUCTIONS;
                _this.removeAllChildren();
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map