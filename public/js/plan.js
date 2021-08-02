
const stage = document.getElementById('stage'); //DOM element that room uses
let roomWidth = window.innerWidth * 0.6;
let roomHeight = window.innerHeight * 0.8;
let targetFurniture;
let copyReady = true;

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
//furniture paths
const sofaUrl = "/images/furniture/sofa.png";
const bed1Url = "/images/furniture/bed1.png";
const bed2Url = "/images/furniture/bed2.png";
const loveseatUrl = "/images/furniture/loveseat.png";
const plushChairUrl = "/images/furniture/plush-chair.png";
const tvStandUrl = "/images/furniture/tv-stand.png";
const nightstandUrl = "/images/furniture/nightstand.png";
const workspaceUrl = "/images/furniture/workspace.png";
const diningRoomTableUrl = "/images/furniture/dining-room-table.png";
const roundMarbleTableUrl = "/images/furniture/round-marble-table.png";
const roundWoodTableUrl = "/images/furniture/round-wood-table.png";

//floor
addFloor(placeholderFlooringUrl);

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

//Load wall and furniture textures and create their bodies
//set brief delay to allow floor to load both its texture and body first
setTimeout(function(){
  //walls
  addWall(0, 0, roomWidth*2, 50, wallUrl);
  addWall(0, 0, 50, roomHeight*2, wallUrl);
  addWall(roomWidth, 0, 50, roomHeight*2, wallUrl);
  addWall(0, roomHeight, roomWidth*2, 50, wallUrl);
  //furniture
  addRectFurniture(80, 50, 250, 100, loveseatUrl);
  addRectFurniture(300, 50, 300, 110, sofaUrl);
  addRectFurniture(1200, 200, 200, 350, bed1Url);
  addRectFurniture(800, 200, 200, 350, bed2Url);
  addRectFurniture(600, 600, 120, 30, tvStandUrl);
  addRectFurniture(1000, 100, 70, 70, nightstandUrl);
  addRectFurniture(1000, 600, 200, 200, workspaceUrl);
  addRectFurniture(100, 600, 250, 200, diningRoomTableUrl);
  addRoundFurniture(500, 300, 50, roundMarbleTableUrl);
  addRoundFurniture(700, 300, 50, roundWoodTableUrl);
}, 100);

function selectFloor() {
  let selectedFloor = document.getElementById("floor-picker").value;
  floor.render.sprite.texture = `/images/floors/${selectedFloor}.png`
}

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

// window.addEventListener('resize', () => {
//   roomWidth = window.innerWidth * 0.6;
//   roomHeight = window.innerHeight * 0.8;
//   render.width = roomWidth;
//   render.height = roomHeight;
// });
