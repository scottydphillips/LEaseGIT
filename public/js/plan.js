


const loadImage = (url, onSuccess, onError) => {
    const img = new Image();
    img.onload = () => {
      onSuccess(img.src);
    };
    img.onerror = onError();
    img.src = url;
  };

  const loadSofa = (x, y) => {
    loadImage(
        "../../public/images/furniture/sofa.png",
        url => {
          console.log("Success");
    
          let newSofa = Bodies.rectangle(x, y, 340, 120, {
              density: 0.0005,
              frictionAir: 0.2,
              restitution: 0.3,
              friction: 0.01,
              render: {
                sprite: {
                  texture: url, // set texture here
                  xScale: 0.15,
                  yScale: 0.15
                }
              }
            })
          
          World.add(engine.world, [
            newSofa
          ]);
        },
        () => {
          console.log("Error  Loading ");
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

loadSofa(200, 100);
loadSofa(400, 300);
loadSofa(600, 500);
loadSofa(800, 700);

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

