class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1lol",car1_Img);

    car2 = createSprite(300,200);
    car2.addImage("car2l",car2_Img);

    car3 = createSprite(500,200);
    car3.addImage("car3o",car3_Img);

    car4 = createSprite(700,200);
    car4.addImage("car4l",car4_Img);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background("#c68767");

      image(track,0,-displayHeight*4,displayWidth,displayHeight * 5)    
       //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(9)
          fill("yellow")
          ellipse(x,y,75,100)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=100
      player.update();
    }
     if(player.distance > 3860){
       gameState = 2;
       player.rank += 1
       Player.updateCarsAtEnd(player.rank)
     }
//lol clue +1 = clue -1 something is notting

    drawSprites();
  }

end(){
  console.log("lol game is over");
  console.log(player.rank)
}
}
