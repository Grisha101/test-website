
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const btn = document.getElementById("myButton");
    const wallbutton = document.getElementById("wallbutton");
    const deleteButton = document.getElementById("deleteButton"); 
    const switchModeButton = document.getElementById("switchModeButton"); 
    const wallTopInput = document.getElementById("wallTop");
    const wallLeftInput = document.getElementById("wallLeft");
    const wallHeightInput = document.getElementById("wallHeight");
    const wallWidthInput = document.getElementById("wallWidth");
    const lightSbtn = document.getElementById("lightSwitch");
    const startbackground = document.getElementById("start_background");
    const cobblestonebricks = document.getElementById("cobblestone_bricks");
    const settingsButton = document.getElementById("settingsButton");

    let containers = [];
    let keys = {};
    let stumbleguys = [];
    let labyrinths = [];
    
    
    // Global flag to track if we can drag walls or not
    let isEditMode = false;
            
    // functionality of the light 
    const labirynth = document.getElementById("labyrinth");
    labirynth.style.position = "absolute";
    labirynth.style.top = "0px";
    labirynth.style.left = "0px";
    labirynth.style.width = "100%";
    labirynth.style.height = "100%";

    let lightStatus = 1;

    labirynth.style.background = `
    radial-gradient(
    circle 120px at 200px 200px,
    transparent 0%,
    rgba(255, 255, 255, 0) 100%
    )
    `;

    lightSbtn.addEventListener("click", () => {        
        if (lightStatus === 0) { 
            lightStatus = 1;
        } else {
            lightStatus = 0;
        }
    });

    labirynth.style.pointerEvents = "none"; 
    labirynth.style.zIndex = "100"; 


    settingsButton.addEventListener("click", () => {
        const settingsDiv = document.getElementById("settings");
        if (settingsDiv.style.display === "none" || settingsDiv.style.display === "") {
            settingsDiv.style.display = "block";
        } else {
            settingsDiv.style.display = "none";
        }
    });

    // DRAG AND DROP FUNCTIONALITY
    function makeDraggable(element) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        element.style.position = 'absolute';
        element.style.cursor = 'default'; // Default to normal cursor

        element.addEventListener('mousedown', (e) => {
            if (!isEditMode) return; // REJECT dragging if edit mode is off
            
            isDragging = true;
            element.style.cursor = 'grabbing';
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging || !isEditMode) return;
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = isEditMode ? 'grab' : 'default';
                
                // Update the coordinates in our labyrinths array 
                const foundWall = labyrinths.find(w => w.el === element);
                if (foundWall) {
                    foundWall.x = parseInt(element.style.left, 10);
                    foundWall.y = parseInt(element.style.top, 10);
                }
            }
        });
    }
    function buildTHEFLOOR() {
        const floor = document.createElement("div");
        floor.style.width = "100%";
        floor.style.height = "10%";
        floor.style.backgroundColor = "invisible";
        body.appendChild(floor);
    }
    // CREATE CHARACTER
    function createGuy() {
        const stumbleguy = document.createElement("img");
        stumbleguy.src = "./pixil-gif-drawing (2).gif"; 
        stumbleguy.style.width = "30px";
        stumbleguy.style.height = "30px";
        stumbleguy.style.position = "absolute";
        stumbleguy.style.left = "100px"; // Изменено, чтобы не застревал в стене
        stumbleguy.style.top = "100px";  // Изменено, чтобы не застревал в стене
        stumbleguy.style.zIndex = "99999";
        btn.style.display = "none";
        body.appendChild(stumbleguy);

        stumbleguys.push({
            el: stumbleguy,
            x: 100,
            y: 100,
            speed: 5
        });
    }

    const container = document.createElement("div");
    function createContainer() {
        container.style.display = "inline";
        container.style.width = "100px";
        container.style.height = "50px";
        container.style.backgroundColor = "rgb(253, 72, 0)";
        container.style.position = "absolute";
        container.style.right = "250px";
        container.style.top = "100px";
        container.style.zIndex = "1";
        body.appendChild(container);
        containers.push({
            el: container,
            x: 400,
            y: 400,
            width: 100,
            height: 50
        });
    }

    // CREATE LABYRINTH WALLS
    function createLabyrinthFloor(top, left, height, width) {
        const labyrinthWall = document.createElement("div");
        labyrinthWall.style.width = width + "px";
        labyrinthWall.style.height = height + "px";
        labyrinthWall.style.backgroundColor = "green";
        labyrinthWall.style.position = "absolute";
        labyrinthWall.style.left = left + "px";
        labyrinthWall.style.top = top + "px";
        labyrinthWall.className = "wall"; 
        
        body.appendChild(labyrinthWall);

        // FIX: Explicitly bind the dragging capabilities to this new wall!
        makeDraggable(labyrinthWall);

        labyrinths.push({
            el: labyrinthWall,
            x: left,
            y: top,
            width: width,
            height: height
        });
    } 
    function VANISHMAGIC(gugugaga) {
        console.log("VANISHMAGIC called with:", gugugaga);
            wallTopInput.style.display = gugugaga;
            wallLeftInput.style.display = gugugaga;
            wallHeightInput.style.display = gugugaga;
            wallWidthInput.style.display = gugugaga;
            wallbutton.style.display = gugugaga;
            deleteButton.style.display = gugugaga;
            container.style.display = gugugaga;
            lightSbtn.style.display = gugugaga;
    } // Initially hide all controls
VANISHMAGIC("none");
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
        // Базовый спавн при старті
        createLabyrinthFloor(200, 210, 10, 100);
        createLabyrinthFloor(140, 210, 10, 150);
        createLabyrinthFloor(140, 360, 120, 10);
        createGuy();
        
    });
        
    // MODE SWITCHER VISIBILITY AND FLAG TOGGLE
    switchModeButton.addEventListener("click", () => {
        isEditMode = !isEditMode; // Toggle logic
        
        if (isEditMode) {
            VANISHMAGIC("inline");
             cobblestonebricks.style.display = "inline";
            startbackground.style.display = "none";
            createContainer();

            // Revert cursors to standard behavior
            labyrinths.forEach(wall => wall.el.style.cursor = 'default');
 

        } else {
            VANISHMAGIC("none");
            cobblestonebricks.style.display = "inline";
            startbackground.style.display = "none";
            LightStatus=0;
            // Show grab handles indicating they can be dragged
            labyrinths.forEach(wall => wall.el.style.cursor = 'grab');
        }

    });
    
    wallbutton.addEventListener("click", () => {
        const wallTop = parseInt(wallTopInput.value, 10) || 0;
        const wallLeft = parseInt(wallLeftInput.value, 10) || 0;
        const wallHeight = parseInt(wallHeightInput.value, 10) || 20;
        const wallWidth = parseInt(wallWidthInput.value, 10) || 100;
        createLabyrinthFloor(wallTop, wallLeft, wallHeight, wallWidth);
    });

    function deleteCollidingWall() {
        const container1 = containers[0]; 
        if (!container1) return;

        const wallToDelete = labyrinths.find(wall => isColliding(container1, wall));

        if (wallToDelete) {
            wallToDelete.el.remove(); 
            labyrinths = labyrinths.filter(wall => wall !== wallToDelete); 
            console.log("Wall deleted successfully.");
            return true;
        }
        console.log("no wall to delete.");
        return false;
    }

    deleteButton.addEventListener("click", () => {
        deleteCollidingWall();
    });

    // GAME ENGINE LOOP
    function update() {
        stumbleguys.forEach(stumbleguy => {
            const rect = labirynth.getBoundingClientRect();
            const playerCenterX = stumbleguy.x - rect.left + 15;
            const playerCenterY = stumbleguy.y - rect.top + 15;

            if (lightStatus === 1) {
                labirynth.style.background = `
                radial-gradient(
                circle 120px at ${playerCenterX}px ${playerCenterY}px,
                transparent 0%,
                rgba(255, 255, 255, 0) 100%
                )
                `;
            } else {
                labirynth.style.background = `
                radial-gradient(
                circle 120px at ${playerCenterX}px ${playerCenterY}px,
                transparent 0%,
                rgb(0, 0, 0) 100%
                )
                `;
                
            }

            // Sprite Animations
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

            // Horizontal Movement
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

            // Vertical Movement
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

    requestAnimationFrame(update);
});