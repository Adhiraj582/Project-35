//Create variables here
var dog, dogImg, happyDog, happyDogImg;
var database;
var foodS, foodStock;


function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('foodS');
  foodStock.on("value",readStock);  
  foodStock.set(20);


	createCanvas(500, 500);

  dog = createSprite(250,300,50,50);
  dog.addImage(dogImg);
  dog.scale = (0.2)


}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill("white");
  stroke("black");
  strokeWeight(2);
  text("Food Remaining : " + foodS, 170,200);
}

function readStock(data){
    foodS = data.val();
}

function writeStock(x){
  
  if(x<=0){
    x = 0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    foodS:x
  })
}
