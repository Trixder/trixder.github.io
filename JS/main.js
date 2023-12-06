            /*<---init--->*/
window.onload = function() {
    //Makes sure the pixel art stays pixelated
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    //Creates application
    app = new PIXI.Application({ background: '#232d3f', resizeTo: window });
    document.body.appendChild(app.view);

    Textures();

    while (app.screen.width < 8 * blockSize) blockSize -= 10;
    while (app.screen.height < 6 * blockSize) blockSize -= 10;

    Filter = PIXI.Sprite.from('./IMG/Filter.png');
    Filter.height = app.screen.height;
    Filter.width = app.screen.width;
    Filter.x = 0;
    Filter.y = 0;

    //Gets the directory of player texture
    Player = PIXI.Sprite.from('./IMG/Player.png');

    //Sets anchor of player and his size
    Player.anchor.set(0.5);
    Player.height = blockSize;
    Player.width = blockSize;
    
    //Gets the size of half of screen X and Y
    screenWidth = app.screen.width/2;
    screenHeight = app.screen.height/2;

    //Sets the position of player
    Player.x = screenWidth;
    Player.y = app.screen.height + blockSize / 2 - blockSize * 3 + blockSize / 32;
    fakePlayerPos = Player.x;

    midY = app.screen.height - blockSize * 3;

    //Generates sprites for enviroment
    MapGen();

    app.stage.addChild(Filter);

    for (i = 0; i < buttons.length; i++) app.stage.addChild(buttons[i]);
    for (i = 0; i < buttonsBuild.length; i++) app.stage.addChild(buttonsBuild[i]);
    app.stage.addChild(costText);
    app.stage.addChild(costUpgradeText);
    for (i = 0; i < buttonsBuildExtra.length; i++) app.stage.addChild(buttonsBuildExtra[i]);

    //Detects key press
    KeyDetectionStart();

    let enemySpawn = 120 + (Math.floor(Math.random() * 30) - 15);

    //Update
    app.ticker.add((delta) => {
        time = delta;

        if (coins <= 0 && PlaceBuilding.length == 0) coins = 175;

        PlayerMovement(delta);

        UpdateBuildings();
        
        if (enemies <= 0) spawning = false;

        if (spawning && enemySpawn <= 0){
            spawnEnemy();
            enemies--;
            enemySpawn = 120 + (Math.floor(Math.random() * 30) - 15);
        } else if (spawning) enemySpawn -= delta;

        Enemy(delta);

        UpdateUI();

        if (playerHP <= 0){
            app.ticker.stop();
            location.reload();
        }
    });
}

function UpdateUI(){
    moneyText.text = Math.round(coins);

    if (coins < cost) costText.style.fill = "0xff0000";
    else costText.style.fill = "0x000000";

    if (coins < costUpgradeText.text) costUpgradeText.style.fill = "0xff0000";
    else costUpgradeText.style.fill = "0x000000";

    sliderHp.scale.x = playerHP;
}
