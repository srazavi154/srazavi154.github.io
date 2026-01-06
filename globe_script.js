// 1. DATA: Your Journey Locations
const journey = [
  {
    order: "01",
    city: "Baton Rouge, LA",
    lat: 30.4515,
    lng: -91.1871,
    desc: "Where the journey began. Louisiana taught me the value of community and the spark of early scientific curiosity.",
    img: "image/baton-rouge.jpg" // Make sure these images exist!
  },
  {
    order: "02",
    city: "Fairfax, VA",
    lat: 38.8462,
    lng: -77.3064,
    desc: "Moving to Virginia sharpened my focus. Here, I began diving deeper into the technical foundations that would lead me to engineering.",
    img: "image/fairfax.jpg"
  },
  {
    order: "03",
    city: "Pasadena, CA",
    lat: 34.1478,
    lng: -118.1445,
    desc: "The Caltech Chapter. Immersed in a world of rigorous robotics and biological engineering, I learned to build for the future.",
    img: "image/caltech.jpg"
  },
  {
    order: "04",
    city: "Fairfax, VA",
    lat: 38.8462,
    lng: -77.3064,
    desc: "Returning with a global perspective, ready to apply my research and engineering skills to real-world healthcare challenges.",
    img: "image/virginia-return.jpg"
  }
];

let currentIndex = 0;

// 2. INITIALIZE THE GLOBE
const world = Globe()
  (document.getElementById('globeViz'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg') // High-quality night view
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .showAtmosphere(true)
  .atmosphereColor('lightskyblue')
  .atmosphereDaylightAlpha(0.1);

// 3. SET INITIAL VIEW
world.pointOfView({ lat: journey[0].lat, lng: journey[0].lng, altitude: 2 }, 1000);

// 4. ADD MARKERS (The Cities)
world.pointsData(journey)
  .pointColor(() => '#ffffff')
  .pointRadius(0.5)
  .pointLabel('city');

// 5. FUNCTION TO MOVE TO NEXT DESTINATION
function nextDestination() {
  const prevIndex = currentIndex;
  currentIndex = (currentIndex + 1) % journey.length;
  
  const currentLoc = journey[currentIndex];
  const prevLoc = journey[prevIndex];

  // A. Move the Globe
  world.pointOfView({ 
    lat: currentLoc.lat, 
    lng: currentLoc.lng, 
    altitude: 1.8 
  }, 2000);

  // B. Draw Flight Arc
  const arcData = [{
    startLat: prevLoc.lat,
    startLng: prevLoc.lng,
    endLat: currentLoc.lat,
    endLng: currentLoc.lng,
    color: ['#ffffff', '#3688e0'] // White to Blue gradient
  }];

  world.arcsData([...world.arcsData(), ...arcData])
    .arcColor('color')
    .arcDashLength(0.4)
    .arcDashGap(4)
    .arcDashInitialGap(() => Math.random() * 5)
    .arcDashAnimateTime(1500)
    .arcStroke(0.5);

  // C. Update the UI Card with a Fade Effect
  const card = document.getElementById('journey-card');
  card.style.opacity = 0;
  
  setTimeout(() => {
    document.getElementById('chap-num').innerText = currentLoc.order;
    document.getElementById('city-title').innerText = currentLoc.city;
    document.getElementById('city-desc').innerText = currentLoc.desc;
    document.getElementById('city-img').src = currentLoc.img;
    card.style.opacity = 1;
  }, 500);
}

// Auto-resize globe on window change
window.addEventListener('resize', () => {
  world.width(window.innerWidth);
  world.height(window.innerHeight);
});
