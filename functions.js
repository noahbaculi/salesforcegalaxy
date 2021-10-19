import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls";

export function generateLesson(
  lessonData,
  bgColor = 0x404040,
  starColor = 0xfaa73c
) {
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
  // Add body on-load opacity cue for CSS animation
  const DOMbody = document.body;
  DOMbody.setAttribute("onload", "document.body.style.opacity='1'");

  //
  // Home and Help icons

  const homeLink = document.createElement("a");
  homeLink.setAttribute("href", "/index.html");
  homeLink.classList.add("home-link");
  document.getElementsByTagName("body")[0].appendChild(homeLink);

  const homeImg = document.createElement("img");
  homeImg.setAttribute("src", "/data/home.png");
  homeImg.setAttribute("alt", "Home");
  homeImg.classList.add("home-icon");
  homeLink.appendChild(homeImg);

  const helpImg = document.createElement("img");
  helpImg.setAttribute("src", "/data/help.png");
  helpImg.setAttribute("alt", "Help");
  helpImg.classList.add("help-icon");
  document.getElementsByTagName("body")[0].appendChild(helpImg);

  //
  // Help modal

  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal");
  document.getElementsByTagName("body")[0].appendChild(modalDiv);

  const modalContentDiv = document.createElement("div");
  modalContentDiv.classList.add("modal-content");
  modalDiv.appendChild(modalContentDiv);

  const modalClose = document.createElement("p");
  modalClose.classList.add("close-modal");
  const closeNode = document.createTextNode("✖");
  modalClose.appendChild(closeNode);
  modalContentDiv.appendChild(modalClose);

  const modalText = document.createElement("p");
  modalText.id = "modal-text";
  modalContentDiv.appendChild(modalText);
  $("#modal-text").load("/lesson-modal.html");

  // Show lesson help modal if it has not been viewed before
  if (!localStorage.getItem("lessonHelpPreviouslyViewed")) {
    modalDiv.style.display = "flex";
  }

  // When the user clicks on the button, open the modal
  helpImg.onclick = function () {
    modalDiv.style.display = "flex";
  };

  // When the user clicks on <span> (x), close the modal
  modalClose.onclick = function () {
    localStorage.setItem("lessonHelpPreviouslyViewed", true);
    modalDiv.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modalDiv) {
      localStorage.setItem("lessonHelpPreviouslyViewed", true);
      modalDiv.style.display = "none";
    }
  };

  //
  // Controls

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_ROTATE,
  };
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE,
  };

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
    // do not execute if the modal is displayed
    if (modalDiv.style.display == "flex") {
      return;
    }

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
    // do not execute if the modal is displayed
    if (modalDiv.style.display == "flex") {
      return;
    }

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
    // do not execute if the modal is displayed
    if (modalDiv.style.display == "flex") {
      return;
    }

    const intersection = calcIntersection(event);

    // only process if there is an intersection, the intersection object has a
    // url in the userData attribute, and the last MouseDown event ocurred
    // within some temporal threshold
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

  try {
    scene.background = new THREE.Color(bgColor);
  } catch (error) {
    scene.background = new THREE.Color(0x404040);
  }

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

  let starMaterial;
  try {
    starMaterial = new THREE.MeshStandardMaterial({ color: starColor });
  } catch (error) {
    starMaterial = new THREE.MeshStandardMaterial({ color: 0xfaa73c });
  }

  function addStar(starMaterial) {
    const starGeometry = new THREE.SphereGeometry(0.5, 24, 24);
    const star = new THREE.Mesh(starGeometry, starMaterial);

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

  const stars = [...Array(3000)].map(() => addStar(starMaterial));

  //
  // Animation Loop

  const rotationVector = [...Array(3)].map(() => Math.random() * (1 - -1) + -1); // generate a random rotation vector with elements between -1 and 1
  const rotationAxis = new THREE.Vector3(...rotationVector);

  function animate() {
    requestAnimationFrame(animate);

    stars.forEach((element) =>
      element instanceof THREE.Mesh
        ? element.position.applyAxisAngle(rotationAxis, 0.003 * degToRad)
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
