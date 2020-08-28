const config = {
  width: 800,
  height: 600,
  // width: 64,
  // height: 64,
  type: Phaser.AUTO,
  backgroundColor: '#999966',
  // backgroundColor: '#00ff00',
  pixelArt: true,
  zoom: 0.8,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

const game = new Phaser.Game(config);
let stepsSound;
let fanch;
let cursors;
let lastPosition = 'standFront';

function preload() {
  this.load.audio('playerStep', 'assets/sounds/steps.mp3')
  this.load.spritesheet('fanch', 'assets/images/fanch-sprite.png', { frameWidth: 16, frameHeight: 16 })
}

function create() {
  this.justDown = Phaser.Input.Keyboard.JustDown;
  stepsSound = this.sound.add('playerStep', { volume: 0.1, loop: true })
  fanch = this.physics.add.sprite(100, 100, 'fanch');
  fanch.displayWidth = 64
  fanch.displayHeight = 64
  fanch.body.collideWorldBounds = true;

  this.anims.create({
    key: 'standFront',
    frames: [{ key: 'fanch', frame: 0 }],
  })

  this.anims.create({
    key: 'standBehind',
    frames: [{ key: 'fanch', frame: 1 }],
  })

  this.anims.create({
    key: 'standLeft',
    frames: [{ key: 'fanch', frame: 7 }]
  })

  this.anims.create({
    key: 'standRight',
    frames: [{ key: 'fanch', frame: 11 }]
  })

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('fanch', { start: 2, end: 3 }),
    frameRate: 6,
    repeat: -1
  })

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('fanch', { start: 4, end: 5 }),
    frameRate: 6,
    repeat: -1
  })

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('fanch', { start: 6, end: 9 }),
    frameRate: 7,
    repeat: -1
  })

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('fanch', { start: 10, end: 13 }),
    frameRate: 7,
    repeat: -1
  })

  cursors = this.input.keyboard.createCursorKeys()
}

function update() {
  if (!cursors.up.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.left.isDown) {
    fanch.setVelocityX(0)
    fanch.setVelocityY(0)
    fanch.anims.play(lastPosition)
    stepsSound.stop();
  }

  if (this.justDown(cursors.up)) {
    fanch.setVelocity(0, -200);
    fanch.anims.play('up', true);
    lastPosition = 'standBehind'
    stepsSound.play();
  }

  if (this.justDown(cursors.right)) {
    fanch.setVelocity(200, 0)
    fanch.anims.play('right', true)
    lastPosition = 'standRight'
    stepsSound.play();
  }

  if (this.justDown(cursors.down)) {
    fanch.setVelocity(0, 200)
    fanch.anims.play('down', true)
    lastPosition = 'standFront';
    stepsSound.play();
  }

  if (this.justDown(cursors.left)) {
    fanch.setVelocity(-200, 0)
    fanch.anims.play('left', true)
    lastPosition = 'standLeft'
    stepsSound.play();
  }
}
