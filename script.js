document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const btn = document.getElementById("myButton");

    let objects = [];
    let keys = {};
    let balls = [];

    // 🔹 Відслідковування натиснутих клавіш
    document.addEventListener("keydown", (e) => {
        keys[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
        keys[e.key] = false;
    });

    // 🔹 Створення об'єкта
    function createObject() {
        const platform = document.createElement("div");

        platform.style.width = "200px";
        platform.style.height = "10px";
        platform.style.backgroundColor = "yellow";
        platform.style.position = "absolute";
        // Use top/left so stored y matches style.top
        platform.style.left = "500px";
        platform.style.top = "658px";
        btn.style.display = "none";

        body.appendChild(platform);

        objects.push({
            el: platform,
            x: 500,
            y: 658,
            speed: 5
        });

    }
            function createObjectSpecial() {
        const iLoveceiling = document.createElement("div");

        iLoveceiling.style.width = "50px";
        iLoveceiling.style.height = "50px";
        iLoveceiling.style.backgroundColor = "red";
        iLoveceiling.style.position = "absolute";
        iLoveceiling.style.left = "400px";
        iLoveceiling.style.top = "400px";

        body.appendChild(iLoveceiling);

        objects.push({
            el: iLoveceiling,
            x: 400,
            y: 400,
            speed:0.01
        });
    }

    function createBall() {
        const ballEl = document.createElement("div");

        ballEl.style.width = "10px";
        ballEl.style.height = "10px";
        ballEl.style.backgroundColor = "cyan";
        ballEl.style.position = "absolute";
        ballEl.style.left = "600px";
        ballEl.style.top = "300px";
        ballEl.style.borderRadius = "100%";
        btn.style.display = "none";

        body.appendChild(ballEl);

        balls.push({
            el: ballEl,
            x: 600,
            y: 300,
            speed: 5,
            vx: 0 // horizontal velocity
        });

    }

    // rerite the function to check collision between ball and objects and ceiling with a more accurate bounding box check
function isColliding(obj1, obj2) {
    const rect1 = obj1.el.getBoundingClientRect();
     const rect2 = obj2.el.getBoundingClientRect();
   return !(rect1.right < rect2.left ||
                rect1.left > rect2.right ||    
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom
    );
}

    //     function createObjectSpecial() {
    //     const obj = document.createElement("div");

    //     obj.style.width = "50px";
    //     obj.style.height = "50px";
    //     obj.style.backgroundColor = "red";
    //     obj.style.position = "absolute";
    //     obj.style.left = "400px";
    //     obj.style.top = "400px";

    //     body.appendChild(obj);

    //     objects.push({
    //         el: obj,
    //         x: 400,
    //         y: 400,
    //         speed: 1
    //     });
    // }


    btn.addEventListener("click", createObject);
    btn.addEventListener("click", createBall);

    // 🔹 Рух об'єктів
    function update() {
        objects.forEach(platform => {

            if (keys["w"]) obj.y -= obj.speed;
            if (keys["s"]) obj.y += obj.speed;
                
            if (keys["a"]) platform.x -= platform.speed;
            if (keys["d"]) platform.x += platform.speed;
            // if (keys["r"]) createObject();
            // if (keys["q"]) createObjectSpecial();
            

            //  
            obj.el.style.left = obj.x + "px";
            obj.el.style.top = obj.y + "px";
        });


        balls.forEach(b => {
        // bounce ball from the objects with damping
                objects.forEach(platform => {
                    if (isColliding(b, platform)) {
                        console.log("Collision with platform at", platform.x, platform.y);
                        // Only bounce if the ball is moving downward and is above the object
                        if (b.speed > 0 && b.y < platform.y) {
                            // Increase vertical and downward bounce (speed boost) and apply damping
                            b.speed = -Math.abs(b.speed) * 1; // stronger bounce
                            // Give a horizontal kick on touch
                            b.vx += (Math.random() - 0.5) * 4; // random -2..2
                            // Clamp horizontal speed
                            const maxVx = 9;
                            if (b.vx > maxVx) b.vx = maxVx;
                            if (b.vx < -maxVx) b.vx = -maxVx;
                            // Place ball on top of the object
                            const ballHeight = parseFloat(b.el.style.height) || 9;
                            b.y = platform.y - ballHeight - 1;
                        }
                    }
                });
         balls.forEach(b => {
        // bounce ball from the ceiling
                objects.forEach(obj => {
                    if (isColliding(b, obj)) {
                        console.log("Collided with special object!", obj.x, obj.y);
                        // Only bounce if the ball is moving downward and is above the object
                        if (b.speed > 0 && b.y < obj.y) {
                            // Increase vertical and downward bounce (speed boost) and apply damping
                            b.speed = -Math.abs(b.speed) * 1; // stronger bounce
                            // Give a horizontal kick on touch
                            b.vx += (Math.random() - 0.5) * 4; // random -2..2
                            // Clamp horizontal speed
                            const maxVx = 9;
                            if (b.vx > maxVx) b.vx = maxVx;
                            if (b.vx < -maxVx) b.vx = -maxVx;
                            // Place ball on top of the object
                            const ballHeight = parseFloat(b.el.style.height) || 9;
                            b.y = iLoveceiling.y+ ballHeight + 1;
                        
                        }
                    }
                });
            });


            // Gravity (accelerate downward)
            b.speed += 0.04;
            b.y += b.speed;
             // Horizontal movement and friction
           b.x += b.vx;
            b.vx *= 0.999; // slight friction
            b.el.style.left = b.x + "px";
            b.el.style.top = b.y + "px";

            console.log(objects);
        });

        requestAnimationFrame(update);
    }

    update();


});