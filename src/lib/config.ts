import * as Three from 'three';

export const routes = {
	SOLUTIONS: '/solutions',
	SOCIAL: '/social',
	STORY: '/story',
	TEST: '/test'
};

export type ObjectConfig = {
	name: string;
	link: string;
	geometry: typeof Three.DodecahedronGeometry;
};

export const objectConfigArray: ObjectConfig[] = [
	{
		name: 'Test 1',
		link: routes.TEST,
		geometry: Three.DodecahedronGeometry
	},
	{
		name: 'Test 2',
		link: routes.TEST,
		geometry: Three.IcosahedronGeometry
	},
	{
		name: 'Test 3',
		link: routes.TEST,
		geometry: Three.TetrahedronGeometry
	},
	{
		name: 'Test 4',
		link: routes.TEST,
		geometry: Three.OctahedronGeometry
	},
	{
		name: 'Test 5',
		link: routes.TEST,
		geometry: Three.DodecahedronGeometry
	},
	{
		name: 'Test 6',
		link: routes.TEST,
		geometry: Three.DodecahedronGeometry
	}
];
