class Duck {

    constructor(scene, position) {
        this.scene = scene;
        this.position = position;
        this.loader = new THREE.GLTFLoader();
        this.duckMesh = null;
        this.angle = 0;
        this.loadDuck(this);
    }

    loadDuck(duck) {

        // Load a glTF resource
        this.loader.load(
            // resource URL
            '3dModels/Duck.gltf',
            // called when the resource is loaded
            function (gltf) {
                duck.duckMesh = gltf.scenes[0].children[0].children[1];
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Scene
                gltf.scenes; // Array<THREE.Scene>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
                duck.completeLoad();

            },
            // called while loading is progressing
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error) {

                console.log('An error happened: ' + error);

            }
        );
    }

    completeLoad() {
        this.duckMesh.position.x = this.position.x;
        this.duckMesh.position.y = this.position.y;
        this.duckMesh.position.z = this.position.z;
        this.duckMesh.castShadow = true;
        this.duckMesh.receiveShadow = true;
        this.duckMesh.scale.x = 0.01;
        this.duckMesh.scale.y = 0.01;
        this.duckMesh.scale.z = 0.01;
        this.scene.add(this.duckMesh);
    }

    update() {
        if (this.duckMesh != null) {
            this.duckMesh.rotation.y = this.degressToRadians(this.angle);
            this.angle++;
        }
    }


    degressToRadians(degress) {
        return degress * (Math.PI / 180);
    }
}