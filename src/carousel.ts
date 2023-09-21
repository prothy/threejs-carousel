import * as Three from 'three';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new Three.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const mainElement = document.querySelector('main');
mainElement?.appendChild(renderer.domElement);

const axesHelper = new Three.AxesHelper(3);
scene.add(axesHelper);

const CAMERA_Y = 3;
const CAMERA_Z = 5;
const rotateX = -Math.atan(CAMERA_Y / CAMERA_Z);

camera.position.y = CAMERA_Y;
camera.position.z = CAMERA_Z;

camera.rotateX(rotateX);

let angle = 0;
const SPEED = 0.01;
const CIRCLE_SIZE = 9;

const circleGeometry = new Three.CircleGeometry(0.8, 512);
const material = new Three.MeshBasicMaterial({ color: 0xefefef });

class Circle {
    constructor() {
        this.circle = new Three.Mesh(circleGeometry, material);
        scene.add(this.circle);

        this.circle.rotateX(rotateX);
        this.circle.rotateY(Math.atan(0));
        this.circle.rotateZ(Math.atan(0));
    }

    move() {
        angle += SPEED;
        this.circle.position.x += Math.cos(angle) * SPEED * CIRCLE_SIZE * 1.2;
        this.circle.position.z -= Math.sin(angle) * SPEED * CIRCLE_SIZE * 0.8;
    }

    circle;
}

const circle1 = new Circle();
const circle2 = new Circle();
const circle3 = new Circle();

const circles = [circle1, circle2, circle3]; // new Array<Circle>(1).map(() => new Circle());

function animate() {
    requestAnimationFrame(animate);

    circles.forEach((circle) => {
        circle.move();
    });

    renderer.render(scene, camera);
}

animate();
