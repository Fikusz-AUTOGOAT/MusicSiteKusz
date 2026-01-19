import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { getHeightAt } from "./world.js";

const keys = {};
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

let yaw = 0;
let pitch = 0;
let walkTime = 0;

export function setupPlayer(scene, camera, renderer) {
    // BODY
    const body = new THREE.Group();

    const torso = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 1, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x5555ff })
    );
    torso.position.y = 1.5;
    body.add(torso);

    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.25),
        new THREE.MeshStandardMaterial({ color: 0xffccaa })
    );
    head.position.y = 2.2;
    body.add(head);

    const legL = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 1, 0.25),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    const legR = legL.clone();

    legL.position.set(-0.15, 0.5, 0);
    legR.position.set(0.15, 0.5, 0);
    body.add(legL, legR);

    scene.add(body);

    // KAMERA W GŁOWIE
    camera.position.set(0, 2.1, 0);
    body.add(camera);

    // MYSZ
    renderer.domElement.addEventListener("click", () => {
        renderer.domElement.requestPointerLock();
    });

    document.addEventListener("mousemove", e => {
        if (document.pointerLockElement) {
            yaw -= e.movementX * 0.002;
            pitch -= e.movementY * 0.002;
            pitch = Math.max(-1.5, Math.min(1.5, pitch));
        }
    });

    return function updatePlayer(delta) {
        body.rotation.y = yaw;
        camera.rotation.x = pitch;

        let moving = false;
        const dir = new THREE.Vector3();

        if (keys["w"]) dir.z -= 1;
        if (keys["s"]) dir.z += 1;
        if (keys["a"]) dir.x -= 1;
        if (keys["d"]) dir.x += 1;

        if (dir.length() > 0) {
            dir.normalize();
            dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
            body.position.add(dir.multiplyScalar(delta * 5));
            moving = true;
        }

        // DOPASOWANIE DO TERENU
        const groundY = getHeightAt(body.position.x, body.position.z);
        body.position.y = groundY;

        // ANIMACJA CHODZENIA
        if (moving) {
            walkTime += delta * 8;
            legL.rotation.x = Math.sin(walkTime) * 0.8;
            legR.rotation.x = Math.sin(walkTime + Math.PI) * 0.8;
        } else {
            legL.rotation.x *= 0.8;
            legR.rotation.x *= 0.8;
        }
    };
}
