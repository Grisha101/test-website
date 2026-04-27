document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const btn = document.getElementById("myButton");

    let objects = [];
    let keys = {};

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

        obj.style.width = "50px";
        obj.style.height = "50px";
        obj.style.backgroundColor = "blue";
        obj.style.position = "absolute";
        obj.style.left = "200px";
        obj.style.top = "200px";

        body.appendChild(obj);

        objects.push({
            el: obj,
            x: 200,
            y: 200,
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

        // objects.push({
        //     el: objSpeciale,
        //     x: 400,
        //     y: 400,
        //     speed: 5
        // });
    }



    btn.addEventListener("click", createObject);

    // 🔹 Рух об'єктів
    function update() {
        objects.forEach(obj => {

            if (keys["w"]) obj.y -= obj.speed;
            if (keys["s"]) obj.y += obj.speed;
            if (keys["a"]) obj.x -= obj.speed;
            if (keys["d"]) obj.x += obj.speed;
            if (keys["q"]) createObjectSpecial();

             isColliding(obj, objSpeciale) && console.log("Collision!");

            obj.el.style.left = obj.x + "px";
            obj.el.style.top = obj.y + "px";
        });

        requestAnimationFrame(update);
    }

    update();



});