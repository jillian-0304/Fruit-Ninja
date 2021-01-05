var knife, knife_swing;

var alien1, alien2, a1Group, a2Group;
var fruit1, fruit2, fruit3, fruit4, f1Group, f2Group, f3Group, f4Group;
var gameoverImg, gameover;

var knifeSound, gameoverSound;

var Play = 1;
var End = 0;
var gameState = Play;

var score, highScore;

function preload(){
  knife_swing = loadImage("sword.png");
  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameoverImg = loadImage("gameover.png");
  
  knifeSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
 
}

function setup(){
  createCanvas(600,600);
  //createBorder
  
  knife = createSprite(300,300,20,20);
  knife.addImage(knife_swing);
  knife.scale = 0.80;
  
  gameover = createSprite(300,300,20,20);
  gameover.addImage(gameoverImg);
  gameover.scale = 2.7;
  
  a1Group = new Group();
  a2Group = new Group();
  
  f1Group = new Group();
  f2Group = new Group();
  f3Group = new Group();
  f4Group = new Group();
  
  score = 0;
  highScore = 0;
  
  knife.x = World.mouseX;
  knife.y = World.mouseY;
  
  //knife.debug = true;
  knife.setCollider("circle", 0, 0, 40);
}

function draw(){
  background(240);
  
  fill("green");
  textSize(15);
  text("Score: "+ score,495,50);
  text("High Score: "+ highScore, 462, 70);
  
  
  if (gameState === Play){
    
    gameover.visible = false;
    
    knife.x = World.mouseX;
    knife.y = World.mouseY;
    
    var select_fruit = Math.round(random(1,4));
  if (World.frameCount % 40 == 0) {
    if (select_fruit == 1) {
      spawnf1();
    } else if (select_fruit == 2) {
      spawnf2();
    } else if (select_fruit == 3) {
      spawnf3();
    } else {
      spawnf4();
    }
  }
    
    var select_alien = Math.round(random(1,2));
  if (World.frameCount % 110 == 0) {
    if (select_alien == 1) {
      spawna1();
    } else if (select_alien == 2) {
      spawna2();
  }}
    
  if (knife.isTouching(f1Group)){
    f1Group.destroyEach();
    
    knifeSound.play();
    score = score + 2;
  }
  if (knife.isTouching(f2Group)){
    f2Group.destroyEach();
    
    knifeSound.play();
    score = score + 2;
  }
  if (knife.isTouching(f3Group)){
    f3Group.destroyEach();
    
    knifeSound.play();
    score = score + 1.5;
  }
  if (knife.isTouching(f4Group)){
    f4Group.destroyEach();
    
    knifeSound.play();
    score = score + 1;
  }

  if (knife.isTouching(a1Group) || (knife.isTouching(a2Group))){
    a1Group.destroyEach();
    a2Group.destroyEach();
    
    gameoverSound.play();
    gameState = End;
  }
  }
  
  if (gameState === End){
    
    gameover.visible = true;
    
    a1Group.destroyEach();
    a2Group.destroyEach();
    
    f1Group.destroyEach();
    f2Group.destroyEach();
    f3Group.destroyEach();
    f4Group.destroyEach();
    
    if (highScore < score){
    highScore = score;
  }
    
   //knife.addImage(gameover);
    //knife.scale = 2.6;
    //knife.x = 300;
    //knife.y = 300;
    
    
  if (mousePressedOver(gameover)){
    restart();
  }
    
  }
  
  drawSprites();
  

}

function spawnf1() {
  var f1 = createSprite(Math.round(random(50, 550)),600,10,10);
  f1.addImage(fruit1);
  f1.scale = 0.23;
  f1.velocityY = -(3.5 + score/4);
  f1.lifetime = 200;
  f1Group.add(f1);
}
function spawnf2() {
  var f2 = createSprite(Math.round(random(50, 550)),0,10,10);
  f2.addImage(fruit2);
  f2.scale = 0.25;
  f2.velocityY = (3.5 + score/4);
  f2.lifetime = 200;
  f2Group.add(f2);
}
function spawnf3() {
  var f3 = createSprite(Math.round(random(50, 550)),0,10,10);
  f3.addImage(fruit3);
  f3.scale = 0.24;
  f3.velocityY = (4 + score/4);
  f3.lifetime = 200;
  f3Group.add(f3);
}
function spawnf4() {
  var f4 = createSprite(Math.round(random(50, 550)),600,10,10);
  f4.addImage(fruit4);
  f4.scale = 0.22;
  f4.velocityY = -(4 + score/4);
  f4.lifetime = 200;
  f4Group.add(f4);
}

function spawna1() {
  var a1 = createSprite(Math.round(random(50,550)), 600,10,10);
  a1.addImage(alien1);
  a1.scale = 1;
  a1.velocityY = -(3.5 + score/10);
  a1.lifetime = 155;
  a1Group.add(a1);
}
function spawna2() {
  var a2 = createSprite(Math.round(random(50,550)),0,10,10);
  a2.addImage(alien2);
  a2.scale = 1;
  a2.velocityY = (3.5 + score/10);
  a2.lifetime = 155;
  a2Group.add(a2);
}

function restart(){
    score=0;
    gameState=Play;
}




