namespace SpriteKind {
    export const enemyProjectile = SpriteKind.create()
    export const PlayerProjectiole = SpriteKind.create()
    export const PlayerProjectile = SpriteKind.create()
    export const ExplodingProjectile = SpriteKind.create()
    export const HiddenSprite = SpriteKind.create()
    export const lifebar = SpriteKind.create()
    export const HorribleThing = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (energyStatusbar.value > 0) {
        projectile2 = sprites.createProjectileFromSprite(img`
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            . 5 4 5 5 4 5 . 
            5 4 5 4 4 5 4 5 
            5 4 5 4 4 5 4 5 
            . 5 4 5 5 4 5 . 
            . . 5 4 4 5 . . 
            . . . 5 5 . . . 
            `, ThePlayer, 0, -100)
        projectile2.setKind(SpriteKind.PlayerProjectile)
        energyStatusbar.value += -10
    }
})
sprites.onOverlap(SpriteKind.HorribleThing, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    if (Math.percentChance(50)) {
        otherSprite.x += -20
    } else if (Math.percentChance(50)) {
        otherSprite.x += 20
    }
})
function startGame (Countdown: number, Lives: number) {
    tiles.setTilemap(tiles.createTilemap(hex`0a0008000100000000000000000101000000000000000001010000000000000000010100000000000000000101000000000000000001010000000000000000010100000000000000000101000000000000000001`, img`
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        . . . . . . . . . . 
        `, [myTiles.transparency16,myTiles.tile8], TileScale.Sixteen))
    Skelly = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . . f b 1 1 1 1 1 1 b f . . . 
        . . . f 1 1 1 1 1 1 1 1 f . . . 
        . . f d 1 1 1 1 1 1 1 1 d f . . 
        . . f d 1 1 1 1 1 1 1 1 d f . . 
        . . f d d d 1 1 1 1 d d d f . . 
        . . f b d b f d d f b d b f . . 
        . . f c d c f 1 1 f c d c f . . 
        . . . f b 1 1 1 1 1 1 b f . . . 
        . . f f f c d b 1 b d f f f f . 
        f c 1 1 1 c b f b f c 1 1 1 c f 
        f 1 b 1 b 1 f f f f 1 b 1 b 1 f 
        f b f b f f f f f f b f b f b f 
        . . . . . f f f f f f . . . . . 
        . . . . . . . f f f . . . . . . 
        `, SpriteKind.Enemy)
    ThePlayer = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    projectileImage = img`
        . . . . . . . . 
        . . . 6 6 . . . 
        . . 9 6 6 9 . . 
        . 6 6 8 8 6 6 . 
        . 6 6 8 8 6 6 . 
        . . 9 6 6 9 . . 
        . . . 6 6 . . . 
        . . . . . . . . 
        `
    statusbar = statusbars.create(75, 10, StatusBarKind.EnemyHealth)
    energyStatusbar = statusbars.create(50, 4, StatusBarKind.Energy)
    timesHit = 0
    MAX = 10
    LiveLoseCounter = 0
    isMovingLeft = false
    offset = 36
    _10 = -10
    statusbar.setLabel("Boss HP")
    energyStatusbar.setLabel("Energy", 1)
    statusbar.setBarBorder(3, 13)
    statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    energyStatusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    energyStatusbar.max = 100
    energyStatusbar.value = 100
    statusbar.setPosition(75, 16)
    energyStatusbar.setPosition(44, 110)
    controller.moveSprite(ThePlayer, 100, 100)
    tiles.placeOnTile(Skelly, tiles.getTileLocation(0, 0))
    tiles.placeOnTile(ThePlayer, tiles.getTileLocation(5, 6))
    ThePlayer.setFlag(SpriteFlag.StayInScreen, true)
    flyToCenter()
    info.setLife(Lives)
    info.startCountdown(Countdown)
}
info.onCountdownEnd(function () {
    game.splash("" + (75 - timesHit) + " " + "Enemy Health Left")
    game.over(true, effects.confetti)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    game.splash("" + (75 - timesHit) + " " + "Enemy Health Left")
    game.over(true, effects.confetti)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ExplodingProjectile, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    for (let index = 0; index < 8; index++) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . 
            . . . 4 4 . . . 
            . . 5 4 4 5 . . 
            . 4 4 2 2 4 4 . 
            . 4 4 2 2 4 4 . 
            . . 5 4 4 5 . . 
            . . . 4 4 . . . 
            . . . . . . . . 
            `, ThePlayer, 0, -100)
        projectile.setKind(SpriteKind.PlayerProjectile)
    }
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeLifeBy(-1)
})
function flyToCenter () {
    Skelly.setVelocity(75, 30)
    pause(1000)
    Skelly.setVelocity(0, 0)
}
sprites.onOverlap(SpriteKind.PlayerProjectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 500)
    statusbar.value += -1
    timesHit += 1
})
function _10shoot (Boss: Sprite, ProjectileImage: Image) {
    for (let index = 0; index <= MAX - 1; index++) {
        _60_sine = 60 * Math.sin((360 / 10 * index + offset) / 57.3)
        _60_cosine = 60 * Math.cos((360 / 10 * index + offset) / 57.3)
        _100_cosine = 100 * Math.sin((360 / 10 * index + offset) / 57.3)
        _100_sine = 100 * Math.cos((360 / 10 * index + offset) / 57.3)
        projectileSprite = sprites.createProjectileFromSprite(ProjectileImage, Boss, _60_sine, _60_cosine)
        projectileSprite = sprites.createProjectileFromSprite(ProjectileImage, Boss, _100_sine, _100_cosine)
    }
}
info.onLifeZero(function () {
    game.splash("" + (75 - timesHit) + " " + "Enemy Health Left")
    game.over(false)
})
sprites.onOverlap(SpriteKind.PlayerProjectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 500)
    otherSprite.destroy(effects.spray, 500)
})
function enemyShoot (projectileImage: Image, Boss: Sprite) {
    if (Math.percentChance(50)) {
        _10shoot(Boss, projectileImage)
        animation.runImageAnimation(
        Boss,
        [img`
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f f f f . . . . . . . . . . 
            . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
            . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f d d d 1 1 1 1 d d d f . . . . . . 
            . . . . . . f b d b f d d f b d b f . . . . . . 
            . . . . . . f c d c f 1 1 f c d c f . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
            . . . . . . f f f c d b 1 b d f f f f . . . . . 
            . . . . f c 1 1 1 c b f b f c 1 1 1 c f . . . . 
            . . . . f 1 b 1 b 1 f f f f 1 b 1 b 1 f . . . . 
            . . . . f b f b f f f f f f b f b f b f . . . . 
            . . . . . . . . . f f f f f f . . . . . . . . . 
            . . . . . . . . . . . f f f . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f f f f . . . . . . . . . . 
            . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
            . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f d d d 1 1 1 1 d d d f . . . . . . 
            . . . . . . f b d b f d d f b d b f . . . . . . 
            . . . . . . f c d c f 1 1 f c d c f . . . . . . 
            . . . . . f f f f 1 1 1 1 1 1 b f . . . . . . . 
            . . . . f c 1 1 1 c d b 1 b d f f f . . . . . . 
            . . . . f 1 b 1 b c b f b f c 1 1 1 c f . . . . 
            . . . . f b f b f b f f f f 1 b 1 b 1 f . . . . 
            . . . . . . . . . f f f f f f f b f b f . . . . 
            . . . . . . . . . . f f f f f . . . . . . . . . 
            . . . . . . . . . . . f f f . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f f f f . . . . . . . . . . 
            . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
            . . . . . f f f c 1 1 1 1 1 1 1 f . . . . . . . 
            . . . f c 1 1 1 c d 1 1 1 1 1 1 1 f . . . . . . 
            . . . f 1 b 1 b 1 b 1 1 1 1 d d d f . . . . . . 
            . . . f b f b f f c f 1 1 f c d d f . . . . . . 
            . . . . . . f c f 1 1 1 1 1 1 b b f . . . . . . 
            . . . . . . . c c b d b 1 b 1 f c f . . . . . . 
            . . . . . . . f f f b f b f d f f . . . . . . . 
            . . . . . . . . f f f f f f f f . . . . . . . . 
            . . . . . . . . f f f f f f f f f f f . . . . . 
            . . . . . . . . . f f f f f c 1 1 1 c f . . . . 
            . . . . . . . . . f f f f f 1 b 1 b 1 f . . . . 
            . . . . . . . . . . f f f f b f b f b f . . . . 
            . . . . . . . . . . . f f f f . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f f f f . . . . . . . . . . 
            . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
            . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . 7 . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . 7 . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . 7 . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . 7 . . f d d d 1 1 1 1 d d d f f . . . . . 
            . . . 7 7 . f b d b f d d f b d b f c f . . . . 
            . . . 7 7 7 f c d c f 1 1 f c d c f b f . . . . 
            . . . . 7 7 f f f b d b 1 b d f f c f . . . . . 
            . . . . f c b 1 b c f f f f f f . . . . . . . . 
            . . . . f 1 c 1 c 1 f f f f f f . . . . . . . . 
            . . . . f d f d f d f f f f f . . . . . . . . . 
            . . . . . f . f . f . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f f f f . . . . . . . . . . 
            . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
            . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 1 f . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f c d d 1 1 1 1 d d c f f . . . . . 
            . . . . . . . f b c f 1 1 f c b f b b f . . . . 
            . . . . . . . f f b d b 1 b d f f f f . . . . . 
            . . . . . . . . f c b f b f d f . . . . . . . . 
            . . . . . . . . f f f f f f f f . . . . . . . . 
            . . . . . . f f f f f f f f f f . . . . . . . . 
            . . . . . f c b 1 b c f f f f . . . . . . . . . 
            . . . . . . f f b f f . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f f f f . . . . . . . . . . 
            . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
            . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f d d 1 1 1 1 1 1 d d f . . . . . . 
            . . . . . . f b d d 1 1 1 1 d d d f . . . . . . 
            . . . . . . f c d b f d d f b d b f . . . . . . 
            . . . . . . . f b c f 1 1 f c b f f f . . . . . 
            . . . . . . . f f b 1 1 1 1 b c f b c f . . . . 
            . . . . . . . . f c d b 1 b d f b b b f . . . . 
            . . . . . . . f f f f f f f f f f c f . . . . . 
            . . . . . f c b 1 b c f f f f f . . . . . . . . 
            . . . . . f 1 b 1 b 1 f f f f . . . . . . . . . 
            . . . . . . f f b f f . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f f f f . . . . . . . . . . 
            . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
            . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f d d d 1 1 1 1 d d d f . . . . . . 
            . . . . . . f b d b f d d f b d b f . . . . . . 
            . . . . . . f c d c f 1 1 f c d c f . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 f f f f . . . . . 
            . . . . . . f f f c d b 1 b c 1 1 1 c f . . . . 
            . . . . f c 1 1 1 c b f b f 1 b 1 b 1 f . . . . 
            . . . . f 1 b 1 b 1 f f f f b f b f b f . . . . 
            . . . . f b f b f f f f f f f . . . . . . . . . 
            . . . . . . . . . f f f f f . . . . . . . . . . 
            . . . . . . . . . . f f f . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f f f f . . . . . . . . . . 
            . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
            . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
            . . . . . . f d d d 1 1 1 1 d d d f . . . . . . 
            . . . . . . f b d b f d d f b d b f . . . . . . 
            . . . . . . f c d c f 1 1 f c d c f . . . . . . 
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
            . . . . . . f f f c d b 1 b d f f f f . . . . . 
            . . . . f c 1 1 1 c b f b f c 1 1 1 c f . . . . 
            . . . . f 1 b 1 b 1 f f f f 1 b 1 b 1 f . . . . 
            . . . . f b f b f f f f f f b f b f b f . . . . 
            . . . . . . . . . f f f f f f . . . . . . . . . 
            . . . . . . . . . . . f f f . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . . . . . . . 
            `],
        75,
        false
        )
    } else if (Math.percentChance(50)) {
        if (LiveLoseCounter == 0) {
            HorribleThingTrue = true
        } else {
            _10shoot(Boss, projectileImage)
            animation.runImageAnimation(
            Boss,
            [img`
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . f f f f . . . . . . . . . . 
                . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
                . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f d d d 1 1 1 1 d d d f . . . . . . 
                . . . . . . f b d b f d d f b d b f . . . . . . 
                . . . . . . f c d c f 1 1 f c d c f . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
                . . . . . . f f f c d b 1 b d f f f f . . . . . 
                . . . . f c 1 1 1 c b f b f c 1 1 1 c f . . . . 
                . . . . f 1 b 1 b 1 f f f f 1 b 1 b 1 f . . . . 
                . . . . f b f b f f f f f f b f b f b f . . . . 
                . . . . . . . . . f f f f f f . . . . . . . . . 
                . . . . . . . . . . . f f f . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . f f f f . . . . . . . . . . 
                . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
                . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f d d d 1 1 1 1 d d d f . . . . . . 
                . . . . . . f b d b f d d f b d b f . . . . . . 
                . . . . . . f c d c f 1 1 f c d c f . . . . . . 
                . . . . . f f f f 1 1 1 1 1 1 b f . . . . . . . 
                . . . . f c 1 1 1 c d b 1 b d f f f . . . . . . 
                . . . . f 1 b 1 b c b f b f c 1 1 1 c f . . . . 
                . . . . f b f b f b f f f f 1 b 1 b 1 f . . . . 
                . . . . . . . . . f f f f f f f b f b f . . . . 
                . . . . . . . . . . f f f f f . . . . . . . . . 
                . . . . . . . . . . . f f f . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . f f f f . . . . . . . . . . 
                . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
                . . . . . f f f c 1 1 1 1 1 1 1 f . . . . . . . 
                . . . f c 1 1 1 c d 1 1 1 1 1 1 1 f . . . . . . 
                . . . f 1 b 1 b 1 b 1 1 1 1 d d d f . . . . . . 
                . . . f b f b f f c f 1 1 f c d d f . . . . . . 
                . . . . . . f c f 1 1 1 1 1 1 b b f . . . . . . 
                . . . . . . . c c b d b 1 b 1 f c f . . . . . . 
                . . . . . . . f f f b f b f d f f . . . . . . . 
                . . . . . . . . f f f f f f f f . . . . . . . . 
                . . . . . . . . f f f f f f f f f f f . . . . . 
                . . . . . . . . . f f f f f c 1 1 1 c f . . . . 
                . . . . . . . . . f f f f f 1 b 1 b 1 f . . . . 
                . . . . . . . . . . f f f f b f b f b f . . . . 
                . . . . . . . . . . . f f f f . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . f f f f . . . . . . . . . . 
                . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
                . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . 7 . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . 7 . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . 7 . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . 7 . . f d d d 1 1 1 1 d d d f f . . . . . 
                . . . 7 7 . f b d b f d d f b d b f c f . . . . 
                . . . 7 7 7 f c d c f 1 1 f c d c f b f . . . . 
                . . . . 7 7 f f f b d b 1 b d f f c f . . . . . 
                . . . . f c b 1 b c f f f f f f . . . . . . . . 
                . . . . f 1 c 1 c 1 f f f f f f . . . . . . . . 
                . . . . f d f d f d f f f f f . . . . . . . . . 
                . . . . . f . f . f . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . f f f f . . . . . . . . . . 
                . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
                . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 1 f . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f c d d 1 1 1 1 d d c f f . . . . . 
                . . . . . . . f b c f 1 1 f c b f b b f . . . . 
                . . . . . . . f f b d b 1 b d f f f f . . . . . 
                . . . . . . . . f c b f b f d f . . . . . . . . 
                . . . . . . . . f f f f f f f f . . . . . . . . 
                . . . . . . f f f f f f f f f f . . . . . . . . 
                . . . . . f c b 1 b c f f f f . . . . . . . . . 
                . . . . . . f f b f f . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . f f f f . . . . . . . . . . 
                . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
                . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f d d 1 1 1 1 1 1 d d f . . . . . . 
                . . . . . . f b d d 1 1 1 1 d d d f . . . . . . 
                . . . . . . f c d b f d d f b d b f . . . . . . 
                . . . . . . . f b c f 1 1 f c b f f f . . . . . 
                . . . . . . . f f b 1 1 1 1 b c f b c f . . . . 
                . . . . . . . . f c d b 1 b d f b b b f . . . . 
                . . . . . . . f f f f f f f f f f c f . . . . . 
                . . . . . f c b 1 b c f f f f f . . . . . . . . 
                . . . . . f 1 b 1 b 1 f f f f . . . . . . . . . 
                . . . . . . f f b f f . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . f f f f . . . . . . . . . . 
                . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
                . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f d d d 1 1 1 1 d d d f . . . . . . 
                . . . . . . f b d b f d d f b d b f . . . . . . 
                . . . . . . f c d c f 1 1 f c d c f . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 f f f f . . . . . 
                . . . . . . f f f c d b 1 b c 1 1 1 c f . . . . 
                . . . . f c 1 1 1 c b f b f 1 b 1 b 1 f . . . . 
                . . . . f 1 b 1 b 1 f f f f b f b f b f . . . . 
                . . . . f b f b f f f f f f f . . . . . . . . . 
                . . . . . . . . . f f f f f . . . . . . . . . . 
                . . . . . . . . . . f f f . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . f f f f . . . . . . . . . . 
                . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
                . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . . 
                . . . . . . f d d d 1 1 1 1 d d d f . . . . . . 
                . . . . . . f b d b f d d f b d b f . . . . . . 
                . . . . . . f c d c f 1 1 f c d c f . . . . . . 
                . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
                . . . . . . f f f c d b 1 b d f f f f . . . . . 
                . . . . f c 1 1 1 c b f b f c 1 1 1 c f . . . . 
                . . . . f 1 b 1 b 1 f f f f 1 b 1 b 1 f . . . . 
                . . . . f b f b f f f f f f b f b f b f . . . . 
                . . . . . . . . . f f f f f f . . . . . . . . . 
                . . . . . . . . . . . f f f . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . . . . . . . . . 
                `],
            75,
            false
            )
        }
    }
}
let HorribleThingTrue = false
let projectileSprite: Sprite = null
let _100_sine = 0
let _100_cosine = 0
let _60_cosine = 0
let _60_sine = 0
let projectile: Sprite = null
let _10 = 0
let offset = 0
let isMovingLeft = false
let LiveLoseCounter = 0
let MAX = 0
let timesHit = 0
let statusbar: StatusBarSprite = null
let projectileImage: Image = null
let Skelly: Sprite = null
let ThePlayer: Sprite = null
let projectile2: Sprite = null
let energyStatusbar: StatusBarSprite = null
startGame(60, 20)
game.onUpdateInterval(2000, function () {
    enemyShoot(img`
        . . . . . . . . 
        . . . 6 6 . . . 
        . . 9 6 6 9 . . 
        . 6 6 8 8 6 6 . 
        . 6 6 8 8 6 6 . 
        . . 9 6 6 9 . . 
        . . . 6 6 . . . 
        . . . . . . . . 
        `, Skelly)
})
game.onUpdateInterval(1500, function () {
    energyStatusbar.value += Math.abs(_10)
})
forever(function () {
    if (isMovingLeft) {
        Skelly.setVelocity(-50, 0)
    }
    if (!(isMovingLeft)) {
        Skelly.setVelocity(50, 0)
    }
    if (Skelly.tileKindAt(TileDirection.Right, myTiles.tile2)) {
        isMovingLeft = true
    }
    if (Skelly.tileKindAt(TileDirection.Left, myTiles.tile2)) {
        isMovingLeft = false
    }
})
forever(function () {
    if (HorribleThingTrue) {
        for (let index = 0; index < 50; index++) {
            projectile2 = sprites.createProjectileFromSprite(img`
                . . 1 1 1 1 . . 
                . 1 1 1 1 1 1 . 
                . 1 1 1 1 1 1 . 
                . 1 1 1 1 1 1 . 
                . 1 1 1 1 1 1 . 
                . 1 1 1 1 1 1 . 
                . 1 1 1 1 1 1 . 
                . . 1 1 1 1 . . 
                `, Skelly, Skelly.vy, 100)
            projectile2.setKind(SpriteKind.HorribleThing)
            pause(40)
        }
        HorribleThingTrue = false
    }
})
game.onUpdateInterval(10000, function () {
    LiveLoseCounter = 0
})
