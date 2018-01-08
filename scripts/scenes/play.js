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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Play(assetManager, textureAtlas, currentScene) {
            var _this = _super.call(this) || this;
            _this._assetManager = assetManager;
            _this._currentScene = currentScene;
            _this._textureAtlas = textureAtlas;
            _this._bulletFire = _this._bulletFire.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            this._levelEnemyCount = 3;
            this._playerEnemyKill = 0;
            this._currentLevel = 1;
            this.totalBossKill = 20;
            this.bossHit = 0;
            this._tickerLabel = null;
            this._ticker = 0;
            this._powerUpTimer = 10;
            this._bossKilled = false;
            this._hasShield = false;
            this.hasSinGun = false;
            this.healthBar = 500;
            this._gameMusic = createjs.Sound.play("music");
            this._gameMusic.volume = 0.20;
            this._gameMusic.loop = -1;
            this._plane = new objects.Plane(this._textureAtlas);
            this._bg = new objects.Background(this._assetManager, "bg1");
            this._shieldPower = new objects.Shield(this._textureAtlas, this);
            this._livesPower = new objects.Lives(this._textureAtlas, this);
            this._singunPower = new objects.SinGun(this._textureAtlas, this);
            this._enemybulletNum = 50;
            // this._enemybullets = new Array<objects.OtherBullet>();
            this._bulletNum = 150;
            this._bullets = new Array();
            this._bulletCounter = 0;
            this._explosionNum = 40;
            this._explosion = new Array();
            this._explosionCounter = 0;
            this._enemyNum = 3;
            this._enemies = new Array();
            this._lives = 5;
            this._score = 0;
            this._frameDelay = (Math.random() * 100) + 480;
            this._curFrame = 0;
            this._livesLabel = new objects.Label("Lives: " + this._lives, "26px", "orecrusher3d", "#FFFF00", 10, 10, false);
            this._scoreLabel = new objects.Label("Score: " + this._score, "26px", "orecrusher3d", "#FFFF00", 300, 10, false);
            this._levelLabel = new objects.Label("Level: " + this._currentLevel, "20px", "orecrusher3d", "#FFFF00", 10, 40, false);
            this._boss = new objects.Boss(this._textureAtlas, this);
            this._canSpawnPowerUps = true;
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._plane.Update();
            this._bg.Update();
            this._boss.Update();
            this._bullets.forEach(function (bullet) {
                bullet.Update();
                bullet._checkCollision(_this._enemies);
                if (_this._currentLevel == 3)
                    bullet._checkBossCollision(_this._boss);
            });
            if (this._currentLevel != 3) {
                this._enemies.forEach(function (enemy) {
                    enemy.Update();
                    _this._checkCollision(enemy);
                    enemy._checkCollisionWithin(_this._enemies);
                });
            }
            this._explosion.forEach(function (explosion) {
                explosion.Update();
            });
            this._shieldPower.Update();
            this._livesPower.Update();
            this._singunPower.Update();
            if (this._canSpawnPowerUps && this._currentLevel > 1) {
                this._curFrame++;
                if (this._curFrame >= this._frameDelay) {
                    this._curFrame = 0;
                    this._frameDelay = (Math.random() * 100) + 800;
                    this._spawnRandomPowerUps();
                }
            }
            this._ticker++;
            if (this._ticker >= 60) {
                this._ticker = 0;
                this.updateTicker(-1);
            }
            return this._currentScene;
        };
        Play.prototype._spawnRandomPowerUps = function () {
            var random = Math.random() * 3;
            if (random < 1) {
                this._singunPower._startMoving = true;
            }
            else if (random < 2) {
                this._livesPower._startMoving = true;
            }
            else if (random < 3) {
                this._shieldPower._startMoving = true;
            }
            this._canSpawnPowerUps = false; // lock powerups
        };
        Play.prototype.Main = function () {
            this.addChild(this._bg);
            this.addChild(this._plane);
            for (var count = 0; count < this._bulletNum; count++) {
                this._bullets[count] = new objects.Bullet(this._textureAtlas, this);
                this.addChild(this._bullets[count]);
            }
            for (var count = 0; count < this._enemyNum; count++) {
                this._enemies[count] = new objects.Enemy(this._textureAtlas, this);
                this.addChild(this._enemies[count]);
            }
            for (var count = 0; count < this._explosionNum; count++) {
                this._explosion[count] = new objects.Explosion(this._textureAtlas);
                this.addChild(this._explosion[count]);
            }
            //this.addChild(this._boss);
            this.addChild(this._livesPower);
            this.addChild(this._shieldPower);
            this.addChild(this._singunPower);
            this.addChild(this._livesLabel);
            this.addChild(this._scoreLabel);
            this.addChild(this._levelLabel);
            //window.addEventListener("mousedown", () => {this._bulletFire()});
            window.addEventListener("mousedown", this._bulletFire);
        };
        Play.prototype._bulletFire = function () {
            this._bullets[this._bulletCounter].x = this._plane.bulletSpawn.x;
            this._bullets[this._bulletCounter].y = this._plane.bulletSpawn.y;
            var instance = createjs.Sound.play("laser");
            instance.volume = 0.5;
            this._bulletCounter++;
            if (this._bulletCounter >= this._bulletNum - 1) {
                this._bulletCounter = 0;
            }
        };
        Play.prototype._movement = function (event) {
            var key = event.which || event.keyCode;
            switch (key) {
                case 37:
                    break;
                case 39:
                    break;
                default:
                    break;
            }
        };
        Play.prototype.createExplosion = function (x, y) {
            this._explosion[this._explosionCounter].x = x;
            this._explosion[this._explosionCounter].y = y;
            this._explosion[this._explosionCounter].gotoAndPlay(12);
            // this._explosion[this._explosionCounter].gotoAndStop(23);
            this._explosionCounter++;
            if (this._explosionCounter >= this._explosionNum - 1)
                this._explosionCounter = 0;
        };
        Play.prototype.startTicker = function () {
            this._tickerLabel = new objects.Label("Time: " + this._powerUpTimer, "26px", "orecrusher3d", "#FFFF00", 160, 10, false);
            this.addChild(this._tickerLabel);
        };
        Play.prototype.updateTicker = function (seconds) {
            if (this._tickerLabel != null) {
                this._powerUpTimer += seconds;
                this._tickerLabel.text = "Time: " + this._powerUpTimer;
                if (this._powerUpTimer <= 0) {
                    this.endTicker();
                }
            }
        };
        Play.prototype.endTicker = function () {
            if (this._tickerLabel != null) {
                this.removeChild(this._tickerLabel);
                this._tickerLabel = null;
            }
            this._powerUpTimer = 10;
            if (this._hasShield)
                this._hasShield = false;
            if (this.hasSinGun) {
                for (var count = 0; count < this._bulletNum; count++) {
                    this._bullets[count].setSignGun(false);
                }
                this.hasSinGun = false;
            }
        };
        Play.prototype._checkCollision = function (other) {
            var P1 = new createjs.Point(this._plane.x, this._plane.y);
            var P2 = other.position;
            // compare the distance between P1 and P2 is less than half the height of each object
            if ((Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2))) <
                (this._plane.halfHeight + other.halfHeight)) {
                if (!other.isColliding) {
                    // if (other.name == "island") {
                    //   this._score += 100;
                    //   this._scoreLabel.text = "Score: " + this._score;
                    //   var instance = createjs.Sound.play("explosion");
                    //   instance.volume = 0.5;
                    // }
                    console.log(other.name);
                    if (other.name == "life") {
                        var life = other;
                        life.destroy();
                        this.updateLives(1);
                    }
                    if (other.name == "shield") {
                        var shield = other;
                        shield.destroy();
                        this._hasShield = true;
                        this.startTicker();
                    }
                    if (other.name == "singun") {
                        var gun = other;
                        for (var count = 0; count < this._bulletNum; count++) {
                            this._bullets[count].setSignGun(true);
                        }
                        this.hasSinGun = true;
                        this.startTicker();
                        gun.destroy();
                    }
                    if ((other.name == "enemy" || other.name == "enemybullet")) {
                        if (!this._hasShield) {
                            this.updateLives(-1);
                            this.createExplosion(this._plane.x, this._plane.y);
                            this.createExplosion(other.x, other.y);
                        }
                        if (this.hasSinGun) {
                            this.endTicker();
                        }
                        if (this._lives <= 0) {
                            this._currentScene = config.END;
                            this._gameMusic.stop();
                            window.removeEventListener("mousedown", this._bulletFire);
                            this.removeAllChildren();
                        }
                        var instance = createjs.Sound.play("explosion");
                        instance.volume = 0.5;
                        if (other.name == "enemy") {
                            var enemy = other;
                            this.createExplosion(enemy.x, enemy.y);
                            enemy.destroy();
                            if (this._hasShield) {
                                this.updateScore(100);
                            }
                        }
                        else if (other.name == "enemybullet") {
                            var bullet = other;
                            bullet.destroy();
                        }
                    }
                    other.isColliding = true;
                }
            }
            else {
                other.isColliding = false;
            }
        };
        Play.prototype.updateLives = function (value) {
            this._lives += value;
            this._livesLabel.text = "Lives: " + this._lives;
        };
        Play.prototype.updateScore = function (score) {
            this._score += 100;
            this._scoreLabel.text = "Score: " + this._score;
        };
        Play.prototype.updateEnemyCount = function (kill) {
            this._playerEnemyKill += kill;
            if (this._playerEnemyKill >= this._levelEnemyCount && this._currentLevel != 3) {
                this._currentLevel++;
                this._levelLabel.text = "Level: " + this._currentLevel;
                this._playerEnemyKill = 0;
                if (this._currentLevel == 2) {
                    this._canSpawnPowerUps = true;
                    var index = this.getChildIndex(this._bg);
                    this.removeChild(this._bg);
                    this._bg = new objects.Background(this._assetManager, "bg2");
                    this.addChildAt(this._bg, index);
                }
                else if (this._currentLevel == 3) {
                    var index = this.getChildIndex(this._bg);
                    this.removeChild(this._bg);
                    for (var count = 0; count < this._enemyNum; count++) {
                        this._enemies[count].removeBullets();
                        this.removeChild(this._enemies[count]);
                    }
                    this._bg = new objects.Background(this._assetManager, "bg3");
                    this.addChildAt(this._bg, index);
                    this._boss = new objects.Boss(this._textureAtlas, this);
                    this.addChildAt(this._boss, this.getChildIndex(this._livesPower) - 1);
                    this.bossHealth = new createjs.Shape();
                    this.bossHealth.graphics.beginFill("#FF4136");
                    this.bossHealth.graphics.drawRect(0, 0, this.healthBar, 20);
                    this.bossHealth.graphics.endFill();
                    this.bossHealth.y = 600;
                    this.bossHealth.x = 0;
                    this.addChildAt(this.bossHealth, this.getChildIndex(this._levelLabel) - 1);
                }
            }
            else if (this._currentLevel == 3 && this._bossKilled) {
                this._currentScene = config.WON;
                this._gameMusic.stop();
                window.removeEventListener("mousedown", this._bulletFire);
                this.removeAllChildren();
            }
        };
        Play.prototype.hasBossKilled = function (value) {
            this._bossKilled = true;
        };
        Play.prototype.removePowerUps = function () {
            this._canSpawnPowerUps = true;
        };
        Play.prototype.setBossHit = function () {
            this.bossHit++;
            this.loseHealth();
        };
        Play.prototype.getBossKills = function () {
            return this.bossHit;
        };
        Play.prototype.loseHealth = function () {
            this.healthBar -= 25;
            this.bossHealth.graphics.clear();
            this.bossHealth.graphics.beginFill("#FF4136");
            this.bossHealth.graphics.drawRect(0, 0, this.healthBar, 20);
            this.bossHealth.graphics.endFill();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map