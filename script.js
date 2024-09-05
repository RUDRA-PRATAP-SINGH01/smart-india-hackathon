// document.addEventListener("DOMContentLoaded", function () {
//     // GSAP Animation for Loading Screen
//     const timeline = gsap.timeline();

//     timeline
//         // Animate the loading screen from bottom to top
//         .to("#loading", {
//             duration: 1.5,
//             y: "-100%",
//             ease: "power2.inOut"
//         })
//         // After the loading screen, show the main content
//         .to("#loading", {
//             display: "none",
//             onComplete: () => {
//                 document.getElementById("page1").style.display = "block";
//             }
//         })
//         // Move the LunArc text vertically
//         .fromTo(
//             ["#scroll-div h1", "#scroll-div2 h1", "#scroll-div3 h1"],
//             { y: 100, opacity: 0 },
//             { duration: 2, y: 0, opacity: 1, stagger: 0.2, ease: "power3.out" }
//         );
// });

// // Create a scene, camera, and renderer
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Load the GLTF model
// const loader = new THREE.GLTFLoader();
// loader.load('scene.gltf', (gltf) => {
//   const model = gltf.scene;
//   scene.add(model);

//   // Position and scale the model if needed
//   model.position.set(0, 0, 0);
//   model.scale.set(1, 1, 1);
// }, (xhr) => {
//   // Progress callback (optional)
//   console.log(`Model loading: ${xhr.loaded / xhr.total * 100}%`);
// }, (error) => {
//   // Error handling
//   console.error('An error occurred while loading the model:', error);
// });

// // Render the scene
// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }
// animate();



document.addEventListener("DOMContentLoaded", function () {
    // GSAP Animation for Loading Screen
    const timeline = gsap.timeline();

    timeline
        // Animate the loading screen from bottom to top
        .to("#loading", {
            duration: 1.5,
            y: "-100%",
            ease: "power2.inOut"
        })
        // After the loading screen, show the main content
        .to("#loading", {
            display: "none",
            onComplete: () => {
                document.getElementById("page1").style.display = "block";
            }
        })
        // Move the LunArc text vertically
        .fromTo(
            ["#scroll-div h1", "#scroll-div2 h1", "#scroll-div3 h1"],
            { y: 100, opacity: 0 },
            { duration: 2, y: 0, opacity: 1, stagger: 0.2, ease: "power3.out" }
        );
});

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Brightness
scene.add(ambientLight);

// Add Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load the GLTF model
const loader = new THREE.GLTFLoader();
loader.load('scene.gltf', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  // Position and scale the model if needed
  model.position.set(0, 0, 0);
  model.scale.set(1, 1, 1);

  // Ensure the model is centered
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);
  
}, (xhr) => {
  // Progress callback (optional)
  console.log(`Model loading: ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  // Error handling
  console.error('An error occurred while loading the model:', error);
});

// Update camera position to view the model
camera.position.set(0, 2, 5);  // Adjust as necessary

// Responsive resize
window.addEventListener('resize', function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
