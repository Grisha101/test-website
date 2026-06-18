// document.addEventListener("DOMContentLoaded", () => {
//     const body = document.body;
//     const btn = document.getElementById("myButton");
//     let keys = {};
//     let stumbleguys = [];
//     let labyrinths = [];
//     let wallTopInput = document.getElementById("wallTop");
//     let wallLeftInput = document.getElementById("wallLeft");
//     let wallHeightInput = document.getElementById("wallHeight");
//     let wallWidthInput = document.getElementById("wallWidth");
//     let wallbutton = document.getElementById("wallbutton");
//             // Add this to listen for keyboard inputs
//     document.addEventListener("keydown", (e) => {
//         keys[e.key.toLowerCase()] = true;
//     });

//     document.addEventListener("keyup", (e) => {
//         keys[e.key.toLowerCase()] = false;
//     });
//     function makeDraggable(element) {
//     let isDragging = false;
//     let offsetX = 0;
//     let offsetY = 0;

//     element.style.position = 'absolute';

//     element.addEventListener('mousedown', (e) => {
//         isDragging = true;

//         offsetX = e.clientX - element.offsetLeft;
//         offsetY = e.clientY - element.offsetTop;
//     });

//     document.addEventListener('mousemove', (e) => {
//         if (!isDragging) return;

//         element.style.left = `${e.clientX - offsetX}px`;
//         element.style.top = `${e.clientY - offsetY}px`;
//     });

//     document.addEventListener('mouseup', () => {
//         isDragging = false;
//     });
// }

//     function createGuy() {
//         const stumbleguy = document.createElement("img");
//         stumbleguy.src = "./pixil-gif-drawing (2).gif";
//         stumbleguy.style.width = "30px";
//         stumbleguy.style.height = "30px";
//         stumbleguy.style.position = "absolute";
//         stumbleguy.style.left = "100px";
//         stumbleguy.style.top = "100px";
//         btn.style.display = "none";
//         body.appendChild(stumbleguy);

//         stumbleguys.push({
//             el: stumbleguy,
//             x: 100,
//             y: 100,
//             speed: 5
//         });
//     }

//     // function createLabyrinthwalls(top,left,height,color) {
//     //     const labyrinth = document.createElement("div");
//     //     labyrinth.style.width = "20px";
//     //     labyrinth.style.height = height + "px";
//     //     labyrinth.style.backgroundColor = color;
//     //     labyrinth.style.position = "absolute";
//     //     labyrinth.style.left = left + "px";
//     //     labyrinth.style.top = top + "px";
//     //     body.appendChild(labyrinth);

//     //     labyrinths.push({
//     //         el: labyrinth,
//     //         x: parseInt(labyrinth.style.left, 10),
//     //         y: parseInt(labyrinth.style.top, 10),
//     //         width: 20,
//     //         height: 200
//     //     });
//     // }

    
//     function createLabyrinthFloor(top,left,height,width) {
//         const labyrinth = document.createElement("div");
//         labyrinth.style.width = width + "px";
//         labyrinth.style.height = height + "px";
//         labyrinth.style.backgroundColor = "green";
//         labyrinth.style.position = "absolute";
//         labyrinth.style.left = left + "px";
//         labyrinth.style.top = top + "px";
//         labyrinth.style.className = "wall";
        
//         body.appendChild(labyrinth);
//         makeDraggable(document.querySelector(".wall"));
//         labyrinths.push({
//             el: labyrinth,
//             x: parseInt(labyrinth.style.left, 10),
//             y: parseInt(labyrinth.style.top, 10),
//             width: parseInt(labyrinth.style.width, 10),
//             height: parseInt(labyrinth.style.height, 10)
//         });
//     } 


//     function isColliding(stumbleguy, labyrinthWall) {
//         const stumbleRect = stumbleguy.el.getBoundingClientRect();
//         const labyrinthWallRect = labyrinthWall.el.getBoundingClientRect();
//         return !(
//             stumbleRect.right < labyrinthWallRect.left ||
//             stumbleRect.left > labyrinthWallRect.right ||
//             stumbleRect.bottom < labyrinthWallRect.top ||
//             stumbleRect.top > labyrinthWallRect.bottom
//         );
//     }

//     btn.addEventListener("click", () => {createLabyrinthFloor(200,210,10,100)
//         console.log("button clicked");
//         createLabyrinthFloor(140,210,10,150)
//         createLabyrinthFloor(140,360,120,10)
//         createGuy()
//         createLabyrinthFloor(140,360,120,10)});
//     wallbutton.addEventListener("click", () => {
//         const wallTop = parseInt(wallTopInput.value);
//         const wallLeft = parseInt(wallLeftInput.value);
//         const wallHeight = parseInt(wallHeightInput.value);
//         const wallWidth = parseInt(wallWidthInput.value);
//         createLabyrinthFloor(wallTop, wallLeft, wallHeight, wallWidth);
//     });

//     function update() {
//         stumbleguys.forEach(stumbleguy => {
      
//             if (keys["s"]) { 
//                 console.log("s");
//                 stumbleguy.el.src = "./pixil-gif-drawing (9).gif";
//                 stumbleguy.el.style.transform = "none"; 
//             }
//             if (keys["a"]) { 
//                 console.log("a");
//                 stumbleguy.el.src = "./pixil-gif-drawing (2).gif";
//                 stumbleguy.el.style.transform = "rotateY(180deg)"; 
//             }                
//             if (keys["d"]) { 
//                 console.log("d");
//                 stumbleguy.el.src = "./pixil-gif-drawing (2).gif";
//                 stumbleguy.el.style.transform = "none";
//             }
//             if (keys["w"]) {
//                 console.log("w");
//             }

        
//             const oldX = stumbleguy.x;

//             if (keys["a"]) stumbleguy.x -= stumbleguy.speed;
//             if (keys["d"]) stumbleguy.x += stumbleguy.speed;


//             stumbleguy.el.style.left = stumbleguy.x + "px";

//             let collidedX = false;
//             for (let labyrinthWall of labyrinths) {
//                 if (isColliding(stumbleguy, labyrinthWall)) {
//                     collidedX = true;
//                     break;
//                 }
//             }
          
//             if (collidedX) {
//                 stumbleguy.x = oldX;
//                 stumbleguy.el.style.left = stumbleguy.x + "px";
//             }


//             const oldY = stumbleguy.y; 

//             if (keys["w"]) stumbleguy.y -= stumbleguy.speed;
//             if (keys["s"]) stumbleguy.y += stumbleguy.speed;


//             stumbleguy.el.style.top = stumbleguy.y + "px";


//             let collidedY = false;
//             for (let labyrinthWall of labyrinths) {
//                 if (isColliding(stumbleguy, labyrinthWall)) {
//                     collidedY = true;
//                     break;
//                 }
//             }

//             if (collidedY) {
//                 stumbleguy.y = oldY;
//                 stumbleguy.el.style.top = stumbleguy.y + "px";
//             }
//         });

//         requestAnimationFrame(update);
//     }

//     requestAnimationFrame(update);
// });
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const btn = document.getElementById("myButton");
    const wallbutton = document.getElementById("wallbutton");
    const deleteButton = document.getElementById("deleteButton"); // Uncommented so it's defined

    const wallContainer = document.getElementById("wallContainer");

    const wallTopInput = document.getElementById("wallTop");
    const wallLeftInput = document.getElementById("wallLeft");
    const wallHeightInput = document.getElementById("wallHeight");
    const wallWidthInput = document.getElementById("wallWidth");

    let containers = [];
    let keys = {};
    let stumbleguys = [];
    let labyrinths = [];
            
    // DRAG AND DROP FUNCTIONALITY
    function makeDraggable(element) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        element.style.position = 'absolute';
        element.style.cursor = 'grab';

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            element.style.cursor = 'grabbing';
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'grab';
                
                // Update the coordinates in our labyrinths array 
                // so character collision matches the wall's new position
                const foundWall = labyrinths.find(w => w.el === element);
                if (foundWall) {
                    foundWall.x = parseInt(element.style.left, 10);
                    foundWall.y = parseInt(element.style.top, 10);
                }
            }
        });
    }

    // CREATE CHARACTER
    function createGuy() {
        const stumbleguy = document.createElement("img");
        stumbleguy.src = "./pixil-gif-drawing (2).gif"; // Ensure this image path is correct!
        stumbleguy.style.width = "30px";
        stumbleguy.style.height = "30px";
        stumbleguy.style.position = "absolute";
        stumbleguy.style.left = "100px";
        stumbleguy.style.top = "100px";
        stumbleguy.style.zIndex = "10";
        
        btn.style.display = "none";
        body.appendChild(stumbleguy);

        stumbleguys.push({
            el: stumbleguy,
            x: 100,
            y: 100,
            speed: 5
        });
    }
    function createContainer() {
        const container = document.createElement("div");
        container.style.width = "100px";
        container.style.height = "200px";
        container.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
        container.style.position = "absolute";
        container.style.right = "300px";
        container.style.top = "10px";
        container.style.zIndex = "5";
        body.appendChild(container);
        containers.push({
            el: container,
            x: 300,
            y: 300,
            width: 100,
            height: 200
        });
    }
    // CREATE LABYRINTH WALLS
    function createLabyrinthFloor(top, left, height, width) {
        const labyrinth = document.createElement("div");
        labyrinth.style.width = width + "px";
        labyrinth.style.height = height + "px";
        labyrinth.style.backgroundColor = "green";
        labyrinth.style.position = "absolute";
        labyrinth.style.left = left + "px";
        labyrinth.style.top = top + "px";
        
        // Correctly set class name
        labyrinth.className = "wall"; 
        
        body.appendChild(labyrinth);

        // Turn on dragging capabilities for this specific wall element
        makeDraggable(labyrinth);

        labyrinths.push({
            el: labyrinth,
            x: left,
            y: top,
            width: width,
            height: height
        });
    } 

    // COLLISION DETECTION ENGINE
    function isColliding(stumbleguy, labyrinthWall) {
        const stumbleRect = stumbleguy.el.getBoundingClientRect();
        const labyrinthWallRect = labyrinthWall.el.getBoundingClientRect();
        return !(
            stumbleRect.right < labyrinthWallRect.left ||
            stumbleRect.left > labyrinthWallRect.right ||
            stumbleRect.bottom < labyrinthWallRect.top ||
            stumbleRect.top > labyrinthWallRect.bottom
        );
    }

    // KEYBOARD INPUT LISTENERS
    document.addEventListener("keydown", (e) => {
        keys[e.key.toLowerCase()] = true;
    });

    document.addEventListener("keyup", (e) => {
        keys[e.key.toLowerCase()] = false;
    });

    // BUTTON EVENT LISTENERS
    btn.addEventListener("click", () => {
        console.log("Start button clicked");
        createLabyrinthFloor(200, 210, 10, 100);
        createLabyrinthFloor(140, 210, 10, 150);
        createLabyrinthFloor(140, 360, 120, 10);
        createGuy();
        createContainer();
    });

    wallbutton.addEventListener("click", () => {
        const wallTop = parseInt(wallTopInput.value, 10) || 0;
        const wallLeft = parseInt(wallLeftInput.value, 10) || 0;
        const wallHeight = parseInt(wallHeightInput.value, 10) || 20;
        const wallWidth = parseInt(wallWidthInput.value, 10) || 100;
        createLabyrinthFloor(wallTop, wallLeft, wallHeight, wallWidth);
    });

    // REFACTORED: Finds and deletes the wall currently touching the character
    function deleteCollidingWall() {
        const container1 = containers[0]; 

        // Find the wall that the player is touching
        const wallToDelete = labyrinths.find(wall => isColliding(container1, wall));

        if (wallToDelete) {
            wallToDelete.el.remove(); // Remove from DOM screen
            labyrinths = labyrinths.filter(wall => wall !== wallToDelete); // Remove from Array
            console.log("Wall deleted successfully.");
            return true;
        }
        
        console.log("no wall to delete.");
        return false;
    }

    // Fixed click listener targeting the refactored delete function
    deleteButton.addEventListener("click", () => {
        deleteCollidingWall();
    });

    // GAME ENGINE LOOP
    function update() {
        stumbleguys.forEach(stumbleguy => {
            // Visual Sprite and Transform Updates
            if (keys["s"]) { 
                stumbleguy.el.src = "./pixil-gif-drawing (9).gif";
                stumbleguy.el.style.transform = "none"; 
            }
            if (keys["a"]) { 
                stumbleguy.el.src = "./pixil-gif-drawing (2).gif";
                stumbleguy.el.style.transform = "rotateY(180deg)"; 
            }                
            if (keys["d"]) { 
                stumbleguy.el.src = "./pixil-gif-drawing (2).gif";
                stumbleguy.el.style.transform = "none";
            }

            // --- Horizontal Movement & Collision ---
            const oldX = stumbleguy.x;

            if (keys["a"]) stumbleguy.x -= stumbleguy.speed;
            if (keys["d"]) stumbleguy.x += stumbleguy.speed;

            stumbleguy.el.style.left = stumbleguy.x + "px";

            let collidedX = false;
            for (let labyrinthWall of labyrinths) {
                if (isColliding(stumbleguy, labyrinthWall)) {
                    collidedX = true;
                    break;
                }
            }
          
            if (collidedX) {
                stumbleguy.x = oldX;
                stumbleguy.el.style.left = stumbleguy.x + "px";
            }

            // --- Vertical Movement & Collision ---
            const oldY = stumbleguy.y; 

            if (keys["w"]) stumbleguy.y -= stumbleguy.speed;
            if (keys["s"]) stumbleguy.y += stumbleguy.speed;

            stumbleguy.el.style.top = stumbleguy.y + "px";

            let collidedY = false;
            for (let labyrinthWall of labyrinths) {
                if (isColliding(stumbleguy, labyrinthWall)) {
                    collidedY = true;
                    break;
                }
            }

            if (collidedY) {
                stumbleguy.y = oldY;
                stumbleguy.el.style.top = stumbleguy.y + "px";
            }
        });

        requestAnimationFrame(update);
    }

    // Start the game loop
    requestAnimationFrame(update);
});