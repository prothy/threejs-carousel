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

const SPEED = 0.01;
const CIRCLE_SIZE = 5;

const circleGeometry = new Three.CircleGeometry(0.8, 512);
const material = new Three.MeshBasicMaterial({ color: 0xefefef });

class Circle {
    constructor(angle = 0) {
        this.angle = angle;
        this.circle = new Three.Mesh(circleGeometry, material);
        scene.add(this.circle);

        this.circle.position.x = this.getPositionX(this.angle);
        this.circle.position.z = this.getPositionZ(this.angle);

        console.log(this.circle.position.x, this.circle.position.z, this.angle);

        this.circle.rotateX(rotateX);
    }

    getPositionX(angle: number) {
        return Math.cos(angle) * SPEED * CIRCLE_SIZE;
    }

    getPositionZ(angle: number) {
        return -Math.sin(angle) * SPEED * CIRCLE_SIZE;
    }

    move() {
        this.angle += SPEED;
        this.circle.position.x += this.getPositionX(this.angle);
        this.circle.position.z += this.getPositionZ(this.angle);
    }

    angle;
    circle;
}

const circle1 = new Circle();
const circle2 = new Circle(1);
const circle3 = new Circle(2);

const circles = [circle1, circle2, circle3]; // new Array<Circle>(1).map(() => new Circle());

function animate() {
    requestAnimationFrame(animate);

    // circles.forEach((circle) => {
    //     circle.move();
    // });

    circle1.move();
    circle2.move();
    circle3.move();

    renderer.render(scene, camera);
}

animate();
