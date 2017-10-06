const THREE = require('three');

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x46D1EF);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const direction = new THREE.Vector3(50, 40, 50).setLength(20);
camera.position.copy(direction);
camera.lookAt(new THREE.Vector3(0, 0, 0));

function render() {
	renderer.render(scene, camera);
};

function animate() {
	render();
	requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
});

const object = new THREE.Object3D();
scene.add(object);
object.position.set(-3 / 2, -8 / 2, 4 / 2);

function addCubeMesh(object, position, size, color) {
	const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
	const material = new THREE.MeshLambertMaterial({
		color: color
	});
	const mesh = new THREE.Mesh(geometry, material);
	object.add(mesh);
	mesh.position.x = position[0] + size[0] / 2;
	mesh.position.y = position[1] + size[1] / 2;
	mesh.position.z = position[2] - size[2] / 2;
}

addCubeMesh(object, [0, 1, 0], [3, 7, 4], 0xffffff);
addCubeMesh(object, [0, 1, 0], [3, 3, 6], 0xffffff);
addCubeMesh(object, [0.5, 1, 0], [2, 3, 6.5], 0xffffff);

// Beak
addCubeMesh(object, [1, 6, 1.5], [1, 1, 2], 0xFF8E65);
addCubeMesh(object, [1, 5.2, 1], [1, 0.8, 2], 0xC63744);

// Crown
addCubeMesh(object, [1, 8, -0.5], [1, 1, 2], 0xC63744);

// Wings
addCubeMesh(object, [3, 1.5, -0.5], [1, 2, 3], 0xffffff);
addCubeMesh(object, [3, 1.5, -0.5], [1, 2, 3], 0xffffff);

function makeFoot() {
	const foot = new THREE.Object3D();
	addCubeMesh(foot, [0, 0, 0], [0.5, 2, 0.5], 0xFF8E65);
	addCubeMesh(foot, [0.5, 0, 1.25], [0.5, 0.5, 2.25], 0xFF8E65);
	addCubeMesh(foot, [-0.5, 0, 1.25], [0.5, 0.5, 2.25], 0xFF8E65);
	addCubeMesh(foot, [-0.5, 0, 0.5], [1.5, 0.5, 1.5], 0xFF8E65);
	return foot;	
}

const leftFoot = makeFoot();
object.add(leftFoot);
leftFoot.position.set(1.25 + 1.25, -1, -2);

const rightFoot = makeFoot();
object.add(rightFoot);
rightFoot.position.set(-1.25 + 1.25, -1, -2);

addCubeMesh(object, [2, 6.5, -1], [1, 0.5, 0.5], 0x000000);
addCubeMesh(object, [0, 6.5, -1], [1, 0.5, 0.5], 0x000000);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
scene.add(directionalLight);

directionalLight.position.set(0.5, 1.0, 0.8);

const ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

animate();