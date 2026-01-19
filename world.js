import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function createWorld(scene) {
    // ziemia
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({ color: 0x228b22 })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // drzewa
    for (let i = 0; i < 30; i++) {
        const tree = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.5, 4),
            new THREE.MeshStandardMaterial({ color: 0x5b3a29 })
        );
        tree.position.set(
            Math.random() * 100 - 50,
            2,
            Math.random() * 100 - 50
        );
        scene.add(tree);
    }
}
