/*<---Variables--->*/

//array for WASD detection
let held_directionsX = [];

//Keys for A and D
const directionsX = {
    left: "KeyA",
    right: "KeyD",
};

//Keys for A and D
const keysX = {
    37: directionsX.left,
    65: directionsX.left,
    39: directionsX.right,
    68: directionsX.right,
};

/*<---Key press detection--->*/

function KeyDetectionStart() {
    //Add key input to array
    document.addEventListener("keydown", (e) => {
        let dir = keysX[e.which];

        if (dir && held_directionsX.indexOf(dir) === -1)held_directionsX.unshift(dir);
    });
    
    //Removes key input from array
    document.addEventListener("keyup", (e) => {
        let dir = keysX[e.which];
        let index = held_directionsX.indexOf(dir);
        
        if (index > -1) held_directionsX.splice(index, 1);
    });
}