
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
        this.load.spritesheet('wasd', 'wasd.png', {
            frameWidth: 600,
            frameHeight: 600,
            endFrame: 4
        });
    }

    onEnter() {
        this.add.image(0, 0, "background").setOrigin(0, 0);

        this.wasd = this.add.sprite(300, 300, 'wasd');
                this.anims.create({
                    key: 'wasd',
                    frames: this.anims.generateFrameNumbers('wasd', { start: 0, end: 3 }),
                    frameRate: 3,
                    repeat: -1
                });
  
                this.wasd.play('wasd', true);
    
    

        const platforms = this.physics.add.staticGroup();
        //platforms
        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        for (let i = 1; i < 12; i++) {
            platforms.create(-100 + i * 20, 350 + i * 20, "ground");
          }

    

        this.player = this.physics.add.sprite(20, 10, "player");
        this.player.setScale(0.75);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);


        
    

        // this.box = this.physics.add.sprite(300, 0, "box");
        // this.box.setScale(3);
        // this.box.setCollideWorldBounds(true);
        // this.box.body.setFriction(1, 1);
        // this.physics.add.collider(this.box, platforms, () => {
        //     this.box.body.setVelocity(0);
        // });

        
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
        this.load.spritesheet('arrow', 'arrow.png', {
            frameWidth: 600,
            frameHeight: 600,
            endFrame: 15
        });

    }

    onEnter() {
        this.add.image(0, 0, "background").setOrigin(0, 0);

        



        this.arrow = this.add.sprite(300, 300, 'arrow');
                this.anims.create({
                    key: 'arrow',
                    frames: this.anims.generateFrameNumbers('arrow', { start: 0, end: 15 }),
                    frameRate: 10,
                    repeat: -1
                });
  
                this.arrow.play('arrow', true);








    
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
        this.player.setScale(0.75);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);

        
        this.box = this.physics.add.sprite(200, 300, "box");
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

        //platforms.create(100, 450, "ground");

        platforms.create(220, 370, "ground").setScale(.5).refreshBody();
        //platforms.create(150, 370, "ground").setScale(.5).refreshBody();


        for (let i = 1; i < 6; i++) {
            platforms.create(600, 425 + i * 25, "ground");
          }

          for (let i = 1; i < 14; i++) {
            platforms.create(550, 0 + i * 25, "ground");
          }


          for (let i = 1; i < 12; i++) {
            platforms.create(-200 + i * 20, 400 + i * 20, "ground");
          }

        // platforms.create(600, 450, "ground");
        // platforms.create(600, 475, "ground");
        // platforms.create(600, 550, "ground");
        // platforms.create(600, 525, "ground");
        // platforms.create(600, 500, "ground");

        // platforms.create(550, 330, "ground");
        // platforms.create(550, 300, "ground");
        // platforms.create(550, 275, "ground");
        // platforms.create(550, 225, "ground");
        // platforms.create(550, 250, "ground");

        this.player = this.physics.add.sprite(200, 400, "player");
        this.player.setScale(0.75);
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

        

        

        const door1 = this.physics.add.staticGroup();
        door1.create(550, 400, "door").setScale(.2).refreshBody();;
        this.physics.add.collider(this.player, door1, () => {
            //this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Room4'));

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




class Room4 extends PhysicsScene {
    constructor() {
        super("Room4", "fourth Room");
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('player', 'player.png');
        this.load.image('box', 'box.png');
        this.load.image('ground', 'platform.png');
        this.load.image('wall', 'platform1.png');
        this.load.image('door', 'door.png');
        this.load.image('background', 'wallpaper.png');
        this.load.image('button', 'button.png');
        this.load.spritesheet('arrow', 'arrow.png', {
            frameWidth: 600,
            frameHeight: 600,
            endFrame: 15
        });

    }

    onEnter() {
        this.add.image(0, 0, "background").setOrigin(0, 0);

        

        //platforms
        const platforms = this.physics.add.staticGroup();
        

        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        // for (let i = 1; i < 5; i++) {
        //     platforms.create(600, 550 - i * 25, "ground");
        //   }

        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        platforms.create(610, 350, "ground").setScale(0.5).refreshBody();

        this.button = this.physics.add.sprite(400, 550, "button").setImmovable().setCollideWorldBounds(true);
        this.button.body.allowGravity = false;
        this.button.setScale(3);

        this.player = this.physics.add.sprite(100, 450, "player");
        this.player.setScale(0.75);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms); 
        
        

        
    

        // this.box = this.physics.add.sprite(0, 0, "box");
        // this.box.setScale(3);
        // this.box.setCollideWorldBounds(true);
        // this.box.body.setFriction(1, 1);
        // this.physics.add.collider(this.box, platforms, () => {
        //     this.box.body.setVelocity(0);
        // });
        
        const door = this.physics.add.staticGroup();
        door.create(575, 500, "door").setScale(.2).refreshBody();;
        this.physics.add.collider(this.player, door, () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Room5'));

        });



        this.wall = this.physics.add.sprite(500, 200, "wall");
        this.wall.setScale(0.5);
       
        this.wall.setCollideWorldBounds(true);
        this.wall.body.setFriction(1, 1);
        this.physics.add.collider(this.wall, platforms, () => {
            this.wall.body.setVelocity(0);
        });
        this.physics.add.collider(this.player, this.wall);
        

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


        this.physics.add.overlap(this.player, this.button, () => {
            // Move the wall to the left
            this.tweens.add({
                targets: this.wall,
                y: -200,
                duration: 100,
                ease: 'Linear'
            });
            console.log('Button pressed');
        }, null, this);

    }
}



class Room5 extends PhysicsScene {
    constructor() {
        super("Room5", "fifth Room");
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('player', 'player.png');
        this.load.image('box', 'box.png');
        this.load.image('ground', 'platform.png');
        this.load.image('wall', 'platform1.png');
        this.load.image('door', 'door.png');
        this.load.image('background', 'wallpaper.png');
        this.load.image('button', 'button.png');
        this.load.spritesheet('arrow', 'arrow.png', {
            frameWidth: 600,
            frameHeight: 600,
            endFrame: 15
        });

    }

    onEnter() {
        this.add.image(0, 0, "background").setOrigin(0, 0);


        //platforms
        const platforms = this.physics.add.staticGroup();
        

        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        platforms.create(620, 350, "ground").setScale(0.5).refreshBody();


        for (let i = 1; i < 4; i++) {
            platforms.create(500 - i * 150, 325 + i * 50, "ground").setScale(0.25).refreshBody();
            
          }

        platforms.create(400, 568, "ground").setScale(2).refreshBody();

        this.button = this.physics.add.sprite(50, 550, "button").setImmovable().setCollideWorldBounds(true);
        this.button.body.allowGravity = false;
        this.button.setScale(3);

        this.player = this.physics.add.sprite(100, 450, "player");
        this.player.setScale(0.75);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms); 
        
        

        
    

        this.box = this.physics.add.sprite(350, 100, "box");
        this.box.setScale(3);
        this.box.setCollideWorldBounds(true);
        this.box.body.setFriction(1, 1);
        this.physics.add.collider(this.box, platforms, () => {
            this.box.body.setVelocity(0);
        });
        
        const door = this.physics.add.staticGroup();
        door.create(550, 500, "door").setScale(.2).refreshBody();;
        this.physics.add.collider(this.player, door, () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Outro'));

        });



        this.wall = this.physics.add.sprite(500, 200, "wall");
       
        this.wall.setCollideWorldBounds(true);
        this.wall.body.setFriction(1, 1);
        this.physics.add.collider(this.wall, platforms, () => {
            this.wall.body.setVelocity(0);
        });
        this.physics.add.collider(this.player, this.wall);
        

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




        
       

        this.physics.add.overlap(this.player, this.button, () => {
            // Move the wall to the left
            this.tweens.add({
                targets: this.wall,
                y: 0,
                duration: 100,
                ease: 'Linear'
            });
            console.log('Button pressed');
        }, null, this);

        this.physics.add.overlap(this.box, this.button, () => {
            // Move the wall to the left
            this.tweens.add({
                targets: this.wall,
                y: 0,
                duration: 100,
                ease: 'Linear'
            });
            console.log('Button pressed');
        }, null, this);
        
        
        // Set up collision between player and box
        this.physics.add.collider(this.player, this.box);
    }
}

    

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('end', 'end.png');
        this.load.spritesheet('deltaStudio', 'logo.png', {
            frameWidth: 825,
            frameHeight: 638,
            endFrame: 30
        });



    }
    create() {
        
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Room1'));
        });

        this.deltaStudio = this.add.sprite(300, 300, 'deltaStudio');
                this.anims.create({
                    key: 'deltaStudio',
                    frames: this.anims.generateFrameNumbers('deltaStudio', { start: 0, end: 30 }),
                    frameRate: 24,
                    repeat: 0
                });
                this.deltaStudio.setScale(0.5);
                
                //this.deltaStudio.play('deltaStudio', true);
                this.time.delayedCall(1000, () => {
                    this.deltaStudio.play('deltaStudio', true);
                });
                this.time.delayedCall(2000, () => {
                    let textObject = this.add.text(300,400, "Presents").setFontSize(40);
                    textObject.setOrigin(0.5);
                    textObject.alpha = 0;

                    this.tweens.add({
                        targets: textObject,
                        alpha: 1,
                        duration: 1000,
                        ease: 'Linear'
                      });
                });

                this.time.delayedCall(2900, () => {
                    let textObject = this.add.text(300,450, "Lab Test").setFontSize(40);
                    textObject.setOrigin(0.5);
                    textObject.alpha = 0;

                    this.tweens.add({
                        targets: textObject,
                        alpha: 1,
                        duration: 1000,
                        ease: 'Linear'
                      });
                });

                this.time.delayedCall(3600, () => {
                    let textObject = this.add.text(300,500, "Click anywhere to begin").setFontSize(20);
                    textObject.setOrigin(0.5);
                    textObject.alpha = 0;

                    this.tweens.add({
                        targets: textObject,
                        alpha: 1,
                        duration: 1000,
                        ease: 'Linear'
                      });

                      this.input.on('pointerdown', () => {
                        this.cameras.main.fade(1000, 0,0,0);
                        this.time.delayedCall(1000, () => this.scene.start('Room1'));
                    });
                });
        

    }
}


class Outro extends Phaser.Scene {
    constructor() {
        super('Outro')
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('end', 'end.png');
        this.load.spritesheet('deltaStudio', 'logo.png', {
            frameWidth: 825,
            frameHeight: 638,
            endFrame: 30
        });



    }
    create() {
        this.add.image(0, 0, "end").setOrigin(0, 0);


                this.time.delayedCall(1000, () => {
                    let textObject = this.add.text(300,300, "You make it outside of the lab to find\nyourself surrounded by the forest.\nThere is much more to escape.").setFontSize(20);
                    textObject.setOrigin(0.5);
                    textObject.alpha = 0;

                    this.tweens.add({
                        targets: textObject,
                        alpha: 1,
                        duration: 1000,
                        ease: 'Linear'
                      });
                });

                this.time.delayedCall(2900, () => {
                    let textObject = this.add.text(400,350, "To be continued").setFontSize(20);
                    textObject.setOrigin(0.5);
                    textObject.alpha = 0;

                    this.tweens.add({
                        targets: textObject,
                        alpha: 1,
                        duration: 1000,
                        ease: 'Linear'
                      });
                });

                this.time.delayedCall(3600, () => {
                    let textObject = this.add.text(300,500, "Click anywhere to Reset").setFontSize(20);
                    textObject.setOrigin(0.5);
                    textObject.alpha = 0;

                    this.tweens.add({
                        targets: textObject,
                        alpha: 1,
                        duration: 1000,
                        ease: 'Linear'
                      });

                      this.input.on('pointerdown', () => {
                        this.cameras.main.fade(1000, 0,0,0);
                        this.time.delayedCall(1000, () => this.scene.start('Intro'));
                    });
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
            debug: false,
            //debugBodyColor: 0xff0000
        }
    },

    scene: [Intro, Room1, Room2, Room3, Room4, Room5, Outro],
    title: "Adventure Game",
});