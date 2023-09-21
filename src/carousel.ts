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

camera.position.z = 5;

let angle = 0;
const SPEED = 0.01;
const CIRCLE_SIZE = 9;

class Circle {
    constructor() {
        const circleGeometry = new Three.CircleGeometry(0.8, 512);
        const material = new Three.MeshBasicMaterial({ color: 0xefefef });
        this.circle = new Three.Mesh(circleGeometry, material);
        scene.add(this.circle);
    }

    move() {
        angle += SPEED;
        this.circle.position.x += Math.cos(angle) * SPEED * CIRCLE_SIZE * 1.2;
        this.circle.position.y += Math.sin(angle) * SPEED * CIRCLE_SIZE * 0.5;
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

    // circle.move();

    renderer.render(scene, camera);
}

animate();
