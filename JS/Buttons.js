function Stop() {
    if (app.ticker.started == 0) app.ticker.start();
    else app.ticker.stop();
}

function FilterOnOff() { Filter.visible = !Filter.visible };

function PlacePreview(change) {
    selectedBuilding.visible = !selectedBuilding.visible;
    costText.visible = !costText.visible;
    for (i = 0; i < buttonsBuild.length; i++) buttonsBuild[i].visible = !buttonsBuild[i].visible;
}

function SelectBow() {
    PlacePreview();
    selectedBuilding = buildings[0];
    cost = 75;
    costText.text = 75;
    PlacePreview();
}

function SelectSword() {
    PlacePreview();
    selectedBuilding = buildings[1];
    cost = 50;
    costText.text = 50;
    PlacePreview();
}

function SelectShield() {
    PlacePreview();
    selectedBuilding = buildings[2];
    cost = 75;
    costText.text = 75;
    PlacePreview();
}

function SelectCoin() {
    PlacePreview();
    selectedBuilding = buildings[3];
    cost = 25;
    costText.text = 25;
    PlacePreview();
}

function Upgrade() {
    switch (placedBuildings[nearBuilding][2]) {
        case 1:
            if (coins >= (175 * placedBuildings[nearBuilding][3]) && placedBuildings[nearBuilding][3] < 5) {
                coins -= (175 * placedBuildings[nearBuilding][3]);
                placedBuildings[nearBuilding][3]++;
                placedBuildings[nearBuilding][0].texture = bowTexture[placedBuildings[nearBuilding][3]];
                placedBuildings[nearBuilding][4] += 0.25;
            }
            break;
        case 2:
            if (coins >= (100 * placedBuildings[nearBuilding][3]) && placedBuildings[nearBuilding][3] < 5) {
                coins -= (100 * placedBuildings[nearBuilding][3]);
                placedBuildings[nearBuilding][3]++;
                placedBuildings[nearBuilding][0].texture = swordTexture[placedBuildings[nearBuilding][3]];
                placedBuildings[nearBuilding][4] += 0.25;
            }
            break;
        case 3:
            if (placedBuildings[nearBuilding][1] <= 400 && coins >= 150) {
                coins -= 150;
                placedBuildings[nearBuilding][1] += 100;
            }
            break;
        case 4:
            if (coins >= (125 * placedBuildings[nearBuilding][3]) && placedBuildings[nearBuilding][3] < 5) {
                coins -= (125 * placedBuildings[nearBuilding][3]);
                placedBuildings[nearBuilding][3]++;
                placedBuildings[nearBuilding][0].texture = mineTexture[placedBuildings[nearBuilding][3]];
                placedBuildings[nearBuilding][4] += 0.25;
            }
            break;
        default:
            console.log("Something went wrong");
            break;
    }
}

function DestroyBuild() {
    placedBuildings[nearBuilding][0].destroy();
    for (i = nearBuilding; i < placedBuildings.length - 1; i++){
        placedBuildings[i] = placedBuildings[i + 1];
    }

    placedBuildings.pop();

    for (i = 0; i < buttonsBuildExtra.length; i++) buttonsBuildExtra[i].visible = false;
    costUpgradeText.visible = false;

    nearBuilding = null;
}

let waveSet = 0;

function NewWave() {
    if (!spawning && enemyArr.length == 0 && enemies == 0) {
        wave++;
        spawning = true;
        if (wave == 156) { wave = 0; waveSet += 1; }
        enemies = (waveSet * 155) + Math.round(Math.tan(wave / 100) * 100);
    }
}

function PlaceBuilding() {
    let col = false;

    if (Player.x - (Player.width / 2) + blockSize < (castle.x + castle.width / 2)) col = true;
    
    for (i = 0; i < placedBuildings.length && !col; i++){
        if ((Player.x - (Player.width / 2) + blockSize) < (placedBuildings[i][0].x - (placedBuildings[i][0].width / 2) + blockSize / 2) + blockSize &&
            (Player.x - (Player.width / 2) + blockSize) + blockSize > (placedBuildings[i][0].x - (placedBuildings[i][0].width / 2) - blockSize / 2)) {
            col = true;
        }
    }
    
    if (!col) {
        switch (selectedBuilding){
            case (buildings[0]):
                if (coins >= 75) {
                    coins -= 75;
                    let bow = app.stage.addChildAt(PlaceSprite(bowTexture[1], Player.x - Player.width / 2 + blockSize, Player.y - blockSize / 2, blockSize, blockSize, -1, 0), buildHere);
                    placedBuildings.push([bow, 100, 1, 1, 1]);
                }
                break;
            case (buildings[1]):
                if (coins >= 50) {
                    coins -= 50;
                    let sword = app.stage.addChildAt(PlaceSprite(swordTexture[1], Player.x - Player.width / 2 + blockSize, Player.y - blockSize / 2, blockSize, blockSize, -1, 0), buildHere);
                    placedBuildings.push([sword, 250, 2, 1, 1]);
                }
                break;
            case (buildings[2]):
                if (coins >= 75) {
                    coins -= 75;
                    let shield = app.stage.addChildAt(PlaceSprite(shieldTexture[1], Player.x - Player.width / 2 + blockSize, Player.y - blockSize / 2 - blockSize, blockSize, blockSize * 2, -1, 0), buildHere);
                    placedBuildings.push([shield, 500, 3]);
                }
                break;
            case (buildings[3]):
                if (coins >= 25) {
                    coins -= 25;
                    let coin = app.stage.addChildAt(PlaceSprite(mineTexture[1], Player.x - Player.width / 2 + blockSize, Player.y - blockSize / 2, blockSize, blockSize, -1, 0), buildHere);
                    placedBuildings.push([coin, 50, 4, 1, 1]);
                }
                break;
            default:
                console.log("Something went wrong!");
                break;
        }
    }
}
