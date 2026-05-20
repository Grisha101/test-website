document.addEventListener("DOMContentLoaded", ()=> {
    const body=document.body;
    const btn=document.getElementById("myButton");
    let keys={};
    let stumbleguys=[];
        document.addEventListener("keydown", (e) => {
        keys[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
        keys[e.key] = false;
    });

    document.addEventListener("keydown",(w)=>{
        keys[w.key]=true;
    });
    document.addEventListener("keyup",(w)=>{
        keys[w.key]=false;
    });
    document.addEventListener("keydown",(s)=>{
        keys[s.key]=true;
    });
    document.addEventListener("keyup",(s)=>{
        keys[s.key]=false;
    });
    document.addEventListener("keydown",(a)=>{
        keys[a.key]=true;
    });
    document.addEventListener("keyup",(a)=>{
        keys[a.key]=false;
    });
    document.addEventListener("keydown",(d)=>{
        keys[d.key]=true;
    });
    document.addEventListener("keyup",(d)=>{
        keys[d.key]=false;
    });
    function createGuy(){
        const stumbleguy=document.createElement("div");
        stumbleguy.style.width="50px";
        stumbleguy.style.height="50px";
        stumbleguy.style.backgroundColor="black";
        stumbleguy.style.position="absolute";
        stumbleguy.style.left="100px";
        stumbleguy.style.top="100px";
        btn.style.display="none";
        body.appendChild(stumbleguy);
        stumbleguys.push({
            el: stumbleguy,
            x: 100,
            y: 100,
            speed: 5
        });
    
    }

        btn.addEventListener("click",createGuy);

        function update() {
            stumbleguys.forEach(stumbleguy => {
                if (keys["w"]) { stumbleguy.y -= stumbleguy.speed; console.log("w"); }
                if (keys["s"]) { stumbleguy.y += stumbleguy.speed; console.log("s"); }
                if (keys["a"]) { stumbleguy.x -= stumbleguy.speed; console.log("a"); }
                if (keys["d"]) { stumbleguy.x += stumbleguy.speed; console.log("d"); }

                stumbleguy.el.style.left = stumbleguy.x + "px";
                stumbleguy.el.style.top = stumbleguy.y + "px";
            });

            requestAnimationFrame(update);
        }

        requestAnimationFrame(update);




});