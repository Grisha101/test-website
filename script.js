document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const btn = document.getElementById("myButton");

    let objects = [];
    let keys = {};
    let ball = [];
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
        const ball = document.createElement("div");

        ball.style.width = "10px";
        ball.style.height = "10px";
        ball.style.backgroundColor = "cyan";
        ball.style.position = "absolute";
        ball.style.left = "600px";
        ball.style.bottom = "300px";
        ball.style.borderRadius="100%";
        btn.style.display = "none";

        body.appendChild(ball);

        ball.push({
            el: ball,
            x: 600,
            y: 300,
            speed: 5
        });

    }

    function isColliding(obj1, obj2) {
    return !(
        obj1.x + obj1.width < obj2.x ||
        obj1.x > obj2.x + obj2.width ||
        obj1.y + obj1.height < obj2.y ||
        obj1.y > obj2.y + obj2.height
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
        ball.forEach(ball => {
            while (true) {
                //рух вниз
                ball.y += ball.speed;

                //оновлення позиції
                ball.el.style.left = ball.x + "px";
                ball.el.style.top = ball.y + "px";
            }
        });

        requestAnimationFrame(update);
    }

    update();



});