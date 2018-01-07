module objects {
    export class Powerups extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES

        public constructor(textureAtlas: createjs.SpriteSheet, value: string) {
            super(textureAtlas, value);
            this.Start();
        }

        public Start(): void {
        }
        
        public Update(): void {

        }
    }

}