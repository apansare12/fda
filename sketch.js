var dog,sadDog,happyDog,feed, addFood, foodObj, lastFed; 
var fedTime, foodS, foodStock, database;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}


function setup() {
  database = firebase.database()
  createCanvas(1000,400);
  
  foodObj = new Food();
  foodStock = database.ref('Food')
  foodStock.on('value',readStock)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
   
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  
  
}

function draw() {
  background(46,139,87);
  //function to read food Stock
  foodObj.display();
fedTime= database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed = data.val()
})


//function to update food stock and last fed time
fill ("red")
textSize(15)
if(lastFed>=12){
  text("lastfeed:"+lastFed%12+"PM",300,30)
}else if(lastFed==0){
  text("lastfeed: 12am",300,30)
}else{
  text("lastfeed:"+lastFed+"am",300,30)
}

  drawSprites();
  
}




function readStock(data){
  foodS=data.val()
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(happyDog)
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}