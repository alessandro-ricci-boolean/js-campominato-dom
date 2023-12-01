function generateUniqueRandomNumber(array_bombs){
    let check_number = false;
    let randomInt;
    while(!check_number){
        randomInt = Math.floor(Math.random() * total_cells + 1);
        if(!array_bombs.includes(randomInt)){
            check_number = true;
        }
    }
    return randomInt;
}

function generateBombList(number_of_bombs, total_cells){
    let bombs = [];
    for(let i=0; i<number_of_bombs; i++){
        let bomb_number = generateUniqueRandomNumber(bombs, total_cells);
        bombs.push(bomb_number);
    }
    return bombs;
}

function createCell(num, cellsPerRow){
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `calc(100% / ${cellsPerRow})`;
    square.style.height = square.style.width;
    square.innerText = num;
    return square
}

function createNewGame(){
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    const difficulty = document.getElementById("difficulty");
    const level = parseInt(difficulty.value);
    const NUMBER_OF_BOMBS = 16;
    let points = 0;

    let cells_number;
    let cells_per_row;
    switch(level){
        case 1:
            cells_number = 100;
            break;
        case 2:
            cells_number = 81;
            break;
        case 3:
            cells_number = 49;
            break;
        default:
            alert("Seleziona prima il livello di difficoltà");
            break;
    }
    
    cells_per_row = Math.sqrt(cells_number);

    const bombs = generateBombList(NUMBER_OF_BOMBS, cells_number);

    for(let i=1; i<=cells_number; i++){
        let cell = createCell(i, cells_per_row);
        cell.addEventListener("click", function(){
            if(!bombs.includes(i)){
                this.classList.add("clicked");
                points++;
                document.getElementById("score").innerText = `Il tuo punteggio è pari a: ${points} punti`
            }
            else{
                this.classList.add("clicked-bomb");
            }
        });
        grid.appendChild(cell);
    }
    
}

const button = document.getElementById("play");
button.addEventListener("click",function(){
    createNewGame();
})