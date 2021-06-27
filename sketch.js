var garden,rabbit;
var gardenImg,rabbitImg;
var apple,appleImage;
var leaf,leafImage;
var grass, grassImage;
var redLeafImage, orangeLeafImage;
var appleGroup, leafGroup;
var rScale = 0.01;
var score = 0;
var gameState = "play";


function preload(){
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  appleImage = loadImage("apple.png");
  leafImage = loadImage("leaf.png");
  redLeafImage = loadImage("redImage.png");
  orangeLeafImage = loadImage("orangeLeaf.png");
}

function setup(){
  
  createCanvas(displayWidth,displayHeight);
  
// Moving background
////garden=createSprite(width/2,height/2,width,height);
//garden.addImage(gardenImg);

//creating boy running
rabbit = createSprite(180,height-50,30,30);
rabbit.scale = rScale;
rabbit.addImage(rabbitImg);
appleGroup = createGroup();
leafGroup = createGroup();  


  
}


function draw() {
  background(gardenImg);
  edges= createEdgeSprites();
  if (gameState === "play"){
    rabbit.collide(edges);
    rabbit.x = mouseX;
    
    items = Math.round(random(1,2));
    if (items === 1){
      spawnApples();
    }
    else{
      spawnLeaf();
    }
    
    for (var i = 0; i < appleGroup.length; i++){
      if(appleGroup.get(i).isTouching(rabbit)){
        console.log("touched");
        appleGroup.get(i).destroy();
        rScale = rScale + 0.005;
        rabbit.scale = rScale;
        score = score + 1;
      }
  
    }
    if (score === 20 || leafGroup.isTouching(rabbit)){
     gameState = "end";
    }
    drawSprites();
  }

  if(gameState === "end"){
    background("Red");
    textSize(40);
    text("GAME OVER", width/2,height/2);
  }

  
  
  
}

function spawnApples(){
  if(frameCount % 80 === 0){
    apple = createSprite(10,-20,20,20);
    apple.x = Math.round(random(50,350));
    apple.addImage("apple",appleImage);
    apple.velocityY = 4;
    apple.scale = 0.05;
    apple.lifetime = (height/apple.velocityY);
    appleGroup.add(apple);
  }
}
function spawnLeaf(){
  if(frameCount % 100 === 0){
    leaf = createSprite(10,-20,20,20);
    leaf.x = Math.round(random(50,350));
    leaf.velocityY = 2;
    leaf.scale = 0.05;
    leaf.lifetime = (height/leaf.velocityY);

    leafR = Math.round(random(1,3));
    switch(leafR) {
      case 1 : leaf.addImage("leaf",leafImage);
               break;
      case 2 : leaf.addImage("leafRed",redLeafImage);
               break;
      case 3 : leaf.addImage("leafOrange",orangeLeafImage);
               break;
      default : break;
      
    }
    leafGroup.add(leaf);

  }
}
