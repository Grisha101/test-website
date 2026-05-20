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
        const obj = document.createElement("div");

        obj.style.width = "200px";
        obj.style.height = "10px";
        obj.style.backgroundColor = "yellow";
        obj.style.position = "absolute";
        // Use top/left so stored y matches style.top
        obj.style.left = "500px";
        obj.style.top = "658px";
        btn.style.display = "none";

        body.appendChild(obj);

        objects.push({
            el: obj,
            x: 500,
            y: 658,
            speed: 5
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

    // rerite the function to check collision between ball and objects
function isColliding(ball, obj) {
     const ballRect = ball.el.getBoundingClientRect();
     const objRect = obj.el.getBoundingClientRect();
   return !(ballRect.right < objRect.left ||
                ballRect.left > objRect.right ||    
                ballRect.bottom < objRect.top ||
                ballRect.top > objRect.bottom
    );
}

        function createObjectSpecial() {
        const objSpeciale = document.createElement("div");

        objSpeciale.style.width = "50px";
        objSpeciale.style.height = "50px";
        objSpeciale.style.backgroundColor = "red";
        objSpeciale.style.position = "absolute";
        objSpeciale.style.left = "400px";
        objSpeciale.style.top = "400px";

        body.appendChild(objSpeciale);

        objects.push({
            el: objSpeciale,
            x: 400,
            y: 400,
            speed: 5
        });
    }


    btn.addEventListener("click", createObject);
    btn.addEventListener("click", createBall);

    // 🔹 Рух об'єктів
    function update() {
        objects.forEach(obj => {

            // if (keys["w"]) obj.y -= obj.speed;
            // if (keys["s"]) obj.y += obj.speed;
                
            if (keys["a"]) obj.x -= obj.speed;
            if (keys["d"]) obj.x += obj.speed;
            // if (keys["r"]) createObject();
            // if (keys["q"]) createObjectSpecial();
            
            obj.el.style.left = obj.x + "px";
            obj.el.style.top = obj.y + "px";            
        });


        balls.forEach(b => {
        // bounce ball from the objects with damping
                objects.forEach(obj => {
                    if (isColliding(b, obj)) {
                        // Only bounce if the ball is moving downward
                        if (b.speed > 0) {
                            // Increase vertical bounce (speed boost) and apply damping
                            b.speed = -Math.abs(b.speed) * 1; // stronger bounce
                            // Give a horizontal kick on touch
                            b.vx += (Math.random() - 0.5) * 4; // random -2..2
                            // Clamp horizontal speed
                            const maxVx = 9;
                            if (b.vx > maxVx) b.vx = maxVx;
                            if (b.vx < -maxVx) b.vx = -maxVx;
                            // Place ball on top of the object
                            const ballHeight = parseFloat(b.el.style.height) || 9;
                            b.y = obj.y - ballHeight - 1;
                        }
                    }
                });


            // Gravity (accelerate downward)
            b.speed += 0.5;
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