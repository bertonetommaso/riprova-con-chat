/* =========================
   SETUP
========================= */

gsap.registerPlugin(
    ScrollTrigger,
    Draggable
);


/* =========================
   LENIS SMOOTH SCROLL
========================= */


const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.08
});


function raf(time){

    lenis.raf(time);

    requestAnimationFrame(raf);

}

requestAnimationFrame(raf);



lenis.on(
    "scroll",
    ScrollTrigger.update
);



gsap.ticker.add((time)=>{

    lenis.raf(time * 1000);

});


gsap.ticker.lagSmoothing(0);



/* =========================
   ELEMENTS
========================= */


const blob = document.querySelector("#blob");

const card = document.querySelector("#aboutCard");

const viewport =
document.querySelector(".fixed-viewport");


const camera =
document.querySelector(".camera");


const line =
document.querySelector("#animatedLine");



/* =========================
   SVG DRAW ANIMATION
========================= */


const length =
line.getTotalLength();


line.style.strokeDasharray = length;
line.style.strokeDashoffset = length;



gsap.to(
    line,
    {

        strokeDashoffset:0,

        ease:"none",

        scrollTrigger:{

            trigger:".scroll-area",

            start:"top top",

            end:"bottom bottom",

            scrub:true

        }

    }
);



/* =========================
   CAMERA FOLLOW
========================= */


gsap.to(
    camera,
    {

        y:-6500,

        ease:"none",

        scrollTrigger:{

            trigger:".scroll-area",

            start:"top top",

            end:"bottom bottom",

            scrub:1

        }

    }
);




/* =========================
   BLOB CLICK
========================= */


let cardSpawned = false;



blob.addEventListener(
    "click",
    ()=>{


        if(cardSpawned) return;

        cardSpawned=true;



        gsap.to(
            blob,
            {

                scale:0,

                duration:.5,

                ease:"back.in"

            }
        );



        gsap.fromTo(
            card,

            {

                opacity:0,

                scale:0,

                x:-50,

                y:-30


            },

            {

                opacity:1,

                scale:1,

                x:0,

                y:0,


                duration:1,


                ease:"elastic.out(1,.5)"

            }

        );


    }
);




/* =========================
   DRAG TRAIL
========================= */


function createParticle(x,y){


    const particle =
    document.createElement("div");


    particle.className =
    "trail-particle";


    particle.style.left =
    x+"px";


    particle.style.top =
    y+"px";


    document.body.appendChild(
        particle
    );


    gsap.to(
        particle,
        {

            scale:0,

            opacity:0,


            duration:.8,


            ease:"power2.out",


            onComplete(){

                particle.remove();

            }

        }
    );

}




/* =========================
   DRAGGABLE CARD
========================= */


Draggable.create(
    card,
    {

        type:"x,y",


        bounds:document.body,


        inertia:true,


        onDrag(){


            createParticle(
                this.x + card.offsetWidth/2,
                this.y + card.offsetHeight/2
            );


        },


        onThrowUpdate(){


            createParticle(
                this.x + card.offsetWidth/2,
                this.y + card.offsetHeight/2
            );


        }

    }
);




/* =========================
   CARD FULLSCREEN
========================= */


card.addEventListener(
    "click",
    (e)=>{


        if(
            card.classList.contains("expanded")
        )
        return;



        card.classList.add(
            "expanded"
        );


        viewport.classList.add(
            "blur"
        );



        gsap.fromTo(
            card,

            {

                scale:.4

            },

            {

                scale:1,


                duration:1,


                ease:"power3.out"

            }

        );


    }
);



/* =========================
   ESC CLOSE
========================= */


document.addEventListener(
    "keydown",
    (e)=>{


        if(e.key==="Escape"){


            card.classList.remove(
                "expanded"
            );


            viewport.classList.remove(
                "blur"
            );


        }

    }
);
