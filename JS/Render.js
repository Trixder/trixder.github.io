            /*<---Generates sprites for enviroment--->*/
function MapGen() {
    //Money
    moneyText = new PIXI.Text(coins, new PIXI.TextStyle({ fontSize: blockSize / 3,
                                                          fill: ['#ffffff'], }));
    costText = new PIXI.Text(50, new PIXI.TextStyle({ fontSize: blockSize / 3 }));
    costUpgradeText = new PIXI.Text(25, new PIXI.TextStyle({ fontSize: blockSize / 3 }));
    
    moneyText.x = blockSize / 2;
    moneyText.y = app.screen.height - blockSize * 2 - 2.5;
    
    costText.x = app.screen.width / 2 - blockSize / 6;
    costText.y = blockSize * 2 - blockSize / 2;

    costUpgradeText.x = app.screen.width / 2 + blockSize + blockSize / 4;
    costUpgradeText.y = blockSize * 2 - blockSize / 2;

    CreateButtons();

    costText.visible = false;
    costUpgradeText.visible = false;
    for (i = 0; i < buttonsBuild.length; i++) buttonsBuild[i].visible = false;
    for (i = 0; i < buttonsBuildExtra.length; i++) buttonsBuildExtra[i].visible = false;

    //Biggest value of position X
    farrestRight = mapLen * blockSize;

    //Creates repetitive sprites
    for (i = -blockSize / 10; i < farrestRight / blockSize + 2; i++) {
        midX = i * blockSize;
        PlaceSprite("./IMG/Sky_2.png", midX, midY - blockSize * 2, blockSize, blockSize, 0, backLayer);
        PlaceSprite("./IMG/Sky_1.png", midX, midY - blockSize, blockSize, blockSize, 0, backLayer);
        PlaceSprite("./IMG/Sky_0.png", midX, midY, blockSize, blockSize, 0, backLayer);
        PlaceSprite("./IMG/Grass.png", midX, midY + blockSize, blockSize, blockSize, 0, midLayer);
        PlaceSprite("./IMG/Ground.png", midX, midY + blockSize * 2, blockSize, blockSize, 0, midLayer);
    }

    Trees();

    Rocks();

    for (i = 0; i < textures.length; i++){
        let building = PlaceSprite(textures[i][0], Player.x - Player.width / 2 + blockSize, Player.y - blockSize / 2, blockSize, blockSize, -1, 0);
        buildings.push(building);
        selectedBuilding = building;
        building.visible = false;
        building.alpha = 0.5;
    }
    
    AddToStage();

    HPBar();
}

function CreateButtons(){
    CreateButton("./IMG/PauseButton.png", screenWidth - blockSize * 1.75 - blockSize - 4, app.screen.height - blockSize - blockSize / 4, blockSize, blockSize, -1, buttons, Stop);
    CreateButton("./IMG/FogButton.png", screenWidth - blockSize - blockSize / 4, app.screen.height - blockSize - blockSize / 4, blockSize, blockSize, -1, buttons, FilterOnOff);
    CreateButton("./IMG/BlueprintButton.png", screenWidth + blockSize / 4, app.screen.height - blockSize - blockSize / 4, blockSize, blockSize, -1, buttons, PlacePreview);
    CreateButton("./IMG/WaveButton.png", screenWidth + blockSize * 1.75, app.screen.height - blockSize - blockSize / 4, blockSize, blockSize, -1, buttons, NewWave);

    CreateButton(bowTexture[0], screenWidth - blockSize * 1.75 - blockSize - 4, blockSize / 4, blockSize, blockSize, -1, buttonsBuild, SelectBow);
    CreateButton(swordTexture[0], screenWidth - blockSize - blockSize / 4, blockSize / 4, blockSize, blockSize, -1, buttonsBuild, SelectSword);
    CreateButton(shieldTexture[0], screenWidth + blockSize / 4, blockSize / 4, blockSize, blockSize, -1, buttonsBuild, SelectShield);
    CreateButton(mineTexture[0], screenWidth + blockSize * 1.75, blockSize / 4, blockSize, blockSize, -1, buttonsBuild, SelectCoin);

    CreateButton("./IMG/UpgradeButton.png", Player.x - Player.width + blockSize * 2, blockSize * 2, blockSize, blockSize, -1, buttonsBuildExtra, Upgrade);
    CreateButton("./IMG/DeleteButton.png", Player.x - Player.width - blockSize, blockSize * 2, blockSize, blockSize, -1, buttonsBuildExtra, DestroyBuild);

    CreateButton("./IMG/BuildButton.png", Player.x - Player.width + blockSize / 2, blockSize * 2, blockSize, blockSize, -1, buttonsBuild, PlaceBuilding);
}

function Trees() {
    let maxTrees = treeArrBack.length / 2 - 1;
    let numOfTrees = Math.ceil(maxTrees / 2);

    //Generates where trees should be placed in Background
    for (i = 0; i < treeArrBack.length - 1 && numOfTrees != 0; i++) {
        if ((Math.random() * 100) < 10 && (treeArrBack[i] != 1 && treeArrBack[i] != 2) && treeArrBack[i + 1] != 1) {
            treeArrBack[i] = 1;
            treeArrBack[i + 1] = 2;
            numOfTrees -= 1;
        }
        if (i >= treeArrBack.length - 2) i = 0;
    }

    for (i = 0; i < treeArrFront.length; i++) {
        if (treeArrBack[i] == 1) {
            treeArrFront[i] = 3;
        }
    }

    //Sets new amount of max trees
    numOfTrees = Math.ceil(maxTrees / 2);

    for (i = 0; i < treeArrFront.length - 1 && numOfTrees != 0; i++) {
        if ((Math.random() * 100) < 10 && (treeArrFront[i] != 1 && treeArrFront[i] != 2 && treeArrFront[i] != 3) && treeArrFront[i + 1] != 1) {
            treeArrFront[i] = 1;
            treeArrFront[i + 1] = 2;
            numOfTrees -= 1;
        }

        if (i >= treeArrFront.length - 2) i = 0;
    }

    //Create tree sprites
    for (i = 0; i < treeArrBack.length; i++) {
        if (treeArrBack[i] == 1) {
            PlaceSprite("./IMG/Tree.png", blockSize * (i + blockSize / 5), midY - blockSize * 3, blockSize * 3, blockSize * 4, 0, treeBackLayer);
        }
    }

    for (i = 0; i < treeArrFront.length; i++) {
        if (treeArrFront[i] == 1) {
            PlaceSprite("./IMG/Tree.png", blockSize * (i + blockSize / 5), midY - blockSize * 3 + blockSize / 8 + ((Math.random() * 20) - 10), blockSize * 3, blockSize * 4, 0, treeFrontLayer);
        }
    }
}

function Rocks() {
    //Checks if there isn't too many rocks to be placed
    let maxRocks = rocksUnder.length / 2 - 1;
    let numOfRocks = Math.ceil(maxRocks * 1.5);

    for (i = 0; i < rocksUnder.length - 1 && numOfRocks != 0; i++) {
        if ((Math.random() * 100) < 10 && rocksUnder[i] != 1) {
            rocksUnder[i] = 1;
            numOfRocks -= 1;
        }
        if (i >= rocksUnder.length - 2) i = 0;
    }

    numOfRocks = Math.ceil(maxRocks / 0.75);

    for (i = 0; i < rocksOn.length - 1 && numOfRocks != 0; i++) {
        if ((Math.random() * 100) < 10 && rocksOn[i] != 1) {
            rocksOn[i] = 1;
            numOfRocks -= 1;
        }
        if (i >= rocksOn.length - 2) i = 0;
    }

    numOfRocks = Math.ceil(maxRocks * 0.75);

    for (i = 0; i < rocksBehindRocks.length - 1 && numOfRocks != 0; i++) {
        if ((Math.random() * 100) < 10 && rocksBehindRocks[i] != 1) {
            rocksBehindRocks[i] = 1;
            numOfRocks -= 1;
        }
        if (i >= rocksBehindRocks.length - 2) i = 0;
    }

    for (i = 0; i < rocksBehindRocks.length; i++) {
        if (rocksBehindRocks[i] == 1) {
            PlaceSprite("./IMG/Rock.png", blockSize * i, midY - blockSize + (Math.random() * blockSize), blockSize * 2, blockSize * 2, 0, rockRockLayer);
        }
    }

    for (i = 0; i < rocksOn.length; i++) {
        if (rocksOn[i] == 1) {
            PlaceSprite("./IMG/Rock.png", blockSize * i, midY - blockSize + (Math.random() * blockSize), blockSize * 2, blockSize * 2, 0, rockLayer);
        }
    }

    for (i = 0; i < rocksUnder.length; i++) {
        if (rocksUnder[i] == 1) {
            PlaceSprite("./IMG/Rock.png", blockSize * i, midY + (Math.random() * blockSize), blockSize * 2, blockSize * 2, 0, rockLayer);
        }
    }
}

            /*<---CustomSpritePlacement--->*/

    /*<-Directory->*/
        /*<--Position-->*/
        /*<--Size-->*/
        /*<--Specifications-->*//* 
            <-null-> <-Unknown Specifications->
            <-0-> <-Nothing->
            <-1-> <-Rotate by 90 deg->
            <-2-> <-Rotate by 180 deg->
            <-3-> <-Rotate by 270 deg->
            <-4-> <-Miror Horizontally->
            <-5-> <-Mirror Vertically->
            <-6-> <-Mirror Both->
        */
        /*<--ArrayForSprites-->*/

function PlaceSprite(dir, placeX, placeY, width, height, spec, saveToArr) {
    //Selects texture from Directory
    let Sprite = PIXI.Sprite.from(dir);

    //Sets size of the sprite
    Sprite.height = height;
    Sprite.width = width;
    
    //Sets sprite position
    Sprite.x = placeX;
    Sprite.y = placeY;

    //Saves sprite to selected array
    try {
        saveToArr.push(Sprite);
    } catch (err) {}    

    //Actions are described above
    if (spec != 0) {
        //Sets sprite anchor and offsets the posotion
        Sprite.anchor.set(0.5);
        Sprite.x += width / 2;
        Sprite.y += height / 2;

        switch (spec) {
            //Rotation
            case 1: case 2: case 3:
                Sprite.rotation = Math.PI/180 * 90 * spec;
                break;
            //Mirror
            case 4:
                Sprite.scale.x = -1;
                break;
             case 5:
                Sprite.scale.y = -1;
                break;
            case 6:
                Sprite.scale.x = -1;
                Sprite.scale.y = -1;
                break;
            //Default
            default:
                break;
        }
    }

    return Sprite;
}

function HPBar() {
    const sliderBackground = new PIXI.Graphics()
        .beginFill(0x272d37)
        .drawRect(0, 0, blockSize, blockSize / 16);

    sliderBackground.x = (app.screen.width - blockSize) / 2;
    sliderBackground.y = app.screen.height - blockSize / 0.525;

    sliderHp = new PIXI.Graphics()
        .beginFill(0x00ff00)
        .drawRect(0, 0, blockSize, blockSize / 16);

    sliderHp.x = 0;
    sliderHp.y = 0;

    app.stage.addChild(sliderBackground);
    sliderBackground.addChild(sliderHp);
}

function CreateButton(dir, placeX, placeY, width, height, spec, saveToArr, functionToCall) {
    let button = PlaceSprite(dir, placeX, placeY, width, height, spec, saveToArr)

    button.eventMode = 'static';
    button.cursor = 'pointer';
    button.on('pointerdown', functionToCall);
}

                /*<---Layers--->*/
//Places the actual sprites in the canvas
function AddToStage() {
            /*<--BackLayers-->*/
    for (i = 0; i < backLayer.length; i++) app.stage.addChild(backLayer[i]);
    for (i = 0; i < rockRockLayer.length; i++) app.stage.addChild(rockRockLayer[i]);
    for (i = 0; i < rockLayer.length; i++) app.stage.addChild(rockLayer[i]);

    for (i = 0; i < treeBackLayer.length; i++) app.stage.addChild(treeBackLayer[i]);

    castle = app.stage.addChild(PlaceSprite("./IMG/castle.png", screenWidth - blockSize * 7, midY - blockSize * 4, blockSize * 14, blockSize * 5, -1, 0));

            /*<--PlayerLayer-->*/
    for (i = 0; i < midLayer.length; i++) app.stage.addChild(midLayer[i]);
    for (i = 0; i < buildings.length; i++) app.stage.addChild(buildings[i]);
    buildHere = app.stage.getChildIndex(buildings[buildings.length - 1]);
    app.stage.addChild(Player);

            /*<--FrontLayers-->*/
    for (i = 0; i < treeFrontLayer.length; i++) app.stage.addChild(treeFrontLayer[i]);
    for (i = 0; i < frontLayer.length; i++) app.stage.addChild(frontLayer[i]);
    app.stage.addChild(moneyText);
}