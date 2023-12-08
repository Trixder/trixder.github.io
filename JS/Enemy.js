let enemyHp = 100;

function spawnEnemy() {
    let enemy = PlaceSprite("./IMG/Enemy_" + Math.round(Math.random() * 1) + ".png", farrestRight, Player.y - blockSize / 2, blockSize, blockSize, 0, 0);
    let enemySliderHp = new PIXI.Graphics()
        .beginFill(0xff0000)
        .drawRect(0, 0, blockSize, blockSize / 16);

    enemySliderHp.transform.scale.x /= enemy.transform.scale.x;
    enemySliderHp.transform.scale.y /= enemy.transform.scale.y;

    enemySliderHp.x = 0;
    enemySliderHp.y = -2;
    
    enemyArr.push([enemy, false, enemyHp, enemySliderHp]);

    app.stage.addChildAt(enemy, app.stage.getChildIndex(Player));
    enemy.addChild(enemySliderHp);
}

function Enemy() {
    UpdateEnemyHp();
    EnemyCheckCol();
    Attacking();
    EnemyMove();
    Death();
}

function UpdateEnemyHp() {
    //100% == 0.1391304347826087
    for (i = 0; i < enemyArr.length; i++) enemyArr[i][3].scale.x = 0.1391304347826087 / (100 / enemyArr[i][2]);
}

function EnemyMove() {
    for (i = 0; i < enemyArr.length; i++) if (!enemyArr[i][1]) enemyArr[i][0].x -= time * 20;
}


//[[enemy, building]]
let attacking;

function EnemyCheckCol() {
    attacking = new Array();
    let attackExtend = 0;
    for (i = 0; i < enemyArr.length; i++){
        if (buttonsBuildExtra[1].visible) attackExtend = blockSize;
            
        if (Player.x >= enemyArr[i][0].x - attackExtend) {
            playerHP -= 0.01;
            enemyArr[i][1] = true;
            continue;
        }

        enemyArr[i][1] = false;

        for (j = 0; j < placedBuildings.length && !enemyArr[i][1]; j++){
            if (placedBuildings[j][0].x + (placedBuildings[j][0].width / 2) >= enemyArr[i][0].x) {
                attacking.push([i, j]);
                enemyArr[i][1] = true;
            }
        }
    }
}

function Attacking() {
    for(i = 0; i < attacking.length; i++) {
        if (placedBuildings[attacking[i][1]][2] == 2) enemyArr[attacking[i][0]][2] -= time / 10 * placedBuildings[attacking[i][1]][4];
        placedBuildings[attacking[i][1]][1] -= time / 10;
    }
}

function Death() {
    let from = null;
    for (i = 0; i < enemyArr.length; i++) {
        if (enemyArr[i][2] <= 0) {
            enemyArr[i][0].destroy();
            from = i;
        }
    }
    
    if (from != null) {
        for (i = from; i < enemyArr.length - 1; i++){
            enemyArr[i] = enemyArr[i + 1];
        }
        
        enemyArr.pop();
    }
}