
class Room1 extends PhysicsScene {
    constructor() {
        super("Room1", "First Room");
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('player', 'player.png');
        this.load.image('box', 'box.png');
        this.load.image('ground', 'platform.png');
        this.load.image('door', 'door.png');
        this.load.image('door', 'door.png');
        this.load.image('background', 'wallpaper.png');
    }

    onEnter() {
        //this.add.image(0, 0, "background").setOrigin(0, 0);
    
    

        const platforms = this.physics.add.staticGroup();
        //platforms
        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        for (let i = 1; i < 12; i++) {
            platforms.create(-100 + i * 40, 100 + i * 40, "ground");
          }

    

        this.player = this.physics.add.sprite(20, 10, "player");
        this.player.setScale(2);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);


        
    

        this.box = this.physics.add.sprite(300, 0, "box");
        this.box.setScale(3);
        this.box.setCollideWorldBounds(true);
        this.box.body.setFriction(1, 1);
        this.physics.add.collider(this.box, platforms, () => {
            this.box.body.setVelocity(0);
        });

        
        //DOOR
        const door = this.physics.add.staticGroup();
        door.create(550, 500, "door").setScale(.2).refreshBody();;
        this.physics.add.collider(this.player, door, () => {
            //this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Room2'));

        });
        

        // Set up arrow keys for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on("keydown", (event) => {
            switch (event.key) {
                case "a":
                    this.player.setVelocityX(-160);
                    break;
                case "d":
                    this.player.setVelocityX(160);
                    break;
                case "w":
                    if (this.player.body.touching.down) {
                        this.player.setVelocityY(-420);
                    }
                    break;
            }
        });
        
        this.input.keyboard.on("keyup", (event) => {
            switch (event.key) {
                case "a":
                case "d":
                    this.player.setVelocityX(0);
    
                    break;
            }
        });

        // Check for overlap between player and box
        this.physics.add.overlap(this.player, this.box, () => {
            // If player is pressing the up arrow key and the box is above the player, push the box
            if (this.cursors.up.isDown && this.box.y < this.player.y) {
                this.box.body.setVelocityY(-100);
            }
            // If player is pressing the down arrow key and the box is below the player, push the box
            else if (this.cursors.down.isDown && this.box.y > this.player.y) {
                this.box.body.setVelocityY(100);
            }
            // If player is pressing the left arrow key and the box is to the left of the player, push the box to the left
            else if (this.cursors.left.isDown && this.box.x < this.player.x) {
                this.box.body.setVelocityX(-100);
            }
            // If player is pressing the right arrow key and the box is to the right of the player, push the box to the right
            else if (this.cursors.right.isDown && this.box.x > this.player.x) {
                this.box.body.setVelocityX(100);
            }
            // Otherwise, stop moving the box
            else {
                this.box.body.setVelocity(0);
            }
        }, null, this);
        
        // Set up collision between player and box
        this.physics.add.collider(this.player, this.box);
    }
}


class Room2 extends PhysicsScene {
    constructor() {
        super("Room2", "Second Room");
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('player', 'player.png');
        this.load.image('box', 'box.png');
        this.load.image('ground', 'platform.png');
        this.load.image('door', 'door.png');
        this.load.image('background', 'wallpaper.png');
    }

    onEnter() {
        this.add.image(0, 0, "background").setOrigin(0, 0);
    
        // Add player sprite
        this.player = this.physics.add.sprite(100, 100, "player");
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(500);
    
        
        

        const platforms = this.physics.add.staticGroup();
        //platforms

        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        for (let i = 1; i < 5; i++) {
            platforms.create(600, 550 - i * 25, "ground");
          }

        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        // platforms.create(600, 450, "ground");
        // platforms.create(600, 475, "ground");
        // platforms.create(600, 550, "ground");
        // platforms.create(600, 525, "ground");
        // platforms.create(600, 500, "ground");


        

        // platforms.create(50, 250, "ground");//left
        

        // platforms.create(750, 220, "ground");

        

        this.player = this.physics.add.sprite(100, 450, "player");
        this.player.setScale(2);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);

        
        this.box = this.physics.add.sprite(300, 300, "box");
        this.box.setScale(3);
        this.box.setCollideWorldBounds(true);
        this.box.body.setFriction(1, 1);
        this.physics.add.collider(this.box, platforms, () => {
            this.box.body.setVelocity(0);
        });
        
        const door = this.physics.add.staticGroup();
        door.create(550, 400, "door").setScale(.2).refreshBody();;
        this.physics.add.collider(this.player, door, () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Room3'));

        });

        // Set up arrow keys for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on("keydown", (event) => {
            switch (event.key) {
                case "a":
                    this.player.setVelocityX(-160);
                    break;
                case "d":
                    this.player.setVelocityX(160);
                    break;
                case "w":
                    if (this.player.body.touching.down) {
                        this.player.setVelocityY(-420);
                    }
                    break;
            }
        });
        
        this.input.keyboard.on("keyup", (event) => {
            switch (event.key) {
                case "a":
                case "d":
                    this.player.setVelocityX(0);
    
                    break;
            }
        });

        // Check for overlap between player and box
        this.physics.add.overlap(this.player, this.box, () => {
            // If player is pressing the up arrow key and the box is above the player, push the box
            if (this.cursors.up.isDown && this.box.y < this.player.y) {
                this.box.body.setVelocityY(-100);
            }
            // If player is pressing the down arrow key and the box is below the player, push the box
            else if (this.cursors.down.isDown && this.box.y > this.player.y) {
                this.box.body.setVelocityY(100);
            }
            // If player is pressing the left arrow key and the box is to the left of the player, push the box to the left
            else if (this.cursors.left.isDown && this.box.x < this.player.x) {
                this.box.body.setVelocityX(-100);
            }
            // If player is pressing the right arrow key and the box is to the right of the player, push the box to the right
            else if (this.cursors.right.isDown && this.box.x > this.player.x) {
                this.box.body.setVelocityX(100);
            }
            // Otherwise, stop moving the box
            else {
                this.box.body.setVelocity(0);
            }
        }, null, this);
        
        // Set up collision between player and box
        this.physics.add.collider(this.player, this.box);
    }
}


class Room3 extends PhysicsScene {
    constructor() {
        super("Room3", "Third Room");
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('player', 'player.png');
        this.load.image('box', 'box.png');
        this.load.image('ground', 'platform.png');
        this.load.image('door', 'door.png');
        this.load.image('door', 'door.png');
        this.load.image('background', 'wallpaper.png');
    }

    onEnter() {
        this.add.image(0, 0, "background").setOrigin(0, 0);
    
    

        const platforms = this.physics.add.staticGroup();
        //platforms
        platforms.create(400, 568, "ground").setScale(2).refreshBody();

        platforms.create(100, 450, "ground");

        platforms.create(220, 370, "ground").setScale(.5).refreshBody();
        platforms.create(150, 370, "ground").setScale(.5).refreshBody();

        platforms.create(600, 450, "ground");
        platforms.create(600, 475, "ground");
        platforms.create(600, 550, "ground");
        platforms.create(600, 525, "ground");
        platforms.create(600, 500, "ground");

        platforms.create(550, 330, "ground");
        platforms.create(550, 300, "ground");
        platforms.create(550, 275, "ground");
        platforms.create(550, 225, "ground");
        platforms.create(550, 250, "ground");

        this.player = this.physics.add.sprite(200, 400, "player");
        this.player.setScale(2);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);


        
    

        this.box = this.physics.add.sprite(300, 0, "box");
        this.box.setScale(3);
        this.box.setCollideWorldBounds(true);
        this.box.body.setFriction(1, 1);
        this.physics.add.collider(this.box, platforms, () => {
            this.box.body.setVelocity(0);
        });

        
        //DOOR
        const door = this.physics.add.staticGroup();
        door.create(550, 400, "door").setScale(.2).refreshBody();;
        this.physics.add.collider(this.player, door, () => {
            //this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Room3'));

        });
        

        const door1 = this.physics.add.staticGroup();
        door1.create(20, 500, "door").setScale(.2).refreshBody();;
        this.physics.add.collider(this.player, door1, () => {
            //this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Room1'));

        });

        // Set up arrow keys for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on("keydown", (event) => {
            switch (event.key) {
                case "a":
                    this.player.setVelocityX(-160);
                    break;
                case "d":
                    this.player.setVelocityX(160);
                    break;
                case "w":
                    if (this.player.body.touching.down) {
                        this.player.setVelocityY(-420);
                    }
                    break;
            }
        });
        
        this.input.keyboard.on("keyup", (event) => {
            switch (event.key) {
                case "a":
                case "d":
                    this.player.setVelocityX(0);
    
                    break;
            }
        });

        // Check for overlap between player and box
        this.physics.add.overlap(this.player, this.box, () => {
            // If player is pressing the up arrow key and the box is above the player, push the box
            if (this.cursors.up.isDown && this.box.y < this.player.y) {
                this.box.body.setVelocityY(-100);
            }
            // If player is pressing the down arrow key and the box is below the player, push the box
            else if (this.cursors.down.isDown && this.box.y > this.player.y) {
                this.box.body.setVelocityY(100);
            }
            // If player is pressing the left arrow key and the box is to the left of the player, push the box to the left
            else if (this.cursors.left.isDown && this.box.x < this.player.x) {
                this.box.body.setVelocityX(-100);
            }
            // If player is pressing the right arrow key and the box is to the right of the player, push the box to the right
            else if (this.cursors.right.isDown && this.box.x > this.player.x) {
                this.box.body.setVelocityX(100);
            }
            // Otherwise, stop moving the box
            else {
                this.box.body.setVelocity(0);
            }
        }, null, this);
        
        // Set up collision between player and box
        this.physics.add.collider(this.player, this.box);
    }
}



    

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Rooms").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Room1'));
        });
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 600
    },

    

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },

    scene: [Intro, Room1, Room2, Room3],
    title: "Adventure Game",
});