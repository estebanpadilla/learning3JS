class Grid {
    constructor(scene, size) {

        var start = size * -1;
        var color = null;

        for (let i = start; i <= size; i++) {

            if (i == 0) {
                color = 0x00ff00;
            } else {
                color = 0xff0000;
            }

            var material = new THREE.LineBasicMaterial({ color: color });

            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(start, 0, i));
            geometry.vertices.push(new THREE.Vector3(size, 0, i));
            var line = new THREE.Line(geometry, material);
            scene.add(line);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(i, 0, start));
            geometry.vertices.push(new THREE.Vector3(i, 0, size));
            line = new THREE.Line(geometry, material);
            scene.add(line);
        }
    }
}