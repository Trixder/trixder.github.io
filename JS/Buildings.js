function UpdateBuildings() {
    Destroy();
    Bow();
    Mine();
    Select();
}

function Bow() {
    for (i = 0; i < placedBuildings.length; i++){
        if (placedBuildings[i][2] == 1) {
            for (j = 0; j < enemyArr.length; j++){
                if (enemyArr[j][0].x - placedBuildings[i][0].x < bowRange * placedBuildings[i][4]) enemyArr[j][2] -= time / 5; break;
            }
        }
    }
}

function Mine() {
    if (enemies != 0 || enemyArr.length != 0){
        for (i = 0; i < placedBuildings.length; i++) {
            if (placedBuildings[i][2] == 4) coins += (time / 8) * placedBuildings[i][4];
        }
    }
}

function Destroy() {
    let from = null;
    for (i = 0; i < placedBuildings.length; i++) {
        if (placedBuildings[i][1] <= 0) {
            placedBuildings[i][0].destroy();
            from = i;
        }
    }

    if (from != null) {
        for (i = from; i < placedBuildings.length - 1; i++){
            placedBuildings[i] = placedBuildings[i + 1];
        }

        placedBuildings.pop();
    }
}

let nearBuilding;

function Select() {
    for (i = 0; i < placedBuildings.length; i++){
        if ((Player.x - (Player.width / 2)) < (placedBuildings[i][0].x) &&
        (Player.x + (Player.width / 2)) > (placedBuildings[i][0].x)) {
            nearBuilding = i;
            i = placedBuildings.length;
        } else nearBuilding = null;
    }

    if (nearBuilding != null) {
        if (buttonsBuild[0].visible == true) {
            for (i = 0; i < buttonsBuildExtra.length; i++) buttonsBuildExtra[i].visible = true;
            costUpgradeText.visible = true;
            switch (placedBuildings[nearBuilding][2]) {
                case 1:
                    if (placedBuildings[nearBuilding][3] != 5) costUpgradeText.text = 175 * placedBuildings[nearBuilding][3];
                    else {
                        buttonsBuildExtra[0].visible = false;
                        costUpgradeText.visible = false;
                    }
                    break;
                case 2:
                    if (placedBuildings[nearBuilding][3] != 5) costUpgradeText.text = 100 * placedBuildings[nearBuilding][3];
                    else {
                        buttonsBuildExtra[0].visible = false;
                        costUpgradeText.visible = false;
                    }
                    break;
                case 3:
                    if (placedBuildings[nearBuilding][1] <= 400) costUpgradeText.text = 150;
                    else {
                        buttonsBuildExtra[0].visible = false;
                        costUpgradeText.visible = false;
                    }
                    break;
                case 4:
                    if (placedBuildings[nearBuilding][3] != 5) costUpgradeText.text = 125 * placedBuildings[nearBuilding][3];
                    else {
                        buttonsBuildExtra[0].visible = false;
                        costUpgradeText.visible = false;
                    }
                    break;
                default:
                    break;
            }
        } else {
            for (i = 0; i < buttonsBuildExtra.length; i++) buttonsBuildExtra[i].visible = false;
            costUpgradeText.visible = false;
        }
    } else {
        for (i = 0; i < buttonsBuildExtra.length; i++) buttonsBuildExtra[i].visible = false;
        costUpgradeText.visible = false;
    }
}