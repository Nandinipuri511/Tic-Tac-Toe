let boxes = document.querySelectorAll(".box")
let reset = document.querySelector("#reset")
let newGame = document.querySelector("#newGame")
let msg_container = document.querySelector(".msg_container")
let msg = document.querySelector("#msg")


let turn_O = true;
let count = 0 // to track draw
// 2d arraya use krenge winning patterns store krne ke liye
const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        console.log("box was clicked");

        if(turn_O == true){
            box.innerText = "O"
            // this should work like a toggle button so
            turn_O = false

        }
        else{
            box.innerText = "X"
            turn_O = true
        }
        box.disabled = true
        count++



       let isWinner = checkWinner();
       if(count === 9 && isWinner === undefined){
        gameDraw()
       }
    });
});

const gameDraw =() =>{
    msg.innerText = `Game was a draw`
    msg_container.classList.remove("hide")
    disableBoxes()
};
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false
        box.innerText = ""
    }

}
const disableBoxes =() =>{
    for(let box of boxes){
        box.disabled = true;
    }

}



const showWinner = (winner) => {
    msg.innerText = `Congrats, winner is ${winner}`;
    msg_container.classList.remove("hide")
    disableBoxes();

}
const checkWinner = () =>{
    for(let pattern of winPattern){
        let pos1val =boxes[pattern[0]].innerText;
        let pos2Val =boxes[pattern[1]].innerText;
        let pos3Val =boxes[pattern[2]].innerText;
        
            if(pos1val != "" && pos2Val != "" && pos3Val != ""){
                if(pos1val === pos2Val && pos2Val === pos3Val){
                    //console.log("Winner", pos1val);
                    showWinner(pos1val)
                    return true
                }
            }
    }


}

// make a new fn to completely rest the game
const resetGame = () =>{
    turn_O = true
    count = 0
    enableBoxes()
    msg_container.classList.add("hide")
}


newGame.addEventListener("click", resetGame)
reset.addEventListener("click", resetGame)