
const stage = document.getElementById('stage'); //DOM element that room uses
let roomWidth = window.innerWidth * 0.6;
let roomHeight = window.innerHeight * 0.8;
let targetFurniture;
let copyReady = true;

//An image preloader function
const loadImage = (imageUrl, whenLoaded) => {
    const img = new Image();
    img.onload = () => {
      whenLoaded(img);
    };
    img.src = imageUrl;
};

  //Add a rectangular piece of furniture to the engine and renderer
  var floor;
  const addFloor = (imageUrl) => {
    loadImage(imageUrl,
      (image) => {
        floor = Bodies.rectangle(roomWidth/2, roomHeight/2, 1, 1, {
            density: 0.0005,
            frictionAir: 0.2,
            restitution: 0.3,
            render: {
              sprite: {
                texture: image.src, 
                xScale: (roomWidth/image.width),
                yScale: (roomHeight/image.height)
              }
            },
            collisionFilter: {
              'group': -1,
              'category': 2,
              'mask': 0,
            }
          })
        World.add(engine.world, [floor]);
    });
}

  //Add floor and remove collision
  const addWall = (x, y, width, height, imageUrl) => {
    loadImage(imageUrl,
      (image) => {
        let newWall = Bodies.rectangle(x, y, width, height, {
            density: 0.05,
            friction: 0.1,
            restitution: 0.3,  
            isStatic: true,
                        render: {
            sprite: {
              texture: image.src, 
              xScale: (width/image.width),
              yScale: (height/image.height)
            }
          }
        })
      World.add(engine.world, [newWall]);
    });
}
  
  //Add a circular piece of furniture to the engine and renderer
  const addRoundFurniture = (x, y, radius, imageUrl) => {
    loadImage(imageUrl,
      (image) => {
        let newFurniture = Bodies.circle(x, y, radius, {
          density: 0.0005,
          frictionAir: 0.5,
          restitution: 0.3,
          render: {
            sprite: {
              texture: image.src, 
              //scaling factor must be greater for circular body since images are still rectangular
              xScale: (radius/image.width) * 2.2,
              yScale: (radius/image.height) * 2.2
            }
          }
        })
        World.add(engine.world, [newFurniture]);
    });
  }

    //Add four-sided furniture
    const addRectFurniture = (x, y, width, height, imageUrl) => {
      loadImage(imageUrl,
        (image) => {
          let newFurniture = Bodies.rectangle(x, y, width, height, {
              density: 0.0005,
              frictionAir: 0.5,
              restitution: 0.3,
              render: {
                sprite: {
                  texture: image.src, 
                  xScale: (width/image.width) * 1.1,
                  yScale: (height/image.height) * 1.1
                }
              }
            })
          World.add(engine.world, [newFurniture]);
      });
  }
    
//Matter-js
const Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Runner = Matter.Runner,
Composite = Matter.Composite,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse;
Events = Matter.Events;
    
const engine = Engine.create();
const render = Render.create({
    element: stage,
    engine: engine,
    options: {
        width: roomWidth,
        height: roomHeight,
        wireframes: false,
        background: 'white'
    }
});
engine.gravity.y = 0;

//floor path
const placeholderFlooringUrl = "/images/floors/chevron-hardwood-floor.png"
//wall path
const wallUrl = "/images/floors/wall.png"
//furniture data
const sofaData = {width: 300, height: 110, url: "/images/furniture/sofa.png"};
const twinBedData = {width: 200, height: 350, url: "/images/furniture/twin-bed.png"};
const singleBedData = {width: 170, height: 350, url: "/images/furniture/single-bed.png"};
const loveseatData = {width: 200, height: 100, url: "/images/furniture/loveseat.png"};
const plushChairData = {width: 100, height: 100, url: "/images/furniture/plush-chair.png"};
const smallChairData = {width: 70, height: 70, url: "/images/furniture/small-chair.png"};
const whiteChairData = {width: 70, height: 70, url: "/images/furniture/white-chair.png"};
const smallWoodChairData = {width: 70, height: 70, url: "/images/furniture/small-wood-chair.png"};
const tvStandData = {width: 140, height: 40, url: "/images/furniture/tv-stand.png"};
const nightstandData = {width: 70, height: 70, url: "/images/furniture/nightstand.png"};
const glassTableData = {width: 200, height: 100, url: "/images/furniture/glass-table.png"};
const marbleCounterData = {width: 100, height: 300, url: "/images/furniture/marble-counter.png"};
const fridgeData = {width: 120, height: 120, url: "/images/furniture/fridge.png"};
const doubleFridgeData = {width: 200, height: 100, url: "/images/furniture/fridge2.png"};
const workspaceData = {width: 200, height: 200, url: "/images/furniture/workspace.png"};
const patioWithChairsData = {width: 200, height: 200, url: "/images/furniture/patio-table-with-chairs.png"};
const diningRoomTableData = {width: 250, height: 200, url: "/images/furniture/dining-room-table.png"};
const woodTableData = {width: 200, height: 100, url: "/images/furniture/wood-table.png"};
const roundMarbleTableData = {radius: 50, url: "/images/furniture/round-marble-table.png"};
const roundWoodTableData = {radius: 50, url: "/images/furniture/round-wood-table.png"};
const roundGlassTableData = {radius: 50, url: "/images/furniture/round-glass-table.png"};
const kitchenSinkData = {width: 120, height: 60, url: "/images/furniture/kitchen-sink.png"};
const stoveData = {width: 120, height: 90, url: "/images/furniture/stove.png"};
const electricStoveData = {width: 120, height: 90, url: "/images/furniture/electric-stove.png"};
const bathData = {width: 80, height: 200, url: "/images/furniture/bath.png"};
const pottedPlantData = {radius: 30, url: "/images/furniture/potted-plant.png"};
const bigPottedPlantData = {radius: 60, url: "/images/furniture/potted-plant.png"};

//Add sample floor texture without collision
addFloor(placeholderFlooringUrl);

//Mouse object to move and target furniture
var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
Composite.add(engine.world, mouseConstraint);
//sync mouse to render
render.mouse = mouse;
Runner.run(engine);
Render.run(render);

//Load sample furniture textures and create their bodies
//set brief delay to allow floor to load both its texture and body first
setTimeout(function(){
  //walls
  addWall(0, 0, roomWidth*2, 50, wallUrl);
  addWall(0, 0, 50, roomHeight*2, wallUrl);
  addWall(roomWidth, 0, 50, roomHeight*2, wallUrl);
  addWall(0, roomHeight, roomWidth*2, 50, wallUrl);
  //furniture
  addRectFurniture(100, 50, 250, 100, loveseatData.url);
  addRectFurniture(300, 50, 300, 110, sofaData.url);
  addRectFurniture(100, 300, 100, 100, plushChairData.url);
  addRectFurniture(1200, 200, 200, 350, twinBedData.url);
  addRectFurniture(800, 200, 170, 350, singleBedData.url);
  addRectFurniture(600, 600, 120, 30, tvStandData.url);
  addRectFurniture(1000, 100, 70, 70, nightstandData.url);
  addRectFurniture(roomWidth - 100, roomHeight - 100, 200, 200, workspaceData.url);
  addRectFurniture(100, roomHeight - 100, 250, 200, diningRoomTableData.url);
  addRoundFurniture(500, 300, 50, roundMarbleTableData.url);
  addRoundFurniture(700, 300, 50, roundWoodTableData.url);
  addRoundFurniture(400, roomHeight - 100, 50, pottedPlantData.url);
  addRoundFurniture(30, 120, 30, bigPottedPlantData.url);
}, 150);

//Capture body user is targeting
Events.on(mouseConstraint, "startdrag", function(e){
  targetFurniture = e.body;
})

//Keypress Events: Delete, Copy, Rotate
window.addEventListener('keydown', (e) => {
  //Delete furniture
  if (e.key == 'Delete'|| e.key == 'Backspace' || e.key == 'r')
    World.remove(engine.world, targetFurniture);

  //Copy furniture
  if (copyReady && (e.key == 'Insert' || e.key == 'c' || e.key == 'n')){
    
    if (targetFurniture.parent.label == "Circle Body"){
      addRoundFurniture(roomWidth/2, roomHeight/2,
        targetFurniture.circleRadius, targetFurniture.render.sprite.texture);
    } else {
      let newWidth = targetFurniture.vertices[1].x - targetFurniture.vertices[0].x;
      let newLength = targetFurniture.vertices[2].y - targetFurniture.vertices[1].y;
      addRectFurniture(roomWidth/2, roomHeight/2,
                      newWidth, newLength, targetFurniture.render.sprite.texture);
    }

    //Brief delay before copying again
    copyReady = false;
    setTimeout(function(){
      copyReady = true;
    }, 200);
  }

  //Rotate Left
  if (e.key == 'ArrowLeft' || e.key == 'a' || e.key == 'w')
    Matter.Body.rotate(targetFurniture, -0.07);

  //Rotate Right
  if (e.key == 'ArrowRight' || e.key == 'd' || e.key == 's')
    Matter.Body.rotate(targetFurniture, 0.07);
  });

//dropdown menu new floor
function selectFloor() {
  let selectedFloor = document.getElementById("floor-picker").value;
  floor.render.sprite.texture = `/images/floors/${selectedFloor}.png`
}

//Create new furniture from dropdown menu
function selectNewFurniture() {
  let selectedFurniture = document.getElementById("furniture-picker").value;

  //retrieve the corresponding furniture data
  let furnitureData;
  switch (selectedFurniture) {
    case ("sofa"):
      furnitureData = sofaData;
      break;
    case ("loveseat"):
      furnitureData = loveseatData;      
      break;
    case ("single-bed"):
      furnitureData = singleBedData;      
      break;
    case ("twin-bed"):
      furnitureData = twinBedData;      
      break;
    case ("small-chair"):
      furnitureData = smallChairData;      
      break;
    case ("white-chair"):
      furnitureData = whiteChairData;      
      break;
    case ("plush-chair"):
      furnitureData = plushChairData;      
      break;
    case ("wood-chair"):
      furnitureData = smallWoodChairData;      
      break;
    case ("nightstand"):
      furnitureData = nightstandData;      
      break;
    case ("tv-stand"):
      furnitureData = tvStandData;      
      break;
    case ("dining-room-table"):
      furnitureData = diningRoomTableData;      
      break;
    case ("wood-table"):
      furnitureData = woodTableData;      
      break;
    case ("workspace"):
      furnitureData = workspaceData;      
      break;
    case ("marble-counter"):
      furnitureData = marbleCounterData;      
      break;
    case ("round-glass-table"):
      furnitureData = roundGlassTableData;      
      break;
    case ("round-wood-table"):
      furnitureData = roundWoodTableData;      
      break;
    case ("round-marble-table"):
      furnitureData = roundMarbleTableData;      
      break;
    case ("glass-table"):
      furnitureData = glassTableData;      
      break;
    case ("kitchen-sink"):
      furnitureData = kitchenSinkData;      
      break;
    case ("stove"):
      furnitureData = stoveData;      
      break;
    case ("electric-stove"):
      furnitureData = electricStoveData;      
      break;
    case ("double-fridge"):
      furnitureData = doubleFridgeData;      
      break;
    case ("fridge"):
      furnitureData = fridgeData;      
      break;
    case ("bath"):
      furnitureData = bathData;      
      break;
    case ("patio-table-with-chairs"):
      furnitureData = patioWithChairsData;      
      break;
    case ("potted-plant"):
      furnitureData = pottedPlantData;      
      break;
    case ("big-potted-plant"):
      furnitureData = bigPottedPlantData;      
      break;
    default:
      furnitureData = loveseatData; 
  }

  //Add furniture based on whether is has radius property
  if (furnitureData.radius)
    addRoundFurniture(roomWidth/2, roomHeight/2, furnitureData.radius, furnitureData.url)
  else
    addRectFurniture(roomWidth/2, roomHeight/2, furnitureData.width, furnitureData.height, furnitureData.url);
}

