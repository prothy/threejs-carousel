import * as Three from 'three';
import Circle from './Circle';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new Three.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const mainElement = document.querySelector('main');
mainElement?.appendChild(renderer.domElement);

// const axesHelper = new Three.AxesHelper(3);
// scene.add(axesHelper);

const CAMERA_Y = 2;
const CAMERA_Z = 4;
export const ROTATE_X = -Math.atan(CAMERA_Y / CAMERA_Z);

camera.position.y = CAMERA_Y;
camera.position.z = CAMERA_Z;

camera.rotateX(ROTATE_X);

const circles = Array(6).fill(null);

circles.map((_, index, array) => {
    array[index] = new Circle(index, circles.length, scene);
});

console.log(circles);

function animate() {
    requestAnimationFrame(animate);

    circles.forEach((circle) => {
        circle.move();
    });

    renderer.render(scene, camera);
}

animate();
