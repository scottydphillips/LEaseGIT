


const loadImage = (imageUrl, whenLoaded) => {
    const img = new Image();
    img.onload = () => {
      whenLoaded(img);
    };
    img.src = imageUrl;
  };

  const addFurniture = (x, y, width, height, imageUrl) => {
    loadImage(imageUrl,
      (image) => {
        let newFurniture = Bodies.rectangle(x, y, width, height, {
            density: 0.0005,
            frictionAir: 0.2,
            restitution: 0.3,
            render: {
              sprite: {
                texture: image.src, // set texture here
                xScale: (width/image.width) * 1.1,
                yScale: (height/image.height) * 1.1
              }
            }
          })
        World.add(engine.world, [
          newFurniture
        ]);
      }
    );
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
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
        wireframes: false,
        background: 'white'
    }
});
engine.gravity.y = 0;

let furn;

const sofaUrl = "../../public/images/furniture/sofa.png";

addFurniture(200, 100, 230, 75, sofaUrl);
addFurniture(200, 300, 280, 90, sofaUrl);
addFurniture(200, 500, 400, 200, sofaUrl);
addFurniture(200, 700, 20, 10, sofaUrl);

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

//synce mouse to render
render.mouse = mouse;

Runner.run(engine);
Render.run(render);

