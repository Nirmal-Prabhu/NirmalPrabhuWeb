
//gorgeous mouse pointer animation

const canvas = document.getElementById('renderSurface');

let myFluid = new Fluid(canvas);



myFluid.mapBehaviors({
  sim_resolution: 128,
  dye_resolution: 1024,

  paused: false,
  embedded_dither: true,

  dissipation: .97,
  velocity: .98,
  pressure: .8,
  pressure_iteration: 20,
  curl: 0,
  emitter_size: 0.5,

  render_shaders: true,
  multi_color: true,

  render_bloom: false,
  bloom_iterations: 8,
  bloom_resolution: 256,
  intensity: 1.8,
  threshold: 0.6,
  soft_knee: 0.7,

  background_color: { r: 0, g: 0, b: 0 },
  transparent: false
});



myFluid.activate();

function splatPointer(event) {
    const { clientX: x, clientY: y } = event;
    const dx = (x / window.innerWidth) * 2 - 1;
    const dy = (y / window.innerHeight) * 2 - 1;
    myFluid.splat(x, y, dx, dy, 400);
}

window.addEventListener('pointermove', splatPointer);

//mouse poiniter script code ends 



const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector("h1").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 10);
}

// Scroll animation for sections
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, {
  threshold: 0.1 // Trigger when 10% of the section is visible
});

sections.forEach(section => {
  observer.observe(section);
});









