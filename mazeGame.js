function generateMaze()
{

  const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

  // the -3 and -56 exist to disable scrolling
  let width = window.innerWidth -3;
  let height = window.innerHeight -56;
  let unitLengthX = width / cellsHorizontal[index];
  let unitLengthY = height / cellsVertical[index];

  let runner = Runner.create();
  let engine = Engine.create();
  let { world } = engine;
  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;
  let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      wireframes: false,
      width,
      height
    }
  });
  Render.run(render);
  Runner.run(runner, engine);

  // Walls
  const walls = [
    Bodies.rectangle(width / 2, 0, width, 4.5, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 4.5, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 4.5, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 4.5, height, { isStatic: true })
  ];
  World.add(world, walls);

  //////////////////
  // Maze generation
  /////////////////

  const shuffle = arr => {
    let counter = arr.length;

    while (counter > 0) {
      const ind = Math.floor(Math.random() * counter);
      counter--;
      const temp = arr[counter];
      arr[counter] = arr[ind];
      arr[ind] = temp;
    }
    return arr;
  };

  const grid = Array(cellsVertical[index])
    .fill(null)
    .map(() => Array(cellsHorizontal[index]).fill(false));

  const verticals = Array(cellsVertical[index])
    .fill(null)
    .map(() => Array(cellsHorizontal[index] - 1).fill(false));

  const horizontals = Array(cellsVertical[index] - 1)
    .fill(null)
    .map(() => Array(cellsHorizontal[index]).fill(false));

  const startRow = Math.floor(Math.random() * cellsVertical[index]);
  const startColumn = Math.floor(Math.random() * cellsHorizontal[index]);


  const stepThroughCell = (row, column) => {
    // If i have visted the cell at [row, column], then return
    if (grid[row][column]) {
      return;
    }

    // Mark this cell as being visited
    grid[row][column] = true;

    // Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
      [row - 1, column, 'up'],
      [row, column + 1, 'right'],
      [row + 1, column, 'down'],
      [row, column - 1, 'left']
    ]);
    // For each neighbor....
    for (let neighbor of neighbors) {
      const [nextRow, nextColumn, direction] = neighbor;

      // See if that neighbor is out of bounds
      if (
        nextRow < 0 ||
        nextRow >= cellsVertical[index] ||
        nextColumn < 0 ||
        nextColumn >= cellsHorizontal[index]
      ) {
        continue;
      }

      // If we have visited that neighbor, continue to next neighbor
      if (grid[nextRow][nextColumn]) {
        continue;
      }

      // Remove a wall from either horizontals or verticals
      if (direction === 'left') {
        verticals[row][column - 1] = true;
      } else if (direction === 'right') {
        verticals[row][column] = true;
      } else if (direction === 'up') {
        horizontals[row - 1][column] = true;
      } else if (direction === 'down') {
        horizontals[row][column] = true;
      }

      stepThroughCell(nextRow, nextColumn);
    }
  };

  stepThroughCell(startRow, startColumn);

  horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) {
        return;
      }

      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX / 2,
        rowIndex * unitLengthY + unitLengthY,
        unitLengthX,
        1,
        {
          label: 'wall',
          isStatic: true,
          render:{
            fillStyle: 'green'
          }
        }
      );
      World.add(world, wall);
    });
  });

  verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) {
        return;
      }

      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX,
        rowIndex * unitLengthY + unitLengthY / 2,
        1,
        unitLengthY,
        {
          label: 'wall',
          isStatic: true,
          render:{
            fillStyle: 'green'
          }
        }
      );
      World.add(world, wall);
    });
  });

  // Spawning Goal

  const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX / 2,
    unitLengthY / 2,
    {
      label: 'goal',
      isStatic: true,
      render:{
        fillStyle: 'yellow'
      }
    }
  );
  World.add(world, goal);

  // Spawning Ball

  const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
  const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
    label: 'ball'
  });
  World.add(world, ball);

  //spawn ball over goal
  // const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
  // const ball = Bodies.circle(  width - unitLengthX / 2, height - unitLengthY / 2 -50 , ballRadius, {
  //   label: 'ball'
  // });
  // World.add(world, ball);


  //ball movement
  document.addEventListener('keydown', event => {
    const { x, y } = ball.velocity;
    if (event.keyCode === 87) {
      Body.setVelocity(ball, { x, y: -velocity[index] });
    }
    if (event.keyCode === 68) {
      Body.setVelocity(ball, { x: velocity[index], y });
    }
    if (event.keyCode === 83) {
      Body.setVelocity(ball, { x, y:velocity[index] });
    }
    if (event.keyCode === 65) {
      Body.setVelocity(ball, { x:-velocity[index], y });
    }
  });

  document.addEventListener('keyup', event => {
    const { x, y } = ball.velocity;
    if (event.keyCode === 87) {
      Body.setVelocity(ball, { x, y: 0 });
    }
    if (event.keyCode === 68) {
      Body.setVelocity(ball, { x: 0, y });
    }
    if (event.keyCode === 83) {
      Body.setVelocity(ball, { x, y:0 });
    }
    if (event.keyCode === 65) {
      Body.setVelocity(ball, { x:0, y });
    }
  });


  function deleteCurrentWorld(event,Matter,world,engine,render,runner)
  {
    event.preventDefault();
    Matter.World.clear(world);
    Matter.Engine.clear(engine);
    Matter.Render.stop(render);
    Matter.Runner.stop(runner);
    render.canvas.remove();
    render.canvas = null;
    render.context = null;
    render.textures = {};
  }

  // Win Condition
  Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach(collision => {
      const labels = ['ball', 'goal'];

      //stopping ball from slowing down on collision
      ball.friction = 0;
      ball.frictionAir = 0;
      ball.restitution = 0;

      if (
        labels.includes(collision.bodyA.label) &&
        labels.includes(collision.bodyB.label)
      ) {
          //when user wins this happens

          Body.setStatic(ball, true);
          world.gravity.y = 1;

          //this will make walls fall
          world.bodies.forEach(body => {
            if (body.label === 'wall') {
              let random = Math.random();
              if(index === 4)
              {
                if(random<0.1)
                  Body.setStatic(body, false);
                  else {
                    World.remove(world,body)
                  }
              }else if(index ===3)
              {
                if(random <0.2)
                {
                  Body.setStatic(body, false);
                }
              }else if(index ===2){
                if(random <0.3)
                {
                  Body.setStatic(body, false);
                }
              } else {
                Body.setStatic(body, false);
              }
            }
          });
          if(index<4) // checking if last level
          {
            index++;
            localStorage.setItem('Index', index);
            console.log(localStorage.getItem('Index'));
            setTimeout(()=>nextLevelPage.classList.remove('hidden') ,1000)
          }else {

              //last level

              gameoverPage.classList.remove('hidden');
              playAgainButton.addEventListener('click', event =>{
              deleteCurrentWorld(event,Matter,world,engine,render,runner);
              gameoverPage.classList.add('hidden');
              index = 0;
              localStorage.setItem('Index', index)
              console.log(localStorage.getItem('Index'));
              setInfo();
              generateMaze();
            })
          }
        }
    });
  });

// next level button
  nextLevelButton.addEventListener('click', event =>
  {
    deleteCurrentWorld(event,Matter,world,engine,render,runner);
    localStorage.setItem('Level', level[index]);
    setInfo();
    nextLevelPage.classList.add('hidden');
    generateMaze();
  });
}
