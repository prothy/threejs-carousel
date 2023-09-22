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
const CIRCLE_RADIUS = 5;

const circleGeometry = new Three.CircleGeometry(0.8, 512);
const material = new Three.MeshBasicMaterial({ color: 0xefefef });

const origin = {
    x: 0,
    z: -5
};

const angleCoefficient = Math.PI * 2;

class Circle {
    constructor(index: number, total: number) {
        this.angle = (index * angleCoefficient) / total;
        this.circle = new Three.Mesh(circleGeometry, material);
        scene.add(this.circle);

        this.circle.position.x = this.getPositionX();
        this.circle.position.z = this.getPositionZ();

        console.log(this.circle.position.x, this.circle.position.z, this.angle);

        this.circle.rotateX(rotateX);
    }

    getPositionX() {
        return origin.x + Math.sin(this.angle) * CIRCLE_RADIUS;
    }

    getPositionZ() {
        return origin.z + Math.cos(this.angle) * CIRCLE_RADIUS;
    }

    move() {
        this.angle += SPEED;
        this.circle.position.x = Math.cos(this.angle) * CIRCLE_RADIUS;
        this.circle.position.z = -5 + Math.sin(this.angle) * CIRCLE_RADIUS;
    }

    angle;
    circle;
}

const circle1 = new Circle(0, 3);
const circle2 = new Circle(1, 3);
const circle3 = new Circle(2, 3);

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
