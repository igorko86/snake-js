let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');


for(let i = 0; i < 100; i++){
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}


let excel = document.querySelectorAll('.excel');

let x = 0,
    y = 9;

[...excel].forEach(el=>{

    if (x > 9) {
        x = 0;
        y--;
    }
    
    el.setAttribute('posX', x);
    el.setAttribute('posY', y);
    el.innerHTML = `x=${x} y=${y}`;
    x++;
});

const generatePosition = (min,max) => {
    let posX = Math.floor(Math.random() * (max - min + 1)) + min;
    let posY = Math.floor(Math.random() * (max - min + 1)) + min;
    return [posX,posY];
}



function createSnake() {
     let coordinatesSnake = generatePosition(2,9);
     let snakeBody = [document.querySelector(`[posX = "${coordinatesSnake[0]}"][posY= "${coordinatesSnake[1]}"]`),
                      document.querySelector(`[posX = "${coordinatesSnake[0] - 1}"][posY= "${coordinatesSnake[1]}"]`),
                      document.querySelector(`[posX = "${coordinatesSnake[0] - 2}"][posY= "${coordinatesSnake[1]}"]`)
                     ]; 

    snakeBody.forEach(el => {
        el.classList.add('snakeBody');
    });

    snakeBody[0].classList.add("snakeHead"); 

   return {snakeBody,coordinatesSnake};            
}

let snake = createSnake();

function createMouse() {
    let mouse,
    coordinatesMouse = generatePosition(2,9);
    mouse = document.querySelector(`[posX = "${coordinatesMouse[0]}"][posY= "${coordinatesMouse[1]}"]`);

    while(mouse.classList.contains('snakeBody')) {
        coordinatesMouse = generatePosition(2,9);
        mouse = document.querySelector(`[posX = "${coordinatesMouse[0]}"][posY= "${coordinatesMouse[1]}"]`);
    }

    mouse.classList.add('mouse');
    
    return {coordinatesMouse,mouse};
}

let mouse = createMouse();

function moveSnake() {
    const { snakeBody } = snake;
    let newPositionHead, coordinateX, 
    coordinateXTail, coordinateYTail, 
    newCoordinatesTail, oldMouseCoordinateX, 
    oldMouseCoordinateY;

    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[0].classList.add('snakeBody');
    coordinateY = parseInt(snakeBody[0].getAttribute('posY'));
    coordinateX = parseInt(snakeBody[0].getAttribute('posX'));
    coordinateXTail =  parseInt(snakeBody[snakeBody.length - 1].getAttribute('posX')); 
    coordinateYTail =  parseInt(snakeBody[snakeBody.length - 1].getAttribute('posY'));
    newCoordinatesTail = document.querySelector(`[posX = "${coordinateXTail}"][posY = "${coordinateYTail}"]`);
    
      
    
    switch(direction) {
        case "left":

            if (coordinateX <= 0) {
                coordinateX = 9;
            }

            newPositionHead = document.querySelector(`[posX = "${coordinateX - 1}"][posY = "${coordinateY}"]`);
            break;

        case "up":

            if (coordinateY >= 9) {
                coordinateY = -1;
            }

            newPositionHead = document.querySelector(`[posX = "${coordinateX}"][posY = "${coordinateY + 1}"]`);
            break;

        case "right":

            if (coordinateX >= 9) {
                coordinateX = -1;
            }
            
            newPositionHead = document.querySelector(`[posX = "${coordinateX + 1}"][posY = "${coordinateY}"]`);
            break;
        case "down":

            if (coordinateY <= 0) {
                coordinateY = 10;
            }

            newPositionHead = document.querySelector(`[posX = "${coordinateX}"][posY = "${coordinateY - 1}"]`);
            break;

        default:
        break;
    }

    if ( parseInt(snakeBody[0].getAttribute('posX')) === mouse.coordinatesMouse[0] && parseInt(snakeBody[0].getAttribute('posY')) === mouse.coordinatesMouse[1]) {
        oldMouseCoordinateX = mouse.coordinatesMouse[0];
        oldMouseCoordinateY = mouse.coordinatesMouse[1];
        mouse = createMouse();
    }

    if (coordinateXTail === oldMouseCoordinateX && coordinateYTail === oldMouseCoordinateY) {
        newCoordinatesTail = document.querySelector(`[posX = "${coordinateXTail}"][posY = "${coordinateYTail}"]`);
        newCoordinatesTail.classList.remove('mouse');
        
        newCoordinatesTail.classList.add('snakeBody');
        snake.snakeBody = [...snake.snakeBody, newCoordinatesTail];       
    }

    
    newPositionHead.classList.add('snakeHead');
    
    snake.snakeBody = [newPositionHead, ...snake.snakeBody.slice(0,-1)];
    
}

// let intervalId = setInterval(moveSnake,1000);

document.addEventListener('keydown',changeDirection);

let direction = "right";

function changeDirection(e) {

    switch (e.keyCode) {
        case 37:
        if (direction !== "right") {
            direction = 'left';
        }
        break;
        case 38:
            if (direction !== "down") {
                direction = 'up';
            }
        break;
        case 39:
        if (direction !== "left") {
            direction = 'right';
        }
        break;
        case 40:
        if (direction !== "up") {
            direction = 'down';
        }
        break;
        default:
        console.log("Erro");
    }
}

