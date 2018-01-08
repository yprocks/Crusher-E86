module objects {
    export class Boss extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES
        private i: number;
        //   private xSpawn: number;
        //   private ySpawn: number;
        private angle: number;

        private _bullets: objects.EnemyBullet[];
        private _bulletNum: number;
        private _bulletCounter: number;

        private _playScript: scenes.Play;
        private _textureAtlas: createjs.SpriteSheet;

        private _bulletSpawn: createjs.Point;
        private _frameDelay: number;
        private _curFrames: number;

        private _bossdelay: number;
        private _showBoss: boolean;

        // PUBLIC PROPERTIES

        // CONSTRUCTORS
        constructor(textureAtlas: createjs.SpriteSheet, playerScript: scenes.Play) {
            super(textureAtlas, "boss");
            this._textureAtlas = textureAtlas;
            this._playScript = playerScript;
            this.i = Math.random() * - 20;
            this._showBoss = false;
            this.Start();
        }

        // PRIVATE METHODS
        private _reset(): void {
            //this.i = Math.random() * - 20;

            this.y = -9000;
            this.x = -9000;

            this.position.x = this.x;
            this.position.y = this.y;

            // this.xSpawn = (Math.random() * (520 - this.width)) + this.halfWidth;
            // this.ySpawn = (Math.random() * (20 - this.height)) + this.halfWidth;

            this.verticalSpeed = (Math.random() * 5) + 2;
            this.angle = 0.05;
        }

        private _checkBounds(): void {
            if (this.y >= 580 + this.height) {
                this._reset();
            }
        }

        // PUBLIC METHODS
        public Start(): void {

            this._bulletNum = 50;
            this._bulletCounter = 0;

            this._bullets = new Array<objects.EnemyBullet>();

            for (let count = 0; count < this._bulletNum; count++) {
                this._bullets[count] = new objects.EnemyBullet(this._textureAtlas, this._playScript);
                this._playScript.addChild(this._bullets[count]);
            }

            this._reset();

            this._bulletSpawn = new createjs.Point(this.x, this.y);

            this._frameDelay = (Math.random()) + 45;
            this._curFrames = 0;

            this._bossdelay = 0;
        }

        private _updatePosition(): void {
            this.x = -Math.sin(this.i) * 80 + 250; // * PHASE + OFFSET
            this.y = 180;
            this.position.x = this.x;
            this.position.y = this.y;
            this.i += this.angle;
        }

        public Update(): void {
            if (this._playScript._currentLevel == 3) {
                
                this._bossdelay ++;

                if(this._bossdelay > 100){
                    this._showBoss = true;
                }

                if(this._showBoss){
                this._updatePosition();
                this._checkBounds();

                this._curFrames++;

                if (this._curFrames >= this._frameDelay) {
                    this.bulletFire(this.x, this.y);
                    this._curFrames = 0;
                }

                this._bullets.forEach(bullet => {
                    bullet.Update();
                });
            }

            }
        }

        /**
         * destroy
         */
        public destroy(): void {
            this._reset();
        }

        public removeBullets(): void {
            for (let count = 0; count < this._bulletNum; count++) {
                this._playScript.removeChild(this._bullets[count]);
            }
        }

        public bulletFire(x: number, y: number): void {

            var random = Math.random() * 3;
            if (random < 1) {
                x = x - 150;
                y = y + 50;
            }
            else if (random < 2) {
                x = x + 150;
                y = y + 50;
            }
            else if (random < 3) {
                x = x + 5;
                y = y + 80;
            }

            this._bullets[this._bulletCounter].x = x;
            this._bullets[this._bulletCounter].y = y;

            var instance = createjs.Sound.play("laser");
            instance.volume = 0.5;

            this._bulletCounter++;
            if (this._bulletCounter >= this._bulletNum - 1) {
                this._bulletCounter = 0;
            }

        }

        // public _checkCollision(player: objects.Plane) {

        //   this._bullets.forEach(bullet => {
        //     let P1: createjs.Point = new createjs.Point(this.x, this.y);
        //     let P2: createjs.Point = new createjs.Point(player.x, player.y);

        //     if ((Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2))) <
        //       (this.halfHeight + bullet.halfHeight)) {

        //       // this._playScript.updateScore(100);
        //       var instance = createjs.Sound.play("explosion");
        //       instance.volume = 0.5;

        //       let x: number = bullet.position.x;
        //       let y: number = bullet.position.y;

        //       //this._playScript.updateEnemyCount(1);
        //       //this._playScript.createExplosion(x, y);          
        //       this._reset();
        //     }

        //   });
        // }
    }
}
