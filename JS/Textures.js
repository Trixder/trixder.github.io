let bowTexture, swordTexture, shieldTexture, mineTexture;
let textures;

function Textures() {
    bowTexture = [PIXI.Texture.from('./IMG/bow.png'), PIXI.Texture.from('./IMG/balist_lvl1.png'), PIXI.Texture.from('./IMG/balist_lvl2.png'), PIXI.Texture.from('./IMG/balist_lvl3.png'), PIXI.Texture.from('./IMG/balist_lvl4.png'), PIXI.Texture.from('./IMG/balist_lvl5.png')];
    swordTexture = [PIXI.Texture.from('./IMG/sword.png'), PIXI.Texture.from('./IMG/spike_lvl1.png'), PIXI.Texture.from('./IMG/spike_lvl2.png'), PIXI.Texture.from('./IMG/spike_lvl3.png'), PIXI.Texture.from('./IMG/spike_lvl4.png'), PIXI.Texture.from('./IMG/spike_lvl5.png')];
    shieldTexture = [PIXI.Texture.from('./IMG/shield.png'), PIXI.Texture.from('./IMG/wall_lvl1.png')];
    mineTexture = [PIXI.Texture.from('./IMG/coin.png'), PIXI.Texture.from('./IMG/mine_lvl1.png'), PIXI.Texture.from('./IMG/mine_lvl2.png'), PIXI.Texture.from('./IMG/mine_lvl3.png'), PIXI.Texture.from('./IMG/mine_lvl4.png'), PIXI.Texture.from('./IMG/mine_lvl5.png')];

    textures = [bowTexture, swordTexture, shieldTexture, mineTexture];
}