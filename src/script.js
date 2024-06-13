//gorgeous mouse pointer animation

const canvas = document.getElementById('renderSurface');

let myFluid = new Fluid(canvas);



myFluid.mapBehaviors({
  sim_resolution: 128,
  dye_resolution: 2048,

  paused: false,
  embedded_dither: true,

  dissipation: .97,
  velocity: .98,
  pressure: 0.8,
  pressure_iteration: 20,
  fluid_color:[[10,0,0],[0,0,10]],
  curl: 0.5,
  emitter_size: 0.5,

  render_shaders: true,
  multi_color: true,

  render_bloom: false,
  bloom_iterations: 8,
  bloom_resolution: 256,
  intensity: 1.1,
  threshold: 10.6,
  soft_knee: 10.7,
  
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

document.querySelector(".intro-text").onmouseover = event => {  
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
  }, 30);
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

const wrapper = document.getElementById("wrapper");

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const uniqueRand = (min, max, prev) => {
  let next = prev;
  
  while(prev === next) next = rand(min, max);
  
  return next;
}

const combinations = [
  { configuration: 1, roundness: 1 },
  { configuration: 1, roundness: 2 },
  { configuration: 1, roundness: 4 },
  { configuration: 2, roundness: 2 },
  { configuration: 2, roundness: 3 },
  { configuration: 3, roundness: 3 }
];

let prev = 0;

let shapesinterval;


const startInterval = () => {
  shapesinterval = setInterval(() => {
    const index = uniqueRand(0, combinations.length - 1, prev),
          combination = combinations[index];
    
    wrapper.dataset.configuration = combination.configuration;
    wrapper.dataset.roundness = combination.roundness;
    
    prev = index;
  }, 3000);
};

// Start interval when page loads
startInterval();

wrapper.addEventListener('mouseenter', () => {
  clearInterval(shapesinterval);
});

wrapper.addEventListener('mouseleave', () => {
  startInterval();
});


//enlarge on hover

const shapes = document.querySelectorAll('.shape-container');
const label = document.getElementById('shape-label');

shapes.forEach((shape) => {
  shape.addEventListener('mouseenter', () => {
    label.textContent = shape.querySelector('.shape').dataset.label;
    label.style.display = 'block';
  });

  shape.addEventListener('mouseleave', () => {
    label.style.display = 'none';
  });
});






