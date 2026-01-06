const journey = [
  {
    city: "Baton Rouge, LA",
    lat: 30.4515, lng: -91.1871,
    desc: "Where it all began. Early roots in curiosity and community.",
    img: "image/baton-rouge.jpg"
  },
  {
    city: "Fairfax, VA",
    lat: 38.8462, lng: -77.3064,
    desc: "Moving East. Sharpening my technical focus and foundations.",
    img: "image/fairfax.jpg"
  },
  {
    city: "Pasadena, CA",
    lat: 34.1478, lng: -118.1445,
    desc: "Caltech: Where engineering met biology at the highest level.",
    img: "image/caltech.jpg"
  },
  {
    city: "Fairfax, VA",
    lat: 38.8462, lng: -77.3064,
    desc: "Applying Caltech research to solve real-world healthcare problems.",
    img: "image/virginia-return.jpg"
  }
];

let currentIndex = 0;
let isAnimating = false;

// 1. INITIALIZE THE GLOBE (Bright & Clean Theme)
const world = Globe()
  (document.getElementById('globeViz'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg') // Brighter texture
  .backgroundImageUrl(null) // Removes the black space background
  .backgroundColor('#ffffff') // Clean white background
  .showAtmosphere(true)
  .atmosphereColor('#3688e0')
  .atmosphereDaylightAlpha(0.2);

// Disable default zoom so scroll moves the story instead
world.controls().enableZoom = false;

// 2. SET INITIAL VIEW
world.pointOfView({ lat: journey[0].lat, lng: journey[0].lng, altitude: 2 }, 1000);

// 3. THE VIRAL TRAVEL LOGIC (Scroll to Move)
window.addEventListener('wheel', (event) => {
    if (isAnimating) return; // Prevent "double-jumping" cities

    if (event.deltaY > 0) {
        // Scrolling Down -> Next City
        if (currentIndex < journey.length - 1) {
            currentIndex++;
            updateJourney();
        }
    } else if (event.deltaY < 0) {
        // Scrolling Up -> Previous City
        if (currentIndex > 0) {
            currentIndex--;
            updateJourney();
        }
    }
});

function updateJourney() {
    isAnimating = true;
    const currentLoc = journey[currentIndex];
    const prevLoc = journey[currentIndex - 1] || journey[0];

    // Move Globe
    world.pointOfView({ 
        lat: currentLoc.lat, 
        lng: currentLoc.lng, 
        altitude: 1.8 
    }, 2000);

    // Draw the "Viral" Arc
    const arcData = [{
        startLat: prevLoc.lat,
        startLng: prevLoc.lng,
        endLat: currentLoc.lat,
        endLng: currentLoc.lng,
        color: ['#3688e0', '#000000'] 
    }];

    world.arcsData([...world.arcsData(), ...arcData])
        .arcDashLength(0.5)
        .arcDashGap(2)
        .arcDashAnimateTime(1000)
        .arcStroke(0.7);

    // Update the UI Card
    const card = document.getElementById('journey-card');
    card.style.opacity = 0;
    
    setTimeout(() => {
        document.getElementById('chap-num').innerText = `0${currentIndex + 1}`;
        document.getElementById('city-title').innerText = currentLoc.city;
        document.getElementById('city-desc').innerText = currentLoc.desc;
        document.getElementById('city-img').src = currentLoc.img;
        card.style.opacity = 1;
        isAnimating = false; // Release lock
    }, 800);
}
