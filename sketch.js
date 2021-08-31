var END=0;
var PLAY=1;

var gameState = PLAY



var SpaceImg,Space;
var Rocket1,Rocket1Img;
var Obstacle1,Obstacle1Img;
var Obstacle2,Obstacle2Img;
var gameover ,gameoverImg;
var Obstacle1G , Obstacle2G


var score=0;



function preload(){
SpaceImg = loadImage("space1.png");   
Rocket1Img = loadImage("rocket1.png");
Obstacle1Img = loadImage("obstacle.png");
Obstacle2Img = loadImage("obstacle1.png");
gameoverImg = loadImage("gameOver.png");
spaceSound = loadSound("spaceSound.mp3");
}

function setup() {
createCanvas(600,600);
spaceSound.loop();
Space = createSprite(300,300);
Space.addImage("space",SpaceImg);
Space.velocityY = 0.5;



Rocket1 = createSprite(200,200,50,50);
Rocket1.scale=0.5;
Rocket1.addImage("rocket",Rocket1Img);

gameover = createSprite(250,350);
gameover.addImage(gameoverImg);
gameover.scale=0.9;
gameover.visible = false;

Obstacle1G = new Group();
Obstacle2G = new Group();

score=0;
 
}

function draw() {
    background(0);

    drawSprites();
    text("Score:"+ score,500,50);

    
    
 if (gameState === PLAY){

   

 if (keyDown("LEFT_ARROW")){
     Rocket1.x = Rocket1.x -3;
 }
 if (keyDown("RIGHT_ARROW")){
     Rocket1.x = Rocket1.x +3;
 }
 if(keyDown("space")){
     Rocket1.velocityY = -10;
 }
 
 if(Space.y>400){
    Space.y=300
}
 
 Space.velocityY = (4 + 3* score/100)
 score = score + Math.round(getFrameRate()/60);

 

 Rocket1.velocityY = Rocket1.velocityY + 0.8;

 gameover.visible=false;

 if(Rocket1.y>600){
     Rocket1.destroy();
     gameState=END;
 }
 
 
 
 
 var select_obstacle = Math.round(random(1,2));

 

 if(World.frameCount %150 == 0){
     if (select_obstacle == 1){
         Obstacles1();
     }else if(select_obstacle==2) {
         Obstacles2();
     }
 }

 if (Obstacle1G.isTouching(Rocket1)){
    gameState = END;
}

if(Obstacle2G.isTouching(Rocket1)){
    gameState = END;
}
 

}
else if (gameState === END){
  gameover.visible = true;
  text("PRESS R AND SPACE TO RESTART",200,300);
  textSize(100);
  fill(220)

  if(keyDown("Space")){
    reset();
}

  Space.velocityY=0;
  Rocket1.velocityY=0;

  Obstacle1G.setVelocityXEach(0);
  Obstacle1G.setLifetimeEach(-1);

  Obstacle1G.setVelocityXEach(0);
  Obstacle2G.setLifetimeEach(-1);

 
}

}



function Obstacles1(){
    var Obstacle1 =createSprite(200, -50);
    Obstacle1.scale = 0.1;
    Obstacle1.velocityY = 2
    Obstacle1.addImage(Obstacle1Img);
    Obstacle1.x = Math.round(random(120,400));
    //Obstacle1.setLifetime=170;
    Obstacle1G.add(Obstacle1);
}

function Obstacles2(){
  var  Obstacle2 = createSprite(200,10);
    Obstacle2.scale = 0.1;
    Obstacle2.velocityY = 2
    Obstacle2.addImage(Obstacle2Img);
    Obstacle2.x = Math.round(random(50,200));
   // Obstacle2.setLifetime=170;
    Obstacle2G.add(Obstacle2);
}

function reset(){
    gameState = PLAY;
    gameover.visible=false;
    Rocket1.addImage(Rocket1Img);

    score=0;
}
