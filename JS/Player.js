//Calculate what should move in response to key press of A or D
function PlayerMovement() {
    //Variables
    let borderL = false;
    let borderR = false;

    //Checks if the player isn't trying to go out of map
        if (fakePlayerPos < screenWidth - blockSize * 4 - blockSize / 2) {
            borderL = true;
            borderR = false;
        } else if (fakePlayerPos > farrestRight - screenWidth) {
            borderL = false;
            borderR = true;
        } else borderL, borderR = false;

    //Checks if there is input after that move sprites
    if (held_directionsX[0]) {
        //Speed at which player moves
        let speed = time * 4;

        //Moves player to left or calls fakeCamera()
        if (held_directionsX[0] === directionsX.left && !borderL) fakeCamera(speed, 1);

        //Moves player to right or calls fakeCamera()
        if (held_directionsX[0] === directionsX.right && !borderR) fakeCamera(speed, -1);
    }
}

//Moves the sprites that way to make it look like the player is moving
function fakeCamera(speed, direction) {
    /*<--Moves sprites insteded of player-->*/

    //Background
    for (i = 0; i < backLayer.length; i++) backLayer[i].x += speed * direction / 10;

    for (i = 0; i < rockRockLayer.length; i++) rockRockLayer[i].x += speed * direction * 0.6;
    for (i = 0; i < rockLayer.length; i++) rockLayer[i].x += speed * direction * 0.75;

    //Player Layer
    for (i = 0; i < midLayer.length; i++) midLayer[i].x += speed * direction;
    for (i = 0; i < placedBuildings.length; i++) placedBuildings[i][0].x += speed * direction;
    castle.x += speed * direction;

    for (i = 0; i < enemyArr.length; i++) enemyArr[i][0].x += speed * direction;
    
    //Foreground
    for (i = 0; i < treeBackLayer.length; i++) treeBackLayer[i].x += speed * direction;
    for (i = 0; i < treeFrontLayer.length; i++) treeFrontLayer[i].x += speed * direction;

    //Position on which the player should be
    fakePlayerPos -= speed * direction;
}