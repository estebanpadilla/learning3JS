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

		hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
		hemiLight.color.setHSL(0.6, 1, 0.6);
		hemiLight.groundColor.setHSL(0.095, 1, 0.75);
		hemiLight.position.set(0, 50, 0);
		scene.add(hemiLight);

		hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
		scene.add(hemiLightHelper);


		dirLight = new THREE.DirectionalLight(0xffffff, 1);
		dirLight.color.setHSL(0.1, 1, 0.95);
		dirLight.position.set(-1, 1.75, 1);
		dirLight.position.multiplyScalar(30);
		scene.add(dirLight);

		dirLight.castShadow = true;

		dirLight.shadow.mapSize.width = 2048;
		dirLight.shadow.mapSize.height = 2048;

		var d = 50;

		dirLight.shadow.camera.left = -d;
		dirLight.shadow.camera.right = d;
		dirLight.shadow.camera.top = d;
		dirLight.shadow.camera.bottom = -d;

		dirLight.shadow.camera.far = 3500;
		dirLight.shadow.bias = - 0.0001;

		dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
		scene.add(dirLightHeper);

		// const ambientLight = new THREE.AmbientLight(color, 0.75);
		// scene.add(ambientLight);

		let grid = new Grid(scene, 100);
		let cameraControls = new CameraControls(camera, renderer.domElement);

		var helper = new THREE.CameraHelper(dirLight.shadow.camera);
		scene.add(helper);

	}

	function addCube() {
		var geometry = new THREE.BoxGeometry(10, 1, 10);
		var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		cube = new THREE.Mesh(geometry, material);
		cube.castShadow = true;
		cube.position.x = -10;
		cube.position.z = -30;
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
		for (let i = 0; i < 1; i++) {
			let dis = Math.random() * 5;
			let duck = new Duck(scene, new THREE.Vector3(Math.random() * dis, Math.random() * dis, Math.random() * dis));
			ducks.push(duck);
		}
	}

	function degressToRadians(degress) {
		return degress * (Math.PI / 180);
	}
}