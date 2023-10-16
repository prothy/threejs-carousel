import * as Three from 'three';
import Circle from './Circle';
import { CAMERA_Y, CAMERA_Z, ROTATE_X } from './constants';
import Pointer from './Pointer';
import { circleConfigArray } from '../../../config';

export function initializeCarousel() {
	const scene = new Three.Scene();
	const camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

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
	renderer.setSize(window.innerWidth, window.innerHeight);

	const mainElement = document.querySelector('main') as HTMLCanvasElement;
	mainElement?.appendChild(renderer.domElement);

	const pointer = new Pointer(renderer, camera, scene);

	mainElement?.addEventListener('mousemove', (ev) => {
		pointer.setPickPosition(ev);
	});

	const circles = Array(circleConfigArray.length).fill(null);

	circles.map((_, index, array) => {
		// @ts-ignore
		array[index] = new Circle(index, circles.length, scene, circleConfigArray[index].geometry);
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
