let header = document.querySelector("header");
let scrollMonitor = document.createElement("div");
scrollMonitor.setAttribute("data-scroll", "");
header.before(scrollMonitor);

const scrolls = new IntersectionObserver((entries) => {
    header.classList.toggle("change-position", !entries[0].isIntersecting);
}, { rootMargin: "100px 0px 0px 0px" });
scrolls.observe(scrollMonitor);

const playBTN = document.querySelectorAll(".play");
const audio = new Audio();

let isplaying = false;
let currentPlayButton = null;

// Circular player elements
const circlePlayer = document.querySelector(".player");
const playPauseButton = document.getElementById("playPause");
const progressPath = document.getElementById("progress");

// Function to update the circular progress
function updateProgress(currentTime, duration) {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const progress = (currentTime / duration) * circumference;
    const dashOffset = circumference - progress;

    progressPath.setAttribute("d", describeArc(100, 100, radius, 0, (currentTime / duration) * 360));
}

// Function to describe an SVG arc
function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

// Update progress on time update
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        updateProgress(audio.currentTime, audio.duration);
    }
});

// Play/pause the audio using the circular player's button
playPauseButton.addEventListener("click", () => {
    if (isplaying) {
        audio.pause();
        isplaying = false;
        playPauseButton.textContent = "Play";
        if(currentPlayButton){
            currentPlayButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-btn" viewBox="0 0 16 16">
            <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
            </svg>
            `;
        }
    } else {
 if (audio.src) {
            audio.play();
            isplaying = true;
            playPauseButton.textContent = "Pause";
            if(currentPlayButton){
                currentPlayButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-btn" viewBox="0 0 16 16">
                <path d="M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1.0 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                </svg>
                `;
            }

        }
    }
});

playBTN.forEach((play) => {
    play.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-btn" viewBox="0 0 16 16">
    <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
    </svg>
    `;
    let musictitle = play?.dataset?.musicName;
    

    play.addEventListener("click", () => {
        if (currentPlayButton && currentPlayButton !== play) {
            currentPlayButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-btn" viewBox="0 0 16 16">
            <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 10 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
            </svg>
            `;
            currentPlayButton = null;
            audio.pause();
            isplaying = false;
            playPauseButton.textContent = "";
        }

        if (isplaying && currentPlayButton === play) {
            audio.pause();
            isplaying = false;
            play.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-btn" viewBox="0 0 16 16">
            <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
            </svg>
            `;
            currentPlayButton = null;
            playPauseButton.textContent = "Play";
        } else {
            audio.src = musictitle;
            audio.play();
            isplaying = true;
            play.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-btn" viewBox="0 0 16 16">
            <path d="M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
            </svg>
            `;
            currentPlayButton = play;
            playPauseButton.textContent = "Pause";
        }
    });
});

let sideNav = document.querySelector(".side-nav");
let bar = document.querySelectorAll(".bar");
let snt = document.querySelector(".side-nav-toggler");

snt.onclick = () => {
    sideNav.classList.toggle("open");
    bar[0].classList.toggle("bar1");
    bar[1].classList.toggle("bar2");
    bar[2].classList.toggle("bar3");
};

let form = document.querySelector("form");
let clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
    form.style.transform = "scale(0)";
});

document.querySelector(".search").onclick = () => {
    form.style.transform = "scale(1)";
};

document.querySelectorAll(".download").forEach((download) => {
    let downloadName = download.dataset.download;
    download.onclick = () => {
        let a = document.createElement("a");
        a.href = downloadName;
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
});

let love = document.querySelectorAll(".love-music");
let loveCount = document.querySelector(".love-count");
loveCount.innerHTML = 0;
love.forEach((love) => {
    let loveName = love.dataset.love;
    love.onclick = () => {
        let loves = JSON.parse(localStorage.getItem("loves")) || [];
        let index = loves.indexOf(loveName);
        if (index === -1) {
            loves.push(loveName);
            localStorage.setItem("loves", JSON.stringify(loves));
            let count = localStorage.getItem("count") || 0;
            count++;
            loveCount.innerHTML = count;
            localStorage.setItem("count", count);
        } else {
            loves.splice(index, 1);
            localStorage.setItem("loves", JSON.stringify(loves));
            let count = localStorage.getItem("count") || 0;
            count--;
            loveCount.innerHTML = count;
            localStorage.setItem("count", count);
        }
    };
});

loveCount.innerHTML = localStorage.getItem("count");



function p() {
    let colorarray = ["red", "blue", "#994420"];
    let colorRandom = Math.floor(Math.random() * colorarray.length);
    let pickColor = colorarray[colorRandom];
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 300,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#fff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 5,
                    "color": "#fff"
                }
            },
            "opacity": {
                "value": 0.2,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 10,
                    "size_min": 1
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 650,
                "color": "#974420",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                }
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": false
    });
}
p();

let date = new Date();
let year = date.getFullYear();
document.querySelector(".year").textContent = year;


// JavaScript to make the element draggable and persist position across page refreshes or revisits
const draggableElement = document.querySelector('.call');
let isDragging = false;
let offsetX, offsetY;

// Load the saved position from localStorage
const savedPosition = JSON.parse(localStorage.getItem('draggableElementPosition'));
if (savedPosition) {
    draggableElement.style.left = savedPosition.left + 'px';
    draggableElement.style.top = savedPosition.top + 'px';
} else {
    // Set initial position if not stored
    draggableElement.style.left = '50px';  // Set a default position if nothing is stored
    draggableElement.style.top = '50px';   // Set a default position if nothing is stored
}

// Desktop drag events
draggableElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - draggableElement.getBoundingClientRect().left;
    offsetY = e.clientY - draggableElement.getBoundingClientRect().top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

// Mobile touch events
draggableElement.addEventListener('touchstart', (e) => {
    isDragging = true;
    offsetX = e.touches[0].clientX - draggableElement.getBoundingClientRect().left;
    offsetY = e.touches[0].clientY - draggableElement.getBoundingClientRect().top;
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
});

// Mouse move event handler
function onMouseMove(e) {
    if (isDragging) {
        draggableElement.style.left = `${e.clientX - offsetX}px`;
        draggableElement.style.top = `${e.clientY - offsetY}px`;
        savePosition();
    }
}

// Touch move event handler
function onTouchMove(e) {
    if (isDragging) {
        draggableElement.style.left = `${e.touches[0].clientX - offsetX}px`;
        draggableElement.style.top = `${e.touches[0].clientY - offsetY}px`;
        savePosition();
    }
}

// Mouse up event handler
function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

// Touch end event handler
function onTouchEnd() {
    isDragging = false;
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
}

// Function to save the element's position in localStorage
function savePosition() {
    const position = {
        left: parseInt(draggableElement.style.left, 10),
        top: parseInt(draggableElement.style.top, 10)
    };
    localStorage.setItem('draggableElementPosition', JSON.stringify(position));
}


document.querySelectorAll("div").forEach(divs => {
   divs.setAttribute("data-aos", "zoom-in-right")
});
document.querySelectorAll(".bar").forEach(bars => {
   bars.setAttribute("data-aos", "");
   bars.style.transition = 500 + "ms"
});
document.querySelector(".side-nav").style.transition = 500 + "ms"
document.querySelectorAll(".w-a").forEach((wa) => {
   wa.setAttribute("data-aos", "")
})
  // Initialize AOS
  AOS.init({
    duration: 1000, // animation duration in milliseconds
    easing: 'ease-in-out', // animation easing function
    once: false, // whether animation should happen only once
  });


