const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

//=======================================================
let snake = {
  x:18, y: 18,
  vx: 0, vy: 0,
  tail: 5,
  trail: []
},

  apple = {
  x:15, y:15
  },

  map = {
    width: 64, 
    height: 64
  };

//=======================================================
context.scale(10,10);
document.addEventListener('keydown', onKeyDown);
setInterval(update, 100);

function update() {
  snake.x += snake.vx;
  snake.y += snake.vy;
  if (snake.x < 0)  snake.x = map.width - 1 ;
  if (snake.x > map.width-1)  snake.x = 0;
  if (snake.y < 0)  snake.y = map.height - 1 ;
  if (snake.y > map.height)  snake.y = 0 ;

  context.fillStyle = '#C4AD67';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#3F7A32';
  for (let i=snake.trail.length; i--;) {
    let pos = snake.trail[i];
    context.fillRect(pos.x, pos.y, 1, 1);
    if(snake.x === pos.x && snake.y === pos.y) {
      snake.tail = 5;
    }
  }

  snake.trail.push({
    x: snake.x,
    y: snake.y
  });
  while (snake.trail.length > snake.tail) {
    snake.trail.shift();
  }

  if (snake.x === apple.x && snake.y === apple.y) {
    snake.tail++;

    apple.x = Math.floor(Math.random()*map.width);
    apple.y = Math.floor(Math.random()*map.height);
  }

  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, 1, 1);
}




//keys
//=======================================================
function onKeyDown(event) {
  switch (event.keyCode) {
    case 87: // up
      snake.vx = 0;
      snake.vy = -1;
      break;
    case 83: // down
      snake.vx = 0;
      snake.vy = 1;
      break;
    case 65: // left
      snake.vx = -1;
      snake.vy = 0;
      break;
    case 68: // right
      snake.vx = 1;
      snake.vy = 0;
      break;

      default: 
  }
}



