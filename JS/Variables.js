        /*<---Variables--->*/
    /*<-Default->*/
//Screen size
let screenWidth;
let screenHeight;

//Renderer, ticker and root container
let app;

//Fbor intermediate calculations
let midX;
//Height of ground
let midY;

//Default size of sprite 115
let blockSize = 115;

//Map lenght
let mapLen = 60;

//Biggest value of position X
let farrestRight;

//Delta
let time;

    /*<-For Layers->*/
//from top to down = from back to front
let backLayer = new Array();
let rockRockLayer = new Array();
let rockLayer = new Array();
let treeBackLayer = new Array();
let midLayer = new Array(); // Layer on which player is
let treeFrontLayer = new Array();
let frontLayer = new Array();
let Filter;

    /*<-For buttons->*/
let buttons = new Array();
let buttonsBuild = new Array();
let buttonsBuildExtra = new Array();

    /*<-For buildings->*/
let buildingsDir = ["bow.png", "sword.png", "shield.png", "coin.png"];
let buildings = new Array();
let placedBuildings = new Array();

let selectedBuilding;
let buildHere;

let bowRange = blockSize * 6;
let castle;

let costText;
let cost;

    /*<-For Generation->*/
let treeArrBack = new Array(mapLen - 1);
let treeArrFront = new Array(mapLen - 1);

let rocksBehindRocks = new Array(mapLen - 1);
let rocksOn = new Array(mapLen - 1);
let rocksUnder = new Array(mapLen - 1);

    /*<-For enemy->*/
let enemyArr = new Array();

let spawning = false;

let enemies = 0;

let wave = 0;

    /*<-For player->*/
//Player sprite
let Player;
    
//Position on which the player would be if he was the object that is moving 
let fakePlayerPos;

let moneyText;
let coins = 175;

let sliderHp;
let playerHP = 1;