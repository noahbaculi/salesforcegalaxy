import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls";

export function generateLesson(lessonData) {
  //
  // Setup

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    1500
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  //
  // Controls

  const controls = new OrbitControls(camera, renderer.domElement);

  switch (lessonData.size) {
    case 2:
      camera.position.setX(-200);
      camera.position.setY(10);
      controls.maxDistance = 400;
      break;

    case 3:
      camera.position.setX(-240);
      camera.position.setY(50);
      controls.maxDistance = 400;
      break;

    case 4:
      camera.position.setX(-280);
      camera.position.setY(80);
      controls.maxDistance = 400;
      break;

    case 5:
      camera.position.setX(-320);
      camera.position.setY(80);
      controls.maxDistance = 500;

    case 6:
      camera.position.setX(-400);
      camera.position.setY(100);
      controls.maxDistance = 600;
      break;

    default:
      camera.position.setX(-350);
      camera.position.setY(100);
      controls.maxDistance = 500;
  }

  //
  // Mouse interaction

  let lastMouseDownTime = 0;

  function calcIntersection(event) {
    // calculate mouse position in normalized device coordinates (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // identify the intersection of the closest object that intersects the cursor
    const intersection = raycaster.intersectObjects(scene.children)[0];

    return intersection;
  }

  let isMouseDown = false; // tracks whether the mouse button is down to prevent hover behavior when the camera orbit is being controlled

  function onMouseMove(event) {
    // revert all hoverable objects to the unhovered state
    allHoverableObjects.forEach((hoverableObject) => {
      hoverableObject.material.forEach((element) => {
        element.opacity = 1;
      });
    });

    const intersection = calcIntersection(event);
    if (
      typeof intersection !== "undefined" &&
      typeof intersection.object.userData.length !== "undefined" &&
      !isMouseDown
    ) {
      // reduce the opacity for all the intersection object materials
      intersection.object.material.forEach((element) => {
        element.opacity = 0.9;
      });

      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }

  window.addEventListener("mousemove", onMouseMove, false);

  function onMouseDown(event) {
    switch (event.which) {
      case 1:
        // Left Mouse button pressed

        const intersection = calcIntersection(event);

        // only process if there is an intersection and the intersection object has a
        // url in the userData attribute
        if (
          typeof intersection !== "undefined" &&
          typeof intersection.object.userData.length !== "undefined"
        ) {
          lastMouseDownTime = event.timeStamp;
        }

        isMouseDown = true;
    }
  }

  window.addEventListener("mousedown", onMouseDown, false);

  function onMouseUp(event) {
    const intersection = calcIntersection(event);

    // only process if there is an intersection, the intersection object has a
    // url in the userData attribute, and the last MouseDown event ocurred withinsome temporal
    // threshold
    const timeSinceMouseDown = event.timeStamp - lastMouseDownTime;
    if (
      typeof intersection !== "undefined" &&
      typeof intersection.object.userData.length !== "undefined" &&
      timeSinceMouseDown < 200
    ) {
      window.open(intersection.object.userData, "_blank").focus();

      // revert all hoverable objects to the unhovered state
      allHoverableObjects.forEach((hoverableObject) => {
        hoverableObject.material.forEach((element) => {
          element.opacity = 1;
        });
      });
    }

    isMouseDown = false;
  }

  window.addEventListener("mouseup", onMouseUp, false);

  //
  // Background
  // TODO test colored backgrounds with no image

  const backgroundTexture = new THREE.TextureLoader().load("/data/grey.jpg");
  scene.background = backgroundTexture;

  //
  // Lights

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xffffff); // Point light to add shadows and interest to geometries
  pointLight1.position.set(-250, 70, 300);
  const lightHelper1 = new THREE.PointLightHelper(pointLight1);
  scene.add(pointLight1, lightHelper1);

  //
  // Pages

  // Define the angles for the boxes for each number of boxes
  const allBoxAngles = new Map([
    [1, [0]],
    [2, [12, -12]],
    [3, [25, 0, -25]],
    [4, [30, 15, -15, -30]],
    [5, [50, 25, 0, -25, -50]],
    [6, [45, 30, 15, -15, -30, -45]],
  ]);

  // Define the positions for the boxes for each number of boxes
  const allBoxPositions = new Map([
    [1, [[50, 0, 0]]],
    [
      2,
      [
        [32, 0, -41],
        [32, 0, 41],
      ],
    ],
    [
      3,
      [
        [32, 0, -80],
        [50, 0, 0],
        [32, 0, 80],
      ],
    ],
    [
      4,
      [
        [0, 0, -119],
        [32, 0, -41],
        [32, 0, 41],
        [0, 0, 119],
      ],
    ],
    [
      5,
      [
        [-19, 0, -145],
        [32, 0, -80],
        [50, 0, 0],
        [32, 0, 80],
        [-19, 0, 145],
      ],
    ],
    [
      6,
      [
        [-51, 0, -186],
        [0, 0, -119],
        [32, 0, -41],
        [32, 0, 41],
        [0, 0, 119],
        [-51, 0, 186],
      ],
    ],
  ]);

  const boxGeo = new THREE.BoxGeometry(1, 115, 80);

  function creatPageMaterials(frontImage, sfBack = true) {
    const sidesTexture = new THREE.TextureLoader().load(
      "/data/pages/sides.jpg"
    );
    const sidesMaterial = new THREE.MeshBasicMaterial({ map: sidesTexture });
    sidesMaterial.transparent = true;

    const frontTexture = new THREE.TextureLoader().load(frontImage);
    const frontMaterial = new THREE.MeshBasicMaterial({ map: frontTexture });
    frontMaterial.transparent = true;

    let backTexture, backMaterial;
    if (sfBack) {
      // if the page materials should include a back with the Salesforce logo
      backTexture = new THREE.TextureLoader().load("/data/pages/back.png");
      backMaterial = new THREE.MeshBasicMaterial({ map: backTexture });
    } else {
      backMaterial = sidesMaterial;
    }
    backMaterial.transparent = true;

    return [
      backMaterial,
      frontMaterial,
      sidesMaterial,
      sidesMaterial,
      sidesMaterial,
      sidesMaterial,
    ];
  }

  //
  // Page box geometries

  const degToRad = 0.0174533; // degrees to radians conversion factor
  let allHoverableObjects = [];

  function createPage(frontImage, linkURL, position, angle) {
    const box = new THREE.Mesh(boxGeo, creatPageMaterials(frontImage));
    box.position.set(...position);
    box.rotation.set(0, angle * degToRad, 0);
    box.userData = linkURL;
    scene.add(box);
    allHoverableObjects.push(box);
  }

  const boxAngles = allBoxAngles.get(lessonData.size);
  const boxPositions = allBoxPositions.get(lessonData.size);

  let index = 0;
  lessonData.forEach((url, image) => {
    const box = new THREE.Mesh(boxGeo, creatPageMaterials(image));
    box.position.set(...boxPositions[index]);
    box.rotation.set(0, boxAngles[index] * degToRad, 0);
    box.userData = url;
    scene.add(box);
    allHoverableObjects.push(box);

    index += 1;
  });

  //
  // Credit board

  const creditBoxGeo = new THREE.BoxGeometry(1, 40, 80);
  const creditBoxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const creditBox = new THREE.Mesh(
    creditBoxGeo,
    creatPageMaterials("/data/credit.png", false)
  );
  creditBox.position.set(50, 180, 0);
  creditBox.rotation.set(0, 0, 50 * degToRad);
  creditBox.userData = "https://noahbaculi.com";
  scene.add(creditBox);

  allHoverableObjects.push(creditBox);

  //
  // Stars

  function addStar() {
    const geometry = new THREE.SphereGeometry(0.5, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xfaa73c });
    const star = new THREE.Mesh(geometry, material);

    let distance = 0,
      x,
      y,
      z;

    // do not allow stars closer than or farther than some distances
    while (distance < 260 || 500 < distance) {
      [x, y, z] = [...Array(3)].map(() => (Math.random() - 0.5) * 800);
      distance = Math.hypot(x, y, z);
    }

    star.position.set(x, y, z);
    scene.add(star);
    return star;
  }

  const stars = [...Array(3000)].map(() => addStar());

  //
  // Animation Loop

  const rotationAxis = new THREE.Vector3(1, 2, -1);

  function animate() {
    requestAnimationFrame(animate);

    stars.forEach((element) =>
      element instanceof THREE.Mesh
        ? element.position.applyAxisAngle(rotationAxis, 0.002 * degToRad)
        : element
    );

    controls.update();

    renderer.render(scene, camera);
  }

  animate();

  //
  // Rsponsive Window Resizing

  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
