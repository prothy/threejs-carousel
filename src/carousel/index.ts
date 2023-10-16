import * as Three from 'three';
import Circle from './Circle';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const color = 0xffffff;
const intensity = 1.5;
const directionalLight = new Three.DirectionalLight(color, intensity);
const ambientLight = new Three.AmbientLight(color, 1);

directionalLight.position.set(0, 10, 10);
directionalLight.target.position.set(-5, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

ambientLight.position.set(0, 0, -5);
scene.add(ambientLight);

const renderer = new Three.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const mainElement = document.querySelector('main') as HTMLCanvasElement;
mainElement?.appendChild(renderer.domElement);

// const axesHelper = new Three.AxesHelper(3);
// scene.add(axesHelper);

const CAMERA_Y = 7;
const CAMERA_Z = 10;

export const ROTATE_X = -Math.atan(CAMERA_Y / CAMERA_Z);

camera.position.y = CAMERA_Y;
camera.position.z = CAMERA_Z;

camera.rotateX(ROTATE_X);

const circles = Array(6).fill(null);

circles.map((_, index, array) => {
    array[index] = new Circle(index, circles.length, scene);
});

const raycaster = new Three.Raycaster();

function getCanvasRelativePosition(event: MouseEvent) {
    const rect = renderer.domElement.getBoundingClientRect();

    return {
        x: ((event.clientX - rect.left) * renderer.domElement.width) / rect.width,
        y: ((event.clientY - rect.top) * renderer.domElement.height) / rect.height
    };
}

const pickPosition = {
    x: 0,
    y: 0
};

function setPickPosition(event: MouseEvent) {
    const pos = getCanvasRelativePosition(event);

    pickPosition.x = (pos.x / renderer.domElement.width) * 2 - 1;
    pickPosition.y = (pos.y / renderer.domElement.height) * -2 + 1; // note we flip Y
}

mainElement?.addEventListener('mousemove', setPickPosition);

function animate() {
    requestAnimationFrame(animate);

    circles.forEach((circle) => {
        circle.move();
    });

    raycaster.setFromCamera(pickPosition as Three.Vector2, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
        console.log(intersects);
        if (intersects.length) {
            intersects[i].object.material.color.set(0xff0000);
            console.log('asdf');
        }
    }

    renderer.render(scene, camera);
}

animate();
