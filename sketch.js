var balloon,balloonImage1,balloonImage2,balloonPosition,database;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  

  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(displayWidth,displayHeight);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
  balloonPosition = database.ref('Balloon/Position')
  balloonPosition.on("value",readPosition,showError)
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-1);
    balloon.scale = balloon.scale-0.001;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale+0.001;
    writePosition(0,+1);
  }
      camera.position.x = balloon.x
      camera.position.y = balloon.y
  drawSprites();
  fill(0);
  stroke("black");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}
function readPosition(data){
  position = data.val()
  balloon.position.x = position.x
  balloon.position.y = position.y
}
function showError(){
  console.log("there is an error on database")
}
function writePosition(x,y){
  database.ref('Balloon/Position').set(
      {
          'x':position.x+x,
          'y':position.y+y
      }
  )
}
