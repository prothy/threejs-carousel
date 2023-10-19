import * as Three from 'three';
import Circle from './Circle';
import { CAMERA_Y, CAMERA_Z, CANVAS_HEIGHT, CANVAS_WIDTH, ROTATE_X } from './constants';
import Pointer from './Pointer';
import { objectConfigArray } from '$lib/config';

export function initializeCarousel() {
	const scene = new Three.Scene();
	const camera = new Three.PerspectiveCamera(50, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000);

	camera.position.y = CAMERA_Y;
	camera.position.z = CAMERA_Z;

	camera.rotateX(ROTATE_X);

	const color = 0xffffff;
	const intensity = 1.5;
	const directionalLight = new Three.DirectionalLight(color, intensity);
	const ambientLight = new Three.AmbientLight(color, 1);

	directionalLight.position.set(0, 10, 10);
	directionalLight.target.position.set(-5, 0, 0);
	scene.add(directionalLight);
	scene.add(directionalLight.target);

	ambientLight.position.set(0, 0, -5);
	scene.add(ambientLight);

	const renderer = new Three.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);

	const mainElement = document.querySelector('main') as HTMLCanvasElement;
	mainElement?.appendChild(renderer.domElement);

	const circles = Array(objectConfigArray.length).fill(null);

	circles.map((_, index, array) => {
		// @ts-ignore
		array[index] = new Circle(index, circles.length, scene, objectConfigArray[index].geometry);
	});

	const pointer = new Pointer(renderer, camera, scene, circles);

	mainElement?.addEventListener('mousemove', (ev) => {
		pointer.setPickPosition(ev);
	});

	mainElement?.addEventListener('mousedown', () => {
		console.log(pointer.getCurrentLink());
	});

	function handleCarouselAnimation(action: keyof Circle) {
		circles.forEach((circle) => {
			circle[action]?.();
		});
	}

	function animate() {
		requestAnimationFrame(animate);

		const intersects = pointer.handleIntersects();

		if (!intersects.length) {
			handleCarouselAnimation('move');
		}

		handleCarouselAnimation('rotate');

		renderer.render(scene, camera);
	}

	animate();
}
