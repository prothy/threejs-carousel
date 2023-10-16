import * as Three from 'three';
import { ANGLE_COEFFICIENT, CIRCLE_RADIUS, ROTATE_X, SPEED, ORIGIN } from '../constants';

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
        this.circle.position.y = ORIGIN.y;
        this.circle.position.z = this.getPositionZ();

        // rotate around x-axis as perspective is distorted due to camera
        this.circle.rotateX(ROTATE_X);

        console.log(this.circle.position);
    }

    getPositionX() {
        return ORIGIN.x + Math.sin(this.angle) * CIRCLE_RADIUS;
    }

    getPositionZ() {
        return ORIGIN.z + Math.cos(this.angle) * CIRCLE_RADIUS;
    }

    rotate() {
        this.circle.rotation.x += this.rotationX;
        this.circle.rotation.y += this.rotationZ;
    }

    move() {
        this.angle += SPEED;

        this.circle.position.x = this.getPositionX();
        this.circle.position.z = this.getPositionZ();

        this.circle.material.color.set(0xffffff);
    }

    angle;
    circle;
    rotationX;
    rotationZ;
}
