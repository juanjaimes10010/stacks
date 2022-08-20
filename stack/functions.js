function placeBlock() {
    // split block
    // if(cube.position.x > width || cube.position.y > depth) {
    //     console.log('game over')
    // }
    if(STACK) split(); 

    // create and add new block 
    addBlock(x,y,z,width,height,depth);
    speed += .005;
    y++;
    color += 5; 

    // change direction and starting position for new block
    if(direction.x) {
        cube.position.z = -5;
        direction.x = false;
        direction.z = true;
    } else if(direction.z) {
        cube.position.x = -5;
        direction.z = false;
        direction.x = true;
    }
    // camera adjustment 
    camera.position.set(5, y + 5 ,5);
    camera.lookAt(0, y ,0);
}

function addBlock(x,y,z,width,height,depth,mass = false) {
    // 3js box
    cube = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshLambertMaterial({color: new THREE.Color(`hsl(${color},100%,50%)`)}));
    cube.position.set(x,y,z);
    scene.add(cube);
    // cannonjs box
    shape = new CANNON.Body({shape: new CANNON.Box(new CANNON.Vec3(width/2, height/2, depth/2)), mass});
    shape.position.set(x,y,z);
    world.addBody(shape)
    
}

function move() {
    // move for x direction
    if(direction.x && cube.position.x <= 5 && forward) {

        cube.position.x += speed;
        shape.position.x += speed;

        if(cube.position.x >= 5) forward = false;
    } else if(direction.x && cube.position.x >= -5 && !forward) {

        cube.position.x -= speed;
        shape.position.x -= speed;

        if(cube.position.x <= -5) forward = true;
    }

    // move for z directon
    if(direction.z && cube.position.z <= 5 && forward) {

        cube.position.z += speed;
        shape.position.z += speed;

        if(cube.position.z >= 5) forward = false;
    } else if(direction.z && cube.position.z >= -5 && !forward) {

        cube.position.z -= speed;
        shape.position.z -= speed;

        if(cube.position.z <= -5) forward = true;
    }

}


function split() {  
    scene.remove(cube);
    world.removeBody(shape);

    if(direction.x) {

        width = width - Math.abs(cube.position.x); 
        if(cube.position.x > 0) x = x + cube.position.x / 2   
        if(cube.position.x < 0) x = x - Math.abs(cube.position.x) / 2    

    } else if(direction.z) {

        depth = depth - Math.abs(cube.position.z);
        if(cube.position.z > 0) z = z + cube.position.z / 2   
        if(cube.position.z < 0) z = z - Math.abs(cube.position.z) / 2     
    }

    addBlock(x,y,z,width,height,depth);
    addBlock(cube.position.x,y,cube.position.z,width,height,depth,true)
}