import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export function createPlayer(scene) {
    const player = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 1),
        new THREE.MeshStandardMaterial({ color: 0xffaa00 })
    );
    player.position.y = 1;
    scene.add(player);
    return player;
}
