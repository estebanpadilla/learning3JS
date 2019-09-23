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

	window.addEventListener('keydown', arrowDown, false);

	function update() {
		stats.begin();
		requestId = requestAnimationFrame(update);
		//Add here your game code that needs to be update every frame.
		animateCube();

		if (camera != null) {
			renderer.render(scene, camera);
		}

		stats.end();
	}

	setup();
	//addCube();
	loadDuck();
	update();

	function setup() {
		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 0;
		camera.position.y = 5;
		camera.rotation.x = degressToRadians(-90);

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(0, 0, 10);
		scene.add(light);

		let grid = new Grid(scene, 100);
	}

	function addCube() {
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

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
		// Load a glTF resource
		loader.load(
			// resource URL
			'3dModels/Duck.gltf',
			// called when the resource is loaded
			function (gltf) {
				duck = gltf.scenes[0];

				scene.add(duck);

				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Scene
				gltf.scenes; // Array<THREE.Scene>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object
				console.log(gltf);

			},
			// called while loading is progressing
			function (xhr) {

				console.log((xhr.loaded / xhr.total * 100) + '% loaded');

			},
			// called when loading has errors
			function (error) {

				console.log('An error happened');

			}
		);
	}

	function degressToRadians(degress) {
		return degress * (Math.PI / 180);
	}

	function arrowDown(e) {
		switch (e.keyCode) {
			case 37:
				camera.position.x -= 1;
				break;
			case 38:
				camera.position.z += 1;
				break;
			case 39:
				camera.position.x += 1;
				break;
			case 40:
				camera.position.z -= 1;
				break;
			default:
				break;
		}
	}

}