import * as Three from 'three';
import { ROTATE_X } from '.';

const SPEED = 0.003;
const CIRCLE_RADIUS = 5;

const origin = {
    x: 0,
    y: -2,
    z: -5
};

const ANGLE_COEFFICIENT = Math.PI * 2;

export default class Circle {
    constructor(index: number, total: number, scene: Three.Scene) {
        const circleGeometry = new Three.DodecahedronGeometry();
        const material = new Three.MeshPhongMaterial({ color: 0xefefef });

        this.circle = new Three.Mesh(circleGeometry, material);
        scene.add(this.circle);

        this.angle = (index * ANGLE_COEFFICIENT) / total;
        this.rotationX = Math.random() * 0.03 - 0.015;
        this.rotationZ = Math.random() * 0.03 - 0.015;

        this.circle.position.x = this.getPositionX();
        this.circle.position.y = origin.y;
        this.circle.position.z = this.getPositionZ();

        // rotate around x-axis as perspective is distorted due to camera
        this.circle.rotateX(ROTATE_X);

        console.log(this.circle.position);
    }

    getPositionX() {
        return origin.x + Math.sin(this.angle) * CIRCLE_RADIUS;
    }

    getPositionZ() {
        return origin.z + Math.cos(this.angle) * CIRCLE_RADIUS;
    }

    move() {
        this.angle += SPEED;

        this.circle.position.x = this.getPositionX();
        this.circle.position.z = this.getPositionZ();

        this.circle.rotation.x += this.rotationX;
        this.circle.rotation.y += this.rotationZ;
    }

    angle;
    circle;
    rotationX;
    rotationZ;
}
