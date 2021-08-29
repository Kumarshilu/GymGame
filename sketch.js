var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var boy,boy_running,boy_collided,boyImage,zombie,zombie_running,zombie_attack;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;
var weightObstacle1, weightObstacle2, weightObstacle3, weightObstacle4,;
var weightObstacleGroup;

function preload(){
ground_image=loadImage("Gym Bg.jpg");
  boy_running=loadAnimation("Boy 1.png","Boy 2.png","Boy 3.png","Boy 4.png");
  zombie_running=loadAnimation("monster.png");
  obstacle1=loadImage("jF7.png");
  obstacle2=loadImage("jF8.png");
  obstacle3=loadImage("jF9.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  weightObstacle1 = loadImage("Weight 1.png")
  weightObstacle2 = loadImage("Weight 2.png")
  weightObstacle3 = loadImage("Weight 3.png")
  weightObstacle4 = loadImage("Weight 4.png")
  checkPointSound = loadSound("checkPoint.mp3")
  gameOverImage=loadImage("gameOver1.png");
  restartImage=loadImage("restart1.png");
  
  boyImage=loadImage("Boy2.png");
}

function setup() {
 createCanvas(windowWidth, windowHeight);
  
ground=createSprite(width/2, height, width,2);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=1.4;
   ground.velocityX=-1
  
   boy=createSprite(300,420,600,10);
  boy.addAnimation("boy_running",boy_running);
  
  boy.addImage("boyImage",boyImage);
  boy.scale=0.2;
 // boy.velocityX=2;
  boy.debug=false;
  boy.setCollider("rectangle",0,0,boy.width,boy.height)
  
  
  zombie=createSprite(50,410,600,10);
  zombie.addAnimation("zombie_running",zombie_running);
  zombie.addAnimation("zombie_attack",zombie_attack);
  zombie.addImage("zombie_idle",zombie_idle);
  zombie.scale=0.2;
  zombie.debug=false;
 // zombie.velocityY=-13;
 // zombie.velocityX=Math.round(random(1,2));
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup=new Group();
  
  score=0;
}

function draw() {
 background("black");
  
 // console.log(boy.y);
   //Gravity
boy.velocityY = boy.velocityY + 0.8;
boy.collide(invisible_ground); 
  
   //Gravity
zombie.velocityY = zombie.velocityY + 0.8;
zombie.collide(invisible_ground); 
  
  
   if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
    //  zombie.y=boy.y;
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   if (obstaclesGroup.isTouching(zombie)){
     zombie.velocityY=-12;
   }
 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
 if((keyDown("space")&& boy.y >= 220)) {
   boy.velocityY = -12;
    jumpSound.play();
  }  
  
  if (boy.isTouching(obstaclesGroup)){
    gameState=END;
     dieSound.play();
  }
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     boy.velocityY = 0
    boy.changeImage("boyImage",boyImage);
  zombie.changeAnimation("zombie_attack",zombie_attack);
     zombie.x=boy.x;
  if (zombie.isTouching(boy)) {
    boy.changeImage("boy_collided",boy_collided);
    zombie.changeImage("zombie_idle",zombie_idle);
  }
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
 
  drawSprites();
  fill("lightpink");
  textSize(20);
   text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
boy.changeAnimation("boy_running",boy_running);
  obstaclesGroup.destroyEach();
  score=0;
  zombie.x=50;
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,450,10,40);
   obstacle.velocityX = -6 ;//+ score/100);
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}

