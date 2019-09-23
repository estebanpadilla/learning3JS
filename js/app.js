/**
* @name app.js
* @file Add a small description for this file.
* @author Add Your Name Here <addyouremail@gmail.com>
* @version 1.0.0
*/

window.addEventListener('load', init, false);

function init() {
	console.log('Game running!');

	//Add Stats
	var stats = new Stats();
	stats.showPanel(0);
	document.body.appendChild(stats.dom);
	var camera = null;
	var scene;
	var renderer;
	var cube = null;
	var duck = null;
	var loader = new THREE.GLTFLoader();
	var requestId;
	var ducks = [];

	function update() {
		stats.begin();
		requestId = requestAnimationFrame(update);
		//Add here your game code that needs to be update every frame.
		//animateCube();

		if (camera != null) {
			renderer.render(scene, camera);

			ducks.forEach(duck => {
				duck.update();
			});
		}



		stats.end();
	}

	setup();
	addCube();
	loadDuck();
	update();

	function setup() {
		scene = new THREE.Scene();
		scene.background = new THREE.Color(0xf0f0f0);
		//scene = 0xffff00;

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		document.body.appendChild(renderer.domElement);

		const color = 0xffffff;
		const intensity = 0.25;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(10, 10, 10);
		light.castShadow = true;
		light.shadow.mapSize.width = 512;  // default
		light.shadow.mapSize.height = 512; // default
		light.shadow.camera.near = 0.5;    // default
		light.shadow.camera.far = 1000;
		scene.add(light);

		const ambientLight = new THREE.AmbientLight(color, 0.75);
		scene.add(ambientLight);

		let grid = new Grid(scene, 100);
		let cameraControls = new CameraControls(camera, renderer.domElement);
	}

	function addCube() {
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		cube = new THREE.Mesh(geometry, material);
		cube.castShadow = true;
		cube.position.z = 3;
		cube.position.y = 2;
		scene.add(cube);

		//console.log(cube);

		// camera.position.x = 5;
		//camera.rotation.y = Math.PI * 4;
	}

	var rotation = 0;
	function animateCube() {

		if (cube != null) {
			cube.rotation.x += 0.01;
			cube.rotation.z -= 0.01;
		}

		if (duck != null) {

			duck.rotation.y = degressToRadians(rotation);
			//duck.rotation.z += 0.01;
			rotation++;
		}
	}

	var dracoLoader = new THREE.DRACOLoader();
	dracoLoader.setDecoderPath('/js/libs/draco');
	loader.setDRACOLoader(dracoLoader);

	function loadDuck() {
		for (let i = 0; i < 10; i++) {
			let dis = i * 5;
			let duck = new Duck(scene, new THREE.Vector3(Math.random() * dis, Math.random() * dis, Math.random() * dis));
			ducks.push(duck);
		}
	}

	function degressToRadians(degress) {
		return degress * (Math.PI / 180);
	}
}