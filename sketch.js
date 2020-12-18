var PLAY = 1;
var END = 0;
var gameState = 1;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var score = 0 ;
var survivalTime = 0;

var colors = ["red","blue","green"];


function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(300,350,1200,10);
  ground.x = ground.width/2;
  
  stonesGroup = new Group();
  bananasGroup = new Group();
  
}

function draw() {
  background("violet");
  
  monkey.collide(ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
  
  if (gameState === PLAY) {
    
    ground.velocityX = -4;
    
    if (monkey.isTouching(bananasGroup)) {
      monkey.scale = monkey.scale+0.02;
      bananasGroup.destroyEach();
    }

    if (monkey.isTouching(stonesGroup)) {
     monkey.scale = monkey.scale-0.02;
     stonesGroup.destroyEach();
    }
    
    if (monkey.isTouching(stonesGroup) && monkey.scale < 0) {
      gameState = END;
    }
    
    spawnBananas();
    spawnStones();
    
    if (keyDown("space")&& monkey.y >= 20) {
      monkey.velocityY = -14;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    score = score + Math.round(getFrameRate()/50);
    
    
  }
  if (gameState === END) {
    ground.velocityX = 0;
    bananasGroup.setVelocityXEach(0);
    stonesGroup.setVelocityXEach(0);
    bananasGroup.setLifetimeEach(0);
    stonesGroup.setLifetimeEach(0);
    
    
  }
  
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score, 400,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.round(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,100,50);
  
  drawSprites();
}

function spawnBananas() {
  if (frameCount%150 === 0) {
    banana = createSprite(600,120,20,20);
    banana.y = Math.round(random(150,250));
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 120;
    bananasGroup.add(banana);
  }
}

function spawnStones() {
  if (frameCount%100 === 0) {
    stones = createSprite(600,315,20,20);
    stones.velocityX = -5;
    stones.addImage(obstaclesImage);
    stones.scale = 0.2;
    stones.lifetime = 120;
    
    stonesGroup.add(stones);
  }
}
