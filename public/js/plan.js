
const houseWidth = window.innerWidth * 0.8;
const houseHeight = window.innerHeight * 0.8;

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
        floor = Bodies.rectangle(houseWidth/2, houseHeight/2, 1, 1, {
            density: 0.0005,
            frictionAir: 0.2,
            restitution: 0.3,
            render: {
              sprite: {
                texture: image.src, 
                xScale: (houseWidth/image.width),
                yScale: (houseHeight/image.height)
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

    //Add floor and remove collision
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
    
const engine = Engine.create();
const render = Render.create({
    element: document.getElementById('stage'),
    engine: engine,
    options: {
        width: houseWidth,
        height: houseHeight,
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
const nightstandUrl = "./images/furniture/nightstand.png";
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
  addWall(0, 0, houseWidth*2, 50, wallUrl);
  addWall(0, 0, 50, houseHeight*2, wallUrl);
  addWall(houseWidth, 0, 50, houseHeight*2, wallUrl);
  addWall(0, houseHeight, houseWidth*2, 50, wallUrl);
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
