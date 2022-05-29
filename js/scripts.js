// import cloud from '../assets/img/cloud.png'
// console.log(cloud)


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const floorImage = "./assets/images/floor1.png"
const backGroundImage = "./assets/images/background.png"
const cloudImage = "./assets/images/panel_think_02.png"

const standLeftImage = "./assets/images/rest-left.png"
const standRightImage = "./assets/images/rest-right.png"
const runLeftImage = "./assets/images/run-left.png"
const runRightImage = "./assets/images/run-right.png"

const snowBall = "./assets/images/snowball.png"
const endGameImage = "./assets/images/end-game.png"



canvas.width = 1024
canvas.height = 576

const gravit = 0.5

class Player {
    constructor(){
        this.position = {
            x: 100,
            y:100
        }
        this.width = 80
        this.height = 130

        this.move = {
            x:0,
            y:0
        }

        this.img = makeImg(standRightImage)
        this.frames = 0
        this.framesY = 0
        this.sprites = {
            stand:{
                right: makeImg(standRightImage),
                left: makeImg(standLeftImage),
            },
            run: {
                right: makeImg(runRightImage),
                left: makeImg(runLeftImage),
            }
        }
        this.currentSprite = this.sprites.stand.right
    }

    draw(){
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width , this.height)
        c.drawImage(this.currentSprite,
            512 * this.frames,
            512 * this.framesY,
            512,
            512,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update(){
        this.frames++
        if(this.frames > 3) {
            this.frames = 0
            this.framesY++
        }
        if(this.framesY > 1){
            this.framesY = 0
        }
        
        this.draw()
        this.position.y += this.move.y
        this.position.x += this.move.x
        if((this.position.y + this.height + this.move.y) <= canvas.height){
            this.move.y += gravit
        } else {
            // this.move.y = 0
        }
        if(this.position.y < 200){
            this.move.y += gravit
        }
    }
}



class Platform{
    constructor(x,y,image){
        this.position = {
            x,
            y
        }
        this.width = 550
        this.height = 80
        this.image = image
    }
    draw(){
        
        c.drawImage(this.image, this.position.x, this.position.y,this.width,this.height)
    }
}
class BackgroundObj{
    constructor(x,y,image,widt,height){
        this.position = {
            x,
            y
        }
        this.width = widt
        this.height = height
        this.image = image
    }
    draw(){
        
        c.drawImage(this.image, this.position.x, this.position.y,this.width,this.height)
    }
}

class Enemy{
    constructor({position,move}){
        this.position = {
            x: position.x,
            y: position.y
        }
        this.move = {
            x: move.x,
            y: move.y
        }
        this.width = 70
        this.height = 70

        this.img = makeImg(snowBall)
        this.frames = 0
        this.framesY = 0
    }

    draw(){
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        
            
            c.drawImage(this.img,
                512 * this.frames,
                386 * this.framesY,
                512,
                386,
                this.position.x,
                this.position.y,
                this.width,
                this.height)
        

    }
    update(){
        this.frames++

        if(this.frames > 2) {
            this.frames = 0
            this.framesY++
        }
        if(this.framesY > 1){
            this.framesY = 0
        }

        this.draw()
        this.position.x += this.move.x
        this.position.y += this.move.y

        if(this.position.y + this.height + this.move.y <= canvas.height) this.move.y += gravit
    }
}

function init(){
    function makeImg(src){
        const img = new Image()
        img.src = src
        return img
    }
    
     player = new Player()
    // const platform = new Platform()
    // const img = new Image()
    // img.src = "./assets/images/floor1.png"
    platforms = []
    enemies = [new Enemy({
        position:{
            x:800,
            y:100
        },
        move:{
            x: -1.5,
            y: 0
        },
        
    })]

    endGamePlace = new BackgroundObj(4400,350,makeImg(endGameImage),100,150)

    let startEnemyX = 400
    for(let i = 0; i < 60; i++){
        enemies.push(new Enemy({
            position:{
                x:startEnemyX,
                y:100
            },
            move:{
                x: -1.5,
                y: 0
            },
        }))
        startEnemyX += 350
        if(startEnemyX > 10000){
            startEnemyX -= 350
        } else if(startEnemyX < 300){
            startEnemyX += 350
        }
    }
    
    let startX = 0
    // let startY = 0
    for(let i = 0 ; i < 15; i++){
        if(i < 6){
            if(i % 2 == 0){
                platforms.push(new Platform(startX,500,makeImg(floorImage)))
                startX += 750
            } else {
                platforms.push(new Platform(startX - 250,250,makeImg(cloudImage)))
                startX += 150
    
            }

        }
        if(i >= 6 && i <9){
            if(i % 2 == 0){
                platforms.push(new Platform(startX,500,makeImg(floorImage)))
                startX -= 100
            }
            platforms.push(new Platform(startX - 250,250,makeImg(cloudImage)))
            startX += 700
        }
        if(i > 9){
            platforms.push(new Platform(startX,500,makeImg(floorImage)))
                startX -= 100
        }
        
    }
    
    //  platforms = [new Platform(0,500,makeImg(floorImage)),new Platform(100,250,makeImg(cloudImage)),new Platform(550,500,makeImg(floorImage))]
    // platforms = []


     backgroundObjects = [new BackgroundObj(0,0,makeImg(backGroundImage),2048,1152)]
     
     scrollOffset = 0
}

function makeImg(src){
    const img = new Image()
    img.src = src
    return img
}

let player = new Player()
// const platform = new Platform()
// const img = new Image()
// img.src = "./assets/images/floor1.png"




let platforms = []
let backgroundObjects = []
let enemies = []
const keys = {
    right:{
        pressed : false
    },
    left:{
        pressed : false
    },
}

let scrollOffset = 0
let endGamePlace

function onTop({object,platform}){
    return (
        object.position.y + object.height <= platform.position.y && 
        object.position.y + object.height + object.move.y >= platform.position.y &&
        object.position.x + object.width >= platform.position.x &&
        object.position.x <= platform.position.x + platform.width
                
            
    )
}
function jumpOnEnemy({object,object2}){
    return (
        object.position.y + object.height <= object2.position.y && 
        object.position.y + object.height + object.move.y >= object2.position.y &&
        object.position.x + object.width >= object2.position.x &&
        object.position.x <= object2.position.x + object2.width
                
            
    )
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    backgroundObjects.forEach(el => {
        el.draw()
    })
    
    platforms.forEach(platform => {
        platform.draw()
    })

    endGamePlace.draw()
    if(
        player.position.x + player.width >= endGamePlace.position.x
        && player.position.y + player.height >= endGamePlace.position.y
         &&
        player.position.x - endGamePlace.width <= endGamePlace.position.x
        ){
        init()
    }


    enemies.forEach((enemy =>{
        enemy.update()

        if(jumpOnEnemy({
            object: player,
            object2: enemy
        })
        ){
            init()
        } 
       
        if(
            player.position.x + player.width >= enemy.position.x
            && player.position.y + player.height >= enemy.position.y
             &&
            player.position.x - enemy.width <= enemy.position.x
            ){
            init()
        }
    }))
    player.update()

    if(keys.right.pressed && player.position.x < 400){
        player.move.x = 5
    } else if((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset == 0 && player.position.x > 0)){
        player.move.x = -5
    } else {
        player.move.x = 0

        if(keys.right.pressed){
            scrollOffset +=5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            enemies.forEach(enemy =>{
                enemy.position.x -=5
            })
            endGamePlace.position.x -=5
            } 
            else if(keys.left.pressed && scrollOffset > 0){
                scrollOffset -=5
                platforms.forEach(platform => {
                    platform.position.x +=5
                })
                enemies.forEach(enemy =>{
                    enemy.position.x +=5
                })
                endGamePlace.position.x +=5
            }
        }
    
     // keys.left.pressed ? player.move.x = -5 : player.move.x = 0
    // keys.right.pressed ? player.move.x = 5 : player.move.x = 0
    platforms.forEach(platform => {
        // if(player.position.y + player.height <= platform.position.y && 
        //     player.position.y + player.height + player.move.y >= platform.position.y &&
        //     player.position.x + player.width >= platform.position.x &&
        //     player.position.x <= platform.position.x + platform.width ){
        //         player.move.y = 0
        //     }
        if(onTop({
            object: player,
            platform
        })
        ){
            player.move.y = 0
        }
        enemies.forEach(enemy =>{
            if(onTop({
                object: enemy,
                platform
            })
            )
            enemy.move.y = 0
        })
    })
   
    if(scrollOffset > 2000) console.log('You win')

    if(player.position.y > canvas.height){
        init()
    }
}

init()
animate()

addEventListener('keydown', ({keyCode}) =>{
    console.log(keyCode)
    switch(keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            // player.curreCropWidth = player.sprites.run.cropWidth
            break
        case 87:
            console.log('up')
            player.move.y -= 20
            break
    }
})
addEventListener('keyup', ({keyCode}) =>{
    console.log(keyCode)
    switch(keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = false
            player.currentSprite = player.sprites.stand.left
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.right
            break
        case 87:
            console.log('up')
            player.move.y += 3
            break
    }
})