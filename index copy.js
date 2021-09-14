import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  1500
);
camera.position.set(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const degToRad = 0.0174533; // degrees to radians conversion factor

// Background

const backgroundTexture = new THREE.TextureLoader().load('data/darkgrey.jpg');
scene.background = backgroundTexture;

// Lights

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


// Globe

const globeTexture = new THREE.TextureLoader().load(
  "/data/earth2.jpg"
);
const globe = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: globeTexture,
  })
);

globe.rotation.x = 15 * degToRad;
globe.rotation.y = -80 * degToRad;
globe.position.set(3, -2, -8);
scene.add(globe);

// Sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0xffc885 })
);
sun.position.set(35, -25, 20);
scene.add(sun);

const sunLight = new THREE.PointLight(0xffc885, 1);
sunLight.position.set(35, -25, 20);
scene.add(sunLight);


// Stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  let distance = 0,
    x,
    y,
    z;

  // do not allow stars closer than or farther than some distances
  while (distance < 100 || 200 < distance) {
    [x, y, z] = [...Array(3)].map(() => (Math.random() - 0.5) * 500);
    distance = Math.hypot(x, y, z);
  }

  star.position.set(x, y, z);
  scene.add(star);
  return star;
}

const stars = [...Array(8000)].map(() => addStar());

// Animation Loop

const rotationAxis = new THREE.Vector3( 0, Math.cos(15 * degToRad), Math.sin(15 * degToRad) );

const rotationAngle = 0.2 * degToRad;

function animate() {
  requestAnimationFrame(animate);

  stars.forEach((element) =>
    element instanceof THREE.Mesh
      ? element.position.applyAxisAngle(rotationAxis, 0.002 * degToRad)
      : element
  );

  sun.position.applyAxisAngle(rotationAxis, rotationAngle);
  sunLight.position.applyAxisAngle(rotationAxis, rotationAngle);

  globe.rotation.y += rotationAngle;

  renderer.render(scene, camera);
}

animate();

// Rsponsive Window Resizing

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
