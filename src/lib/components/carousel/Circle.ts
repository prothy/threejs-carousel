import * as Three from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { ANGLE_COEFFICIENT, CIRCLE_RADIUS, ROTATE_X, SPEED, ORIGIN } from './constants';

export default class Circle {
	constructor(
		index: number,
		total: number,
		scene: Three.Scene,
		Geometry: Partial<Three.PolyhedronGeometry>
	) {
		// @ts-ignore
		const geometry = new Geometry();
		const loader = new Three.TextureLoader();
		const crystalMap = loader.load('assets/crystal-map.jpg');
		// @ts-ignore
		// const rgbeLoader = new RGBELoader();
		const hdrEquirect = new RGBELoader().load('assets/sky-map.hdr', () => {
			hdrEquirect.mapping = Three.EquirectangularReflectionMapping;
		});
		this.material = new Three.MeshPhysicalMaterial({
			color: 0xefefef,
			transmission: 1,
			normalMap: crystalMap,
			envMap: hdrEquirect,
			roughness: 0.15,
			thickness: 1,
			iridescence: 0.5
		});
		this.mesh = new Three.Mesh(geometry, this.material);
		scene.add(this.mesh);

		this.angle = (index * ANGLE_COEFFICIENT) / total;
		this.rotationX = Math.random() * 0.03 - 0.015;
		this.rotationZ = Math.random() * 0.03 - 0.015;

		this.mesh.position.x = this.getPositionX();
		this.mesh.position.y = ORIGIN.y;
		this.mesh.position.z = this.getPositionZ();

		// rotate around x-axis as perspective is distorted due to camera
		this.mesh.rotateX(ROTATE_X);
	}

	getPositionX() {
		return ORIGIN.x + Math.sin(this.angle) * CIRCLE_RADIUS;
	}

	getPositionZ() {
		return ORIGIN.z + Math.cos(this.angle) * CIRCLE_RADIUS;
	}

	rotate() {
		this.mesh.rotation.x += this.rotationX;
		this.mesh.rotation.y += this.rotationZ;
	}

	move() {
		if (this.material.emissive.getHex() !== 0x000000) {
			this.material.emissive.set(0x000000);
		}
		this.angle += SPEED;

		this.mesh.position.x = this.getPositionX();
		this.mesh.position.z = this.getPositionZ();

		// @ts-ignore
		this.mesh.material.color.set(0xffffff);
	}

	angle: number;
	mesh: Three.Mesh;
	rotationX: number;
	rotationZ: number;
	material: Three.MeshPhysicalMaterial;
}
