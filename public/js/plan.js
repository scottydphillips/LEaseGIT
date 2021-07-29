function begin() {
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

const furnitureOne = Bodies.rectangle(400, 200, 70, 30);
const furnitureTwo = Bodies.rectangle(450, 300, 100, 50);
const furnitureThree = Bodies.rectangle(500, 400, 130, 65);
const furnitureFour = Bodies.rectangle(600, 500, 180, 90);

//put furniture in world
World.add(engine.world, [furnitureOne, furnitureTwo, furnitureThree, furnitureFour]);

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
}

window.addEventListener("load", begin);