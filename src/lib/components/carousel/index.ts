import * as Three from 'three';
import Circle from './Circle';
import { CAMERA_Y, CAMERA_Z, CANVAS_HEIGHT, CANVAS_WIDTH, ROTATE_X } from './constants';
import Pointer from './Pointer';
import { objectConfigArray, type ObjectConfig } from '$lib/config';
import { degToRad } from 'three/src/math/MathUtils';

export function initializeCarousel(onClick: (object: ObjectConfig) => void) {
	const scene = new Three.Scene();
	const camera = new Three.PerspectiveCamera(50, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000);

	const mainElement = document.querySelector('main') as HTMLElement;

	// mainElement.

	const loader = new Three.TextureLoader();
	const bgTexture = loader.load('assets/bg.png');

	// TODO
	const bgGeometry = new Three.PlaneGeometry(38, 23);

	//TODO
	bgGeometry.rotateX(degToRad(325));
	const bgMaterial = new Three.MeshBasicMaterial({ map: bgTexture });
	const bgMesh = new Three.Mesh(bgGeometry, bgMaterial);
	bgMesh.position.set(0, -6.8, -10);
	bgTexture.colorSpace = Three.SRGBColorSpace;
	bgTexture.repeat.set(CANVAS_WIDTH / window.innerWidth, CANVAS_HEIGHT / window.innerHeight);

	// TODO
	// bgTexture.offset.set(0.2, 0.3);
	// scene.background = bgTexture;
	scene.add(bgMesh);

	camera.position.y = CAMERA_Y;
	camera.position.z = CAMERA_Z;

	camera.rotateX(ROTATE_X);

	const color = 0xffffff;
	const intensity = 1.5;
	const directionalLight = new Three.DirectionalLight(color, intensity);
	const ambientLight = new Three.AmbientLight(color, 1);

	directionalLight.position.set(camera.position.x, camera.position.y, camera.position.z);
	directionalLight.target.position.set(-5, 0, 0);
	// scene.add(directionalLight);
	// scene.add(directionalLight.target);

	ambientLight.position.set(0, 0, -5);
	// scene.add(ambientLight);

	const renderer = new Three.WebGLRenderer({
		// alpha: true,
		antialias: true
	});
	renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
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
		const activeObject = pointer.getActiveObject();

		if (!activeObject) {
			return;
		}

		onClick(activeObject);
	});

	function handleCarouselAnimation(action: keyof Circle) {
		circles.forEach((circle) => {
			circle[action]?.();
		});
	}

	function animate() {
		requestAnimationFrame(animate);

		const { isMouseOver } = pointer.handleIntersects();

		if (!isMouseOver) {
			handleCarouselAnimation('move');
		}

		handleCarouselAnimation('rotate');

		renderer.render(scene, camera);
	}

	animate();
}
