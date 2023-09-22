import * as Three from 'three';
import { ROTATE_X } from '.';

const SPEED = 0.01;
const CIRCLE_RADIUS = 5;

const origin = {
    x: 0,
    z: -5
};

const angleCoefficient = Math.PI * 2;

export default class Circle {
    constructor(index: number, total: number, scene: Three.Scene) {
        const circleGeometry = new Three.CircleGeometry(0.8, 512);
        const material = new Three.MeshBasicMaterial({ color: 0xefefef });

        this.circle = new Three.Mesh(circleGeometry, material);
        scene.add(this.circle);

        this.angle = (index * angleCoefficient) / total;

        const newColor = 0.8 + Math.cos(this.angle) * 0.2;
        this.circle.material.color.setRGB(newColor, newColor, newColor);

        console.log(this.angle, newColor);

        this.circle.position.x = this.getPositionX();
        this.circle.position.z = this.getPositionZ();

        // rotate around x-axis as perspective is distorted due to camera
        this.circle.rotateX(ROTATE_X);
    }

    getPositionX() {
        return origin.x + Math.sin(this.angle) * CIRCLE_RADIUS;
    }

    getPositionZ() {
        return origin.z + Math.cos(this.angle) * CIRCLE_RADIUS;
    }

    move() {
        this.angle += SPEED;

        const newColor = 0.6 + Math.cos(this.angle) * 0.4;
        this.circle.material.color.setRGB(newColor, newColor, newColor);

        this.circle.position.x = this.getPositionX();
        this.circle.position.z = this.getPositionZ();
    }

    angle;
    circle;
}
