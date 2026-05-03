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
        obj.style.left = "200px";
        obj.style.bottom = "100px";
        
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
            speed: 5
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
            

            //  isColliding(obj, objSpeciale) && console.log("Collision!");
        
            obj.el.style.left = obj.x + "px";
            obj.el.style.top = obj.y + "px";
        });
        balls.forEach(b => {
        // bounsce ball from the obects
                objects.forEach(obj => {
                    
                    if (isColliding(b, obj)) {
                        b.speed = -b.speed; // Reverse and reduce speed to simulate bounce
                        b.y = obj.y - 150; // Position the ball above the object
                    }
                });
            b.speed += 0.9; // Gravity
            b.y += b.speed;
            b.el.style.left = b.x + "px";
            b.el.style.top = b.y + "px";

        });

        requestAnimationFrame(update);
    }

    update();



});