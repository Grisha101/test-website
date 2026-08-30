document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // ELEMENTS
    // =========================================================

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

    const labirynth = document.getElementById("labyrinth");


    // =========================================================
    // GAME VARIABLES
    // =========================================================

    let containers = [];
    let keys = {};
    let stumbleguys = [];
    let labyrinths = [];

    // Switch mode / edit mode
    let isEditMode = false;

    // Currently selected wall
    let selectedWall = null;

    // Light status
    let lightStatus = 1;


    // =========================================================
    // LABYRINTH / GAME AREA
    // =========================================================

    labirynth.style.position = "absolute";
    labirynth.style.top = "0px";
    labirynth.style.left = "0px";
    labirynth.style.width = "100%";
    labirynth.style.height = "100%";

    labirynth.style.background = `
        radial-gradient(
            circle 120px at 200px 200px,
            transparent 0%,
            rgba(255, 255, 255, 0) 100%
        )
    `;

    labirynth.style.pointerEvents = "none";
    labirynth.style.zIndex = "100";


    // =========================================================
    // LIGHT
    // =========================================================

    lightSbtn.addEventListener("click", () => {

        if (lightStatus === 0) {
            lightStatus = 1;
        } else {
            lightStatus = 0;
        }

    });


    // =========================================================
    // SETTINGS BUTTON
    // =========================================================

    settingsButton.addEventListener("click", () => {

        const settingsDiv = document.getElementById("settings");

        if (
            settingsDiv.style.display === "none" ||
            settingsDiv.style.display === ""
        ) {
            settingsDiv.style.display = "block";
        } else {
            settingsDiv.style.display = "none";
        }

    });


    // =========================================================
    // DRAG AND DROP WALLS
    // =========================================================

    function makeDraggable(element) {

        let isDragging = false;

        let offsetX = 0;
        let offsetY = 0;


        element.style.position = "absolute";
        element.style.cursor = isEditMode ? "grab" : "default";


        // -----------------------------------------------------
        // MOUSE DOWN
        // -----------------------------------------------------

        element.addEventListener("mousedown", (e) => {

            // Only allow dragging in Switch mode
            if (!isEditMode) {
                return;
            }

            // Left mouse button only
            if (e.button !== 0) {
                return;
            }

            isDragging = true;

            element.style.cursor = "grabbing";

            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;

        });


        // -----------------------------------------------------
        // MOUSE MOVE
        // -----------------------------------------------------

        document.addEventListener("mousemove", (e) => {

            if (!isDragging || !isEditMode) {
                return;
            }

            element.style.left =
                `${e.clientX - offsetX}px`;

            element.style.top =
                `${e.clientY - offsetY}px`;

        });


        // -----------------------------------------------------
        // MOUSE UP
        // -----------------------------------------------------

        document.addEventListener("mouseup", () => {

            if (!isDragging) {
                return;
            }

            isDragging = false;

            element.style.cursor =
                isEditMode ? "grab" : "default";


            // Find wall in labyrinths array
            const foundWall =
                labyrinths.find(wall => wall.el === element);


            // Update its coordinates
            if (foundWall) {

                foundWall.x =
                    parseInt(element.style.left, 10) || 0;

                foundWall.y =
                    parseInt(element.style.top, 10) || 0;

            }

        });

    }


    // =========================================================
    // FLOOR
    // =========================================================

    function buildTHEFLOOR() {

        const floor =
            document.createElement("div");

        floor.style.width = "100%";
        floor.style.height = "10%";
        floor.style.backgroundColor = "invisible";

        body.appendChild(floor);

    }


    // =========================================================
    // CREATE PLAYER
    // =========================================================

    function createGuy() {

        const stumbleguy =
            document.createElement("img");

        stumbleguy.src =
            "./pixil-gif-drawing (2).gif";

        stumbleguy.style.width = "30px";
        stumbleguy.style.height = "30px";

        stumbleguy.style.position = "absolute";

        stumbleguy.style.left = "100px";
        stumbleguy.style.top = "100px";

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


    // =========================================================
    // CREATE CONTAINER
    // =========================================================

    const container =
        document.createElement("div");


    function createContainer() {

        container.style.display = "inline";

        container.style.width = "100px";
        container.style.height = "50px";

        container.style.backgroundColor =
            "rgb(253, 72, 0)";

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


    // =========================================================
    // CREATE WALL
    // =========================================================

    function createLabyrinthFloor(
        top,
        left,
        height,
        width
    ) {

        const labyrinthWall =
            document.createElement("div");


        // Wall dimensions
        labyrinthWall.style.width =
            width + "px";

        labyrinthWall.style.height =
            height + "px";


        // Wall appearance
        labyrinthWall.style.backgroundColor =
            "green";


        // Wall position
        labyrinthWall.style.position =
            "absolute";

        labyrinthWall.style.left =
            left + "px";

        labyrinthWall.style.top =
            top + "px";


        labyrinthWall.className =
            "wall";


        // Cursor
        labyrinthWall.style.cursor =
            isEditMode ? "grab" : "default";


        // Add to page
        body.appendChild(labyrinthWall);


        // Create wall object
        const wallObject = {

            el: labyrinthWall,

            x: left,

            y: top,

            width: width,

            height: height

        };


        // Save wall
        labyrinths.push(wallObject);


        // Enable dragging
        makeDraggable(labyrinthWall);


        // =====================================================
        // SELECT WALL
        // =====================================================

        labyrinthWall.addEventListener("click", (e) => {

            // Only selectable in Switch mode
            if (!isEditMode) {
                return;
            }


            e.stopPropagation();


            // Remove previous selection
            if (
                selectedWall &&
                selectedWall.el
            ) {

                selectedWall.el.style.outline =
                    "";

            }


            // Select this wall
            selectedWall =
                wallObject;


            // Highlight selected wall
            labyrinthWall.style.outline =
                "3px solid red";


            console.log(
                "Selected wall:",
                selectedWall
            );

        });


        // =====================================================
        // RIGHT CLICK DELETE
        // =====================================================

        labyrinthWall.addEventListener(
            "contextmenu",
            (e) => {

                // Only allow deleting in Switch mode
                if (!isEditMode) {
                    return;
                }


                e.preventDefault();

                e.stopPropagation();


                // If another wall was selected,
                // remove its outline
                if (
                    selectedWall &&
                    selectedWall.el
                ) {

                    selectedWall.el.style.outline =
                        "";

                }


                // Select this wall
                selectedWall =
                    wallObject;


                labyrinthWall.style.outline =
                    "3px solid red";


                console.log(
                    "Wall selected with right click."
                );

            }
        );

    }


    // =========================================================
    // SHOW / HIDE SETTINGS
    // =========================================================

    function VANISHMAGIC(displayValue) {

        console.log(
            "VANISHMAGIC:",
            displayValue
        );


        wallTopInput.style.display =
            displayValue;

        wallLeftInput.style.display =
            displayValue;

        wallHeightInput.style.display =
            displayValue;

        wallWidthInput.style.display =
            displayValue;

        wallbutton.style.display =
            displayValue;

        deleteButton.style.display =
            displayValue;

        container.style.display =
            displayValue;

        lightSbtn.style.display =
            displayValue;

    }


    // Hide controls initially
    VANISHMAGIC("none");


    // =========================================================
    // COLLISION DETECTION
    // =========================================================

    function isColliding(
        stumbleguy,
        labyrinthWall
    ) {

        const stumbleRect =
            stumbleguy.el.getBoundingClientRect();

        const labyrinthWallRect =
            labyrinthWall.el.getBoundingClientRect();


        return !(
            stumbleRect.right <
                labyrinthWallRect.left ||

            stumbleRect.left >
                labyrinthWallRect.right ||

            stumbleRect.bottom <
                labyrinthWallRect.top ||

            stumbleRect.top >
                labyrinthWallRect.bottom
        );

    }


    // =========================================================
    // KEYBOARD INPUT
    // =========================================================

    document.addEventListener(
        "keydown",
        (e) => {

            keys[
                e.key.toLowerCase()
            ] = true;

        }
    );


    document.addEventListener(
        "keyup",
        (e) => {

            keys[
                e.key.toLowerCase()
            ] = false;

        }
    );


    // =========================================================
    // START GAME
    // =========================================================

    btn.addEventListener(
        "click",
        () => {

            // Starting walls

            createLabyrinthFloor(
                200,
                210,
                10,
                100
            );

            createLabyrinthFloor(
                140,
                210,
                10,
                150
            );

            createLabyrinthFloor(
                140,
                360,
                120,
                10
            );


            // Create player
            createGuy();

        }
    );


    // =========================================================
    // SWITCH MODE
    // =========================================================

    switchModeButton.addEventListener(
        "click",
        () => {

            // Toggle mode
            isEditMode =
                !isEditMode;


            // =================================================
            // EDIT MODE ON
            // =================================================

            if (isEditMode) {

                console.log(
                    "SWITCH MODE: ON"
                );


                // Show editor controls
                VANISHMAGIC(
                    "inline"
                );


                // Hide background
                if (cobblestonebricks) {

                    cobblestonebricks.style.display =
                        "none";

                }


                if (startbackground) {

                    startbackground.style.display =
                        "none";

                }


                // Enable wall editing
                labyrinths.forEach(
                    (wall) => {

                        wall.el.style.cursor =
                            "grab";

                    }
                );


                // Change button text
                switchModeButton.textContent =
                    "Exit edit mode";


            }

            // =================================================
            // EDIT MODE OFF
            // =================================================

            else {

                console.log(
                    "SWITCH MODE: OFF"
                );


                // Hide editor controls
                VANISHMAGIC(
                    "none"
                );


                // Hide background
                if (cobblestonebricks) {

                    cobblestonebricks.style.display =
                        "none";

                }


                if (startbackground) {

                    startbackground.style.display =
                        "none";

                }


                // Remove selected wall
                if (selectedWall) {

                    selectedWall.el.style.outline =
                        "";

                    selectedWall =
                        null;

                }


                // Disable wall editing
                labyrinths.forEach(
                    (wall) => {

                        wall.el.style.cursor =
                            "default";

                    }
                );


                // Correct variable name
                lightStatus = 0;


                // Change button text
                switchModeButton.textContent =
                    "Switch mode";

            }

        }
    );


    // =========================================================
    // CREATE WALL BUTTON
    // =========================================================

    wallbutton.addEventListener(
        "click",
        () => {

            const wallTop =
                parseInt(
                    wallTopInput.value,
                    10
                ) || 0;


            const wallLeft =
                parseInt(
                    wallLeftInput.value,
                    10
                ) || 0;


            const wallHeight =
                parseInt(
                    wallHeightInput.value,
                    10
                ) || 20;


            const wallWidth =
                parseInt(
                    wallWidthInput.value,
                    10
                ) || 100;


            createLabyrinthFloor(
                wallTop,
                wallLeft,
                wallHeight,
                wallWidth
            );

        }
    );


    // =========================================================
    // DELETE SELECTED WALL
    // =========================================================

    function deleteSelectedWall() {

        // -----------------------------------------------------
        // Must be in Switch mode
        // -----------------------------------------------------

        if (!isEditMode) {

            console.log(
                "You must be in Switch mode to delete walls."
            );

            return;

        }


        // -----------------------------------------------------
        // No selected wall
        // -----------------------------------------------------

        if (!selectedWall) {

            console.log(
                "No wall selected."
            );

            return;

        }


        // -----------------------------------------------------
        // Remove wall from DOM
        // -----------------------------------------------------

        if (selectedWall.el) {

            selectedWall.el.remove();

        }


        // -----------------------------------------------------
        // Remove wall from array
        // -----------------------------------------------------

        labyrinths =
            labyrinths.filter(
                (wall) =>
                    wall !== selectedWall
            );


        console.log(
            "Wall deleted successfully."
        );


        // -----------------------------------------------------
        // Clear selection
        // -----------------------------------------------------

        selectedWall =
            null;

    }


    // =========================================================
    // DELETE BUTTON
    // =========================================================

    deleteButton.addEventListener(
        "click",
        () => {

            deleteSelectedWall();

        }
    );


    // =========================================================
    // CLICK EMPTY SPACE = DESELECT WALL
    // =========================================================

    document.addEventListener(
        "click",
        (e) => {

            if (!isEditMode) {
                return;
            }


            // Don't deselect when clicking controls
            if (
                e.target === deleteButton ||
                e.target === wallbutton ||
                e.target === switchModeButton ||
                e.target === settingsButton
            ) {
                return;
            }


            // Don't deselect when clicking a wall
            if (
                e.target.classList &&
                e.target.classList.contains("wall")
            ) {
                return;
            }


            // Remove selection
            if (
                selectedWall &&
                selectedWall.el
            ) {

                selectedWall.el.style.outline =
                    "";

            }


            selectedWall =
                null;

        }
    );


    // =========================================================
    // GAME ENGINE
    // =========================================================

    function update() {

        stumbleguys.forEach(
            (stumbleguy) => {

                const rect =
                    labirynth.getBoundingClientRect();


                const playerCenterX =
                    stumbleguy.x -
                    rect.left +
                    15;


                const playerCenterY =
                    stumbleguy.y -
                    rect.top +
                    15;


                // =================================================
                // LIGHT
                // =================================================

                if (lightStatus === 1) {

                    labirynth.style.background = `
                        radial-gradient(
                            circle 120px at
                            ${playerCenterX}px
                            ${playerCenterY}px,
                            transparent 0%,
                            rgba(255, 255, 255, 0) 100%
                        )
                    `;

                }

                else {

                    labirynth.style.background = `
                        radial-gradient(
                            circle 120px at
                            ${playerCenterX}px
                            ${playerCenterY}px,
                            transparent 0%,
                            rgb(0, 0, 0) 100%
                        )
                    `;

                }


                // =================================================
                // SPRITE ANIMATIONS
                // =================================================

                if (keys["s"]) {

                    stumbleguy.el.src =
                        "./pixil-gif-drawing (9).gif";

                    stumbleguy.el.style.transform =
                        "none";

                }


                if (keys["a"]) {

                    stumbleguy.el.src =
                        "./pixil-gif-drawing (2).gif";

                    stumbleguy.el.style.transform =
                        "rotateY(180deg)";

                }


                if (keys["d"]) {

                    stumbleguy.el.src =
                        "./pixil-gif-drawing (2).gif";

                    stumbleguy.el.style.transform =
                        "none";

                }


                // =================================================
                // HORIZONTAL MOVEMENT
                // =================================================

                const oldX =
                    stumbleguy.x;


                if (keys["a"]) {

                    stumbleguy.x -=
                        stumbleguy.speed;

                }


                if (keys["d"]) {

                    stumbleguy.x +=
                        stumbleguy.speed;

                }


                stumbleguy.el.style.left =
                    stumbleguy.x + "px";


                let collidedX =
                    false;


                for (
                    let labyrinthWall
                    of labyrinths
                ) {

                    if (
                        isColliding(
                            stumbleguy,
                            labyrinthWall
                        )
                    ) {

                        collidedX =
                            true;

                        break;

                    }

                }


                if (collidedX) {

                    stumbleguy.x =
                        oldX;

                    stumbleguy.el.style.left =
                        stumbleguy.x + "px";

                }


                // =================================================
                // VERTICAL MOVEMENT
                // =================================================

                const oldY =
                    stumbleguy.y;


                if (keys["w"]) {

                    stumbleguy.y -=
                        stumbleguy.speed;

                }


                if (keys["s"]) {

                    stumbleguy.y +=
                        stumbleguy.speed;

                }


                stumbleguy.el.style.top =
                    stumbleguy.y + "px";


                let collidedY =
                    false;


                for (
                    let labyrinthWall
                    of labyrinths
                ) {

                    if (
                        isColliding(
                            stumbleguy,
                            labyrinthWall
                        )
                    ) {

                        collidedY =
                            true;

                        break;

                    }

                }


                if (collidedY) {

                    stumbleguy.y =
                        oldY;

                    stumbleguy.el.style.top =
                        stumbleguy.y + "px";

                }

            }
        );


        requestAnimationFrame(
            update
        );

    }


    // =========================================================
    // START GAME LOOP
    // =========================================================

    requestAnimationFrame(
        update
    );

});