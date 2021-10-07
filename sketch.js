var path, boy, leftBoundary, rightBoundary;
var pathImg, boyImg;
var i;
var obstacle_group, coin_gourp, powerup_group;
var obstacle, coin, powerup;
var obstacles, coins, powerups;
var game_state = "play";
var y;
var boyc;
var score;

function preload() {
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  obstacle = loadImage("bomb.png");
  coin = loadImage("coin.png");
  powerup = loadImage("energyDrink.png");
  boyc = loadAnimation("Runner-1.png");
}

function setup() {

  createCanvas(600, 400);
  score = 0;
  game_state = "play";
  obstacle_group = new Group();
  coin_group = new Group();
  powerup_group = new Group();
  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale = 1.2;

  //creating boy running
  boy = createSprite(180, 340, 30, 30);
  boy.scale = 0.08;
  boy.addAnimation("JakeRunning", boyImg);
  boy.addAnimation("dead", boyc);


  leftBoundary = createSprite(0, 10, 100, 1000);

  leftBoundary.visible = false;


  rightBoundary = createSprite(400, 0, 100, 1000);
  rightBoundary.visible = false;
}

function draw() {
  background("black");
  text("Score " + score, 400,10);
  edges = createEdgeSprites();
  // boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.bounceOff(rightBoundary);
  //code to reset the background
  path.velocityY = 4;
  
  if (game_state === "play") {
    
    if (path.y > 500) {
      path.y = height / 2;
    }
    boy.x = World.mouseX;
    
    if(boy.x<90){
      boy.x = 90;
    }
    if(boy.x>320){
      boy.x = 320;
    }
    
    
    createObs();
    createCoins();

    if(boy.isTouching(obstacle_group)){
      game_state = "end";
    }

    if(boy.isTouching(coin_group)){
      score++;
      coin_group.clear();
    }

  }

  if (game_state === "end") {
    path.velocityY = 0;
    obstacle_group.setVelocityYEach(0);
    coin_group.setVelocityYEach(0);
    powerup_group.setVelocityYEach(0);
    boy.changeAnimation("dead", boyc);
  }


  drawSprites();
}

function createObs() {
  if (frameCount % 80 === 0) {
    y = Math.round(random(100, 300))
    obstacles = createSprite(y, 0, 10, 40);
    obstacles.velocityY = 4;
    obstacles.lifeTime = 250;
    obstacles.scale = 0.09;
    obstacles.addImage("bomb", obstacle);
    obstacle_group.add(obstacles);
  }
}
function createCoins() {
  if (frameCount % 100 === 0) {
    y = Math.round(random(100, 300))
    coins = createSprite(y, 0, 10, 40);
    coins.velocityY = 4;
    coins.lifeTime = 250;
    coins.scale = 0.3;
    coins.addImage("coin", coin);
    coin_group.add(coins);
  }
}
