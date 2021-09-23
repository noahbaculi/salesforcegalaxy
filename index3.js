import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

// Setup

const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//   40,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1500
// );
// camera.position.set(0, 0, 0);

// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector("#bg"),
//   antialias: true,
// });
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 800; // move camera back to see cloud and stars
camera.position.y = window.innerHeight / 5;
camera.position.x = window.innerWidth / 5;

camera.rotation.x = -0.3; // angle the camera down slightly so stars move past towards the bottom

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const mainColor = 0x1e0329;
scene.fog = new THREE.FogExp2(mainColor, 0.001);
// renderer.setClearColor(scene.fog.color);

// Background

// const backgroundTexture = new THREE.TextureLoader().load('data/space1.jpg');
// backgroundTexture.minFilter = THREE.LinearFilter;
// scene.background = backgroundTexture;

// Rsponsive Window Resizing

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Lighting

const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

let directionalLight = new THREE.DirectionalLight(0xff8c19);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

let purpleLight = new THREE.PointLight(0x6035cc, 30, 500, 2);
purpleLight.position.set(200, 300, 100);
scene.add(purpleLight);
let redLight = new THREE.PointLight(0xd8547e, 50, 500, 2);
redLight.position.set(100, 300, 100);
scene.add(redLight);
let blueLight = new THREE.PointLight(0x3677ac, 40, 500, 2);
blueLight.position.set(300, 300, 200);
scene.add(blueLight);

// Cloud texture

let cloudParticles = [];

let loader = new THREE.TextureLoader();
loader.load("data/smoke.png", function (texture) {
  const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
  const cloudMaterial = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true,
  });

  for (let p = 0; p < 50; p++) {
    let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);

    let [x, y, z] = [
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
    ];
    cloud.position.set(x, y, z);
    cloud.rotation.x = -0.3;
    cloud.rotation.z = Math.random() * 2 * Math.PI;
    cloud.material.opacity = 0.55;
    cloudParticles.push(cloud);
    scene.add(cloud);
  }
});

// Stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.08, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  let distance = 0,
    x,
    y,
    z;

  // do not allow stars closer than or farther than some distances
  while (distance < 10 || 100 < distance) {
    [x, y, z] = [...Array(3)].map(() => (Math.random() - 0.5) * 500);
    distance = Math.hypot(x, y, z);
  }

  x += camera.position.x;
  y += camera.position.y;
  z += camera.position.z;

  star.position.set(x, y, z);
  scene.add(star);
  return star;
}

const stars = [...Array(800)].map(() => addStar());

// Animation loop
const rotationAxis = new THREE.Vector3(1, 2, -1);

function animate() {
  cloudParticles.forEach((p) => {
    p.rotation.z -= 0.0008;
  });

  // stars.forEach(element => (element instanceof THREE.Mesh) ?
  // element.position.applyAxisAngle(rotationAxis, 0.000035) : element);

  stars.forEach((star) => {
    if (star instanceof THREE.Mesh) {
      star.position.z += 0.1;
      if (star.position.z > camera.position.z) {
        star.position.z -= 200;
      }
    }
  });

  // stars.forEach((star) => {
  //   element.position.z += 0.1;
  // });

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// HTML links hover sound effect

const gridElements = document.getElementsByClassName("grid")[0];
const links = Array.prototype.slice.call(gridElements.children);
// console.log(links);


links.forEach((link) => {
  console.log(link.localName)
  if (link.localName === 'a') {
    
    const hoverSound = new Audio("data/spaceboom.wav"); // buffers automatically when created
    link.addEventListener(
      "mouseenter",
      function (event) {
        console.log("mouseenter");
        hoverSound.play();
      },
      false
    );
    // link.addEventListener(
    //   "mouseleave",
    //   function (event) {
    //     // hoverSound.pause();
    //   },
    //   false
    // );
  }
});
