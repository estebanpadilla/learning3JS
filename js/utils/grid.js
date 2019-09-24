class Grid {
    constructor(scene, size) {

        var start = size * -1;
        var color = null;

        // for (let i = start; i <= size; i++) {

        //     if (i == 0) {
        //         color = 0x888A85;
        //     } else {
        //         color = 0x555753;
        //     }

        //     var material = new THREE.LineBasicMaterial({ color: color });

        //     var geometry = new THREE.Geometry();
        //     geometry.vertices.push(new THREE.Vector3(start, 0, i));
        //     geometry.vertices.push(new THREE.Vector3(size, 0, i));
        //     var line = new THREE.Line(geometry, material);
        //     scene.add(line);

        //     geometry = new THREE.Geometry();
        //     geometry.vertices.push(new THREE.Vector3(i, 0, start));
        //     geometry.vertices.push(new THREE.Vector3(i, 0, size));
        //     line = new THREE.Line(geometry, material);
        //     scene.add(line);

        // }

        var axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);


        // ground
        var groundMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(100, 100),
            new THREE.MeshPhongMaterial({
                color: 0x999999,
                depthWrite: false
            })
        );

        groundMesh.rotation.x = - Math.PI / 2;
        groundMesh.receiveShadow = true;
        scene.add(groundMesh);


        var helper = new THREE.GridHelper(size, size);
        helper.position.y = 0;
        helper.material.opacity = 0.25;
        helper.material.transparent = true;
        scene.add(helper);
    }

    degressToRadians(degress) {
        return degress * (Math.PI / 180);
    }
}