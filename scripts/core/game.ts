//IIFE - Immediately invoked function expression 
(function () {

    let stage: createjs.Stage;
    let canvas: any;
    let helloLabel: createjs.Text;
    let circle: createjs.Shape;
    let circle2: createjs.Shape;
    let circle3: createjs.Shape;
    let box: createjs.Shape;
    let gun: createjs.Shape;
    let i: number;

    function Init() {
        Start();
    }

    function Start() {
        canvas = document.getElementById(Strings.CANVAS_NAME);
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        Main();
    }

    function Update() {
        circle.x = -Math.sin(i) * 40 + 200; // * PHASE + OFFSET
        circle.y = -i * 22 + 400;

        circle2.x = Math.sin(i) * 40 + 200;
        circle2.y = -i * 22 + 400;

        circle3.x -= 5;
        circle3.y -= 5;
        i += 0.1;
        stage.update();
    }

    function Main() {
        i = 0;
        helloLabel = new createjs.Text("Hello World", "40px Consolas", "#000000");
        // helloLabel.y = 400;

        circle = new createjs.Shape();
        circle.graphics.beginFill("black").drawCircle(0, 0, 8);
        circle.y = 400;
        circle.x = 200;

        circle2 = new createjs.Shape();
        circle2.graphics.beginFill("black").drawCircle(0, 0, 8);
        circle2.y = 400;
        circle2.x = 200;

        circle3 = new createjs.Shape();
        circle3.graphics.beginFill("black").drawCircle(0, 0, 8);
        circle3.y = 400;
        circle3.x = 200;

        box = new createjs.Shape();
        box.graphics.beginFill("#000FFF");
        box.graphics.drawRect(0, 0, 60, 50);
        box.graphics.endFill();
        box.y = 430 + 5;
        box.x = 200 - 30;

        gun = new createjs.Shape();
        gun.graphics.beginFill("#00AA00");
        gun.graphics.drawRect(0, 0, 16, 24);
        gun.graphics.endFill();
        gun.y = 406 + 5;
        gun.x = 200 - 8;

        stage.addChild(box);
        stage.addChild(gun);
        stage.addChild(circle);
        stage.addChild(circle3);
        stage.addChild(circle2);
    }

    window.onload = Init;

})();