import { objectConfigArray } from '$lib/config';
import type { ObjectConfig } from '$lib/config';
import type { WebGLRenderer } from 'three';
import * as Three from 'three';
import type Circle from './Circle';

const raycaster = new Three.Raycaster();

const pickPosition = {
	x: 0,
	y: 0
};

class Pointer {
	constructor(
		renderer: WebGLRenderer,
		camera: Three.Camera,
		scene: Three.Scene,
		circles: Circle[]
	) {
		this.renderer = renderer;
		this.camera = camera;
		this.scene = scene;
		this.circles = circles;
		this.activeObject = null;
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
		const intersects = raycaster.intersectObjects(this.circles.map((circle) => circle.mesh));

		this.circles.forEach((circle, index) => {
			const intersect = raycaster.intersectObject(circle.mesh);

			if (intersect.length) {
				// @ts-ignore
				intersect[0].object.material.color.set(0xff0000);
				this.activeObject = objectConfigArray[index];
			} else {
				// this.activeObject = null;
			}
		});

		return { activeObject: this.activeObject, isMouseOver: !!intersects.length };
	}

	getActiveObject(): ObjectConfig | null {
		return this.activeObject;
	}

	renderer: WebGLRenderer;
	camera: Three.Camera;
	scene: Three.Scene;
	circles: Circle[];
	activeObject: ObjectConfig | null;
}

export default Pointer;
