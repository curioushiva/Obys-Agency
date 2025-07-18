/* Locomotive js */
function myLocomotivejs() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    let locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
myLocomotivejs();

/* All the elements used */
let mainBody = document.querySelector(".main");
let loadingValue = document.querySelector(".text-cont h1 sup span");
let navUp = document.querySelector(".navbar-up");
let menubtn1 = document.querySelector(".nav-l-l .ri-box-1-fill");
let menubtn2 = document.querySelector(".navup-l-up .ri-box-2-fill");
let navupLeftDown = document.querySelectorAll(".navup-l-dn a");
let homeTextCont = document.querySelector(".ht-r")
let videoCont = document.querySelector(".video-cont");
let homeVideo = document.querySelector(".video-cont video");
let contentCircle = document.querySelectorAll(".content-circle");
let Page4Heading = document.querySelector(".p4-head h1");



/* Home video */
let tl3 = gsap.timeline({
    defaults: {
        duration: 0.1,
        ease: "power1.out"
    }
});
function myHomevideo() {
    // page on click animation
    let playpause = true;
    videoCont.addEventListener("click", () => {
        console.log("hello")
        if (playpause) {
            tl3.to(".video-cont img , .ri-play-fill", {
                display: "none",
            })

            tl3.to(".ri-pause-mini-fill", {
                display: "inline-block",
            })

            tl3.to(".video-cursor", {
                scale: 0.5,
                duration: "0.2",
                ease: "power4.out",
            })

            tl3.to(".video-cont video", {
                onStart: () => {
                    homeVideo.play();
                }
            })

            playpause = false;

        } else if (!playpause) {
            tl3.to(".ri-pause-mini-fill", {
                display: "none"
            })
            tl3.to(".video-cont img , .ri-play-fill", {
                display: "inline-block"
            })

            tl3.to(".video-cont video", {
                onStart: () => {
                    homeVideo.pause();
                }
            })
            tl3.to(".video-cursor", {
                scale: 1,
                duration: "0.3",
                ease: "power4.out",
            })

            playpause = true;
        }
    });

    //video custom cursor movement
    videoCont.addEventListener("mousemove", (dets) => {
        gsap.to(".mycursor", {
            opacity: 0,
        })

        const rect = videoCont.getBoundingClientRect();
        const x = dets.clientX - rect.left;
        const y = dets.clientY - rect.top;
        gsap.to(".video-cursor", {
            left: x - 70,
            top: y - 70,
        });
    })

    videoCont.addEventListener("mouseleave", () => {
        gsap.to(".mycursor", {
            opacity: 1,
        })

        gsap.to(".video-cursor", {
            top: "-1vw",
            left: "55vw",
        });
    })
}
myHomevideo();


/* Custom Cursor */
function customCursor() {

    mainBody.addEventListener("mousemove", (dets) => {
        gsap.to(".mycursor", {
            top: dets.y,
            left: dets.x,
        })
    })

    navUp.addEventListener("mousemove", (dets) => {
        gsap.to(".mycursor", {
            top: dets.y,
            left: dets.x,
        })
    })
}
customCursor();


/* Loader page */
var tl = gsap.timeline()
function myLoader() {
    // Prevent content flash FOUC
    gsap.set(".text-cont", {
        visibility: "visible"
    })

    // Loader - text animation
    tl.from(".text-cont h1", {
        y: 100,
        opacity: 0,
        duration: 0.5,
        delay: 0.7,
        stagger: 0.3,
        onStart: () => {
            gsap.to(".text-cont h1 sup", {
                opacity: 1
            })
        },
        onComplete: () => {
            gsap.to(".text-cont h3", {
                opacity: 1
            })
        }
    })

    // Loader - goes up
    tl.to(".text-cont", {
        opacity: 0,
        delay: 1.5,
        duration: 1.5,
        ease: "power2.out",
    })

    tl.to(".loader", {
        y: "-100%",
        duration: 1.5,
        ease: "power2.out",
    })

    // Loader - timer
    let loadTime = ''
    setInterval(() => {
        if (loadTime <= 100) {
            loadingValue.innerText = loadTime;
            loadTime++;
        }
    }, 30)

}
myLoader();


/* Navbar */
var tl2 = gsap.timeline()
function myNavbar() {
    // nav comes down
    menubtn1.addEventListener("click", () => {
        tl2.to(".navbar-up", {
            top: "0%",
            duration: 1,
        })

        tl2.to(".navup-l-dn h1, .navup-l-dn a, .navup-right , .ph-email", {
            y: 20,
            autoAlpha: 1,
            stagger: 0.1,
        });
    })

    // nav goes up
    menubtn2.addEventListener("click", () => {
        let tl3 = gsap.timeline()
        tl3.to(".navup-l-dn h1, .navup-l-dn a, .navup-right ,.ph-email", {
            y: -20,
            autoAlpha: 0,
            stagger: 0.1,
        });

        tl3.to(".navbar-up", {
            top: "-135%",
            duration: 1,
        })
    })

    // nav section
    navupLeftDown.forEach(val => {
        val.addEventListener("mouseenter", () => {
            gsap.to(val, {
                color: "transparent",
                duration: 0.5,
                ease: "power2.out",
                webkitTextStroke: "0.5px white",
                fontWeight: "100"
            });
        });

        val.addEventListener("mouseleave", () => {
            gsap.to(val, {
                color: "white",
                duration: 0.5,
                ease: "power2.out",
                webkitTextStroke: "0px white",
                fontWeight: "600"
            });
        });
    });
}
myNavbar();


/* Magnet effect */
function myMagnetEffect() {
    Shery.makeMagnet
        (".nav-l-l a svg , .nav-l-l i , .navup-l-up a svg , .navup-l-up i ,.navdn-right a , .navup-right a , .address h2 , .htl h2 , .p2-head h2 , .p3-head h2 , .p4-head h2 , .p4-head svg , .comp-contacts a , .c-address h2", {

        });
}
myMagnetEffect();


/* Homepage text */
function myHomepage() {
    //homepage text
    tl.from(".ht-r .htr h1 , .ht-r .htr h1 span", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
    }, "-=0.5")

    // flag animation
    document.addEventListener("mousemove", (dets) => {
        gsap.to(".flag", {
            top: dets.y - 200,
            left: dets.x,
        })
    })

    homeTextCont.addEventListener("mouseenter", () => {
        gsap.to(".mycursor", {
            opacity: 0,
        })
        gsap.to(".flag", {
            opacity: 1
        })
        gsap.to(".flagtextani h1 span , .flagtextani h1", {
            webkitTextStroke: "1px white",
            color: "transparent",
            fontWeight: "400",
            borderBottom: "none",
        })
    })

    homeTextCont.addEventListener("mouseleave", () => {
        gsap.to(".mycursor", {
            opacity: 1,
        })
        gsap.to(".flag", {
            opacity: 0
        })
        gsap.to(".flagtextani h1 span , .flagtextani h1", {
            webkitTextStroke: "none",
            color: "white",
            fontWeight: "500",
            borderBottom: "",
        })
    })
}
myHomepage();


/* Page 2 content box */
function myPage3Content() {
    // gooey effect - using shery js
    Shery.imageEffect(".img-cont", {
        style: 2,
        gooey: true,
        config: { "resolutionXY": { "value": 100 }, "distortion": { "value": true }, "mode": { "value": -10 }, "mousemove": { "value": 0 }, "modeA": { "value": 1 }, "modeN": { "value": 0 }, "speed": { "value": 1, "range": [-500, 500], "rangep": [-10, 10] }, "frequency": { "value": 50, "range": [-800, 800], "rangep": [-50, 50] }, "angle": { "value": 0.5, "range": [0, 3.141592653589793] }, "waveFactor": { "value": 2.25, "range": [-3, 3] }, "color": { "value": 10212607 }, "pixelStrength": { "value": 3, "range": [-20, 100], "rangep": [-20, 20] }, "quality": { "value": 5, "range": [0, 10] }, "contrast": { "value": 1, "range": [-25, 25] }, "brightness": { "value": 1, "range": [-1, 25] }, "colorExposer": { "value": 0.05, "range": [-5, 5] }, "strength": { "value": 0.2, "range": [-40, 40], "rangep": [-5, 5] }, "exposer": { "value": 8, "range": [-100, 100] }, "zindex": { "value": "80", "range": [-9999999, 9999999] }, "aspect": { "value": 0.8973323507737656 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.25, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 1 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.4, "range": [0, 2] }, "discard_threshold": { "value": 0.7, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } }
    });

    // circle animation
    contentCircle.forEach((val, idx) => {
        val.addEventListener("mouseenter", () => {
            if (idx === 0) {
                gsap.to(".box3-circle .circle-anim", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.out"
                })
            } else if (idx === 1) {
                gsap.to(".box4-circle .circle-anim", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.out"
                })
            } else if (idx === 2) {
                gsap.to(".box8-circle .circle-anim", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.out"
                })
            } else if (idx === 3) {
                gsap.to(".box10-circle", {
                    scale: 0.8,
                    duration: 0.7,
                    ease: "power2.out"
                })
            }
        })
    })

    contentCircle.forEach((val, idx) => {
        val.addEventListener("mouseleave", () => {
            if (idx === 0) {
                gsap.to(".box3-circle .circle-anim", {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                })
            } else if (idx === 1) {
                console.log("1 is out")
                gsap.to(".box4-circle .circle-anim", {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                })
            } else if (idx === 2) {
                gsap.to(".box8-circle .circle-anim", {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                })
            } else if (idx === 3) {
                gsap.to(".box10-circle", {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                })
            }
        })
    })
}
myPage3Content();


/* Page 3 marquee animation */
function myPage3Animation() {
    // for mobiles - autostart
    gsap.to(".item1", {
        transform: "translateX(-100%)",
        repeat: -1,
        duration: 20,
        ease: "none"
    })

    gsap.to(".item2", {
        transform: "translateX(100%)",
        repeat: -1,
        duration: 15,
        ease: "none"
    })

    gsap.to(".item1", {
        transform: "translateX(100%)",
        repeat: -1,
        duration: 20,
        ease: "none"
    })

    gsap.to(".item2", {
        transform: "translateX(-100%)",
        repeat: -1,
        duration: 15,
        ease: "none"
    })
    // for desktops
    window.addEventListener("wheel", (dets) => {
        if (dets.deltaY > 0) {
            gsap.to(".item1", {
                transform: "translateX(-100%)",
                repeat: -1,
                duration: 20,
                ease: "none"
            })

            gsap.to(".item2", {
                transform: "translateX(100%)",
                repeat: -1,
                duration: 15,
                ease: "none"
            })
        } else {
            gsap.to(".item1", {
                transform: "translateX(100%)",
                repeat: -1,
                duration: 20,
                ease: "none"
            })

            gsap.to(".item2", {
                transform: "translateX(-100%)",
                repeat: -1,
                duration: 15,
                ease: "none"
            })
        }
    })
}
myPage3Animation();


/* Using Scroll trigger over pages */
function myscrollTriggerText() {
    // page 1
    gsap.to(".nav-l-t , .navdn-right", {
        opacity: 0,
        ease: "pwer2.out",
        scrollTrigger: {
            trigger: ".navbar-dn",
            scroller: ".main",
            start: "top 0%",
            end: "top -20%",
            scrub: 2
        }
    })

    // media query - nav behaviour on diff width size
    function navResize() {
        if (window.innerWidth <= 650) {
            document.querySelector(".nav-l-l").removeAttribute('data-scroll-target');
        } else {
            document.querySelector(".nav-l-l").setAttribute('data-scroll-target', '.page1');
        }
    }
    window.addEventListener('resize', navResize);
    navResize();

    // page 2
    gsap.from(".p2-head h1", {
        opacity: 0,
        y: 50,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".p2-head h1",
            scroller: ".main",
            scrub: 2,
            end: "top 60%",
            start: "top 90%"
        }
    })

    document.querySelectorAll(".content h2").forEach((val) => {
        gsap.from(val, {
            opacity: 0,
            y: 30,
            ease: "power2.out",
            scrollTrigger: {
                trigger: val,
                scroller: ".main",
                scrub: 2,
                end: "top 60%",
                start: "top 90%"
            }
        })
    })

    document.querySelectorAll(".content .about").forEach((val) => {
        gsap.from(val, {
            opacity: 0,
            y: 30,
            ease: "power2.out",
            scrollTrigger: {
                trigger: val,
                scroller: ".main",
                scrub: 2,
                end: "top 70%",
                start: "top 90%"
            }
        })
    })

    document.querySelectorAll(".content-circle").forEach((val) => {
        gsap.from(val, {
            opacity: 0,
            duration: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: val,
                scroller: ".main",
                scrub: 2,
                end: "top 40%",
                start: "top 90%"
            }
        })
    })

    // page 3
    gsap.from(".p3-head h1", {
        opacity: 0,
        y: 50,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".p3-head h1",
            scroller: ".main",
            scrub: 2,
            end: "top 60%",
            start: "top 90%"
        }
    })

    gsap.from(".ab1 h2", {
        opacity: 0,
        y: 50,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".ab1 h2",
            scroller: ".main",
            scrub: 2,
            end: "top 70%",
            start: "top 90%"
        }
    })

    gsap.from(".ab2 h3", {
        opacity: 0,
        y: 50,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".ab2 h3",
            scroller: ".main",
            scrub: 2,
            end: "top 70%",
            start: "top 90%"
        }
    })

    gsap.from(".ws-head h4", {
        opacity: 0,
        y: 20,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".ws-head h4",
            scroller: ".main",
            scrub: 2,
            end: "top 80%",
            start: "top 90%"
        }
    })

    // page 4
    gsap.from(".p4-head h1", {
        opacity: 0,
        y: 20,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".p4-head h1",
            scroller: ".main",
            scrub: 2,
            end: "top 60%",
            start: "top 90%"
        }
    })

    gsap.from(".p4-head svg", {
        opacity: 0,
        y: 20,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".p4-head svg",
            scroller: ".main",
            scrub: 2,
            end: "top 60%",
            start: "top 90%"
        }
    })

    gsap.from(".comp-name a", {
        y: 10,
        opacity: 0,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".comp-name a",
            scroller: ".main",
            scrub: 2,
            start: "40% 100%",
            end: "50% 95%"
        }
    })
}
myscrollTriggerText();

/* Js code ends here */