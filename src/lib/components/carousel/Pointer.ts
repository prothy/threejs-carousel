import { WebGLRenderer } from 'three';
import * as Three from 'three';

const raycaster = new Three.Raycaster();

const pickPosition = {
	x: 0,
	y: 0
};

class Pointer {
	constructor(renderer: WebGLRenderer, camera, scene) {
		this.renderer = renderer;
		this.camera = camera;
		this.scene = scene;

		this.getCanvasRelativePosition.bind(this);
	}

	private getCanvasRelativePosition(event: MouseEvent) {
		const rect = this.renderer.domElement.getBoundingClientRect();

		return {
			x: ((event.clientX - rect.left) * this.renderer.domElement.width) / rect.width,
			y: ((event.clientY - rect.top) * this.renderer.domElement.height) / rect.height
		};
	}

	setPickPosition(event: MouseEvent) {
		const pos = this.getCanvasRelativePosition(event);

		pickPosition.x = (pos.x / this.renderer.domElement.width) * 2 - 1;
		pickPosition.y = (pos.y / this.renderer.domElement.height) * -2 + 1; // note we flip Y
	}

	handleIntersects() {
		raycaster.setFromCamera(pickPosition as Three.Vector2, this.camera);
		const intersects = raycaster.intersectObjects(this.scene.children);

		for (let i = 0; i < intersects.length; i++) {
			if (intersects.length) {
				// @ts-ignore
				intersects[i].object.material.color.set(0xff0000);
			}
		}

		return intersects;
	}

	renderer: WebGLRenderer;
	camera: Three.Camera;
	scene: Three.Scene;
}

export default Pointer;
