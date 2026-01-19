import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export let ground;

export function createWorld(scene) {
    const size = 200;
    const segments = 100;

    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);

    const pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getY(i); // UWAGA: plane przed obrotem

        const height =
            Math.sin(x * 0.05) * 1.5 +
            Math.cos(z * 0.05) * 1.5 +
            Math.sin((x + z) * 0.02) * 2;

        pos.setZ(i, height);
    }

    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
        color: 0x2e7d32,
        flatShading: false
    });

    ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // DRZEWA
    for (let i = 0; i < 30; i++) {
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.4, 3),
            new THREE.MeshStandardMaterial({ color: 0x5d4037 })
        );

        const leaves = new THREE.Mesh(
            new THREE.SphereGeometry(1.6, 12, 12),
            new THREE.MeshStandardMaterial({ color: 0x1b5e20 })
        );

        const x = Math.random() * size - size / 2;
        const z = Math.random() * size - size / 2;
        const y = getHeightAt(x, z);

        trunk.position.set(x, y + 1.5, z);
        leaves.position.set(0, 2, 0);
        trunk.add(leaves);

        scene.add(trunk);
    }
}

// wysokość terenu
export function getHeightAt(x, z) {
    const raycaster = new THREE.Raycaster(
        new THREE.Vector3(x, 50, z),
        new THREE.Vector3(0, -1, 0)
    );
    const hit = raycaster.intersectObject(ground);
    return hit.length ? hit[0].point.y : 0;
}
