// Sun, earth and moon as nested Object3D nodes, with axes and grid helpers per node
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { checkbox } from './panel.ts';
import './style.css';

// An AxesHelper (local x/y/z lines) and a GridHelper (the local XZ plane) on one node.
// Drawn without depth testing so they stay visible through the spheres.
class AxisGridHelper {
  private axes = new THREE.AxesHelper();
  private grid: THREE.GridHelper;

  constructor(node: THREE.Object3D, units: number) {
    (this.axes.material as THREE.Material).depthTest = false;
    this.axes.renderOrder = 2; // after the grid, so the grid never paints over the axes
    node.add(this.axes);
    this.grid = new THREE.GridHelper(units, units);
    (this.grid.material as THREE.Material).depthTest = false;
    this.grid.renderOrder = 1;
    node.add(this.grid);
    this.visible = false;
  }

  set visible(v: boolean) {
    this.axes.visible = v;
    this.grid.visible = v;
  }

  dispose(): void {
    this.axes.dispose();
    this.grid.dispose();
  }
}

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
  // Look straight down on the orbital plane; +z is "up" on screen.
  camera.position.set(0, preview ? 40 : 50, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  scene.background = new THREE.Color(0x000000);
  el.append(renderer.domElement);

  scene.add(new THREE.PointLight(0xffffff, 500));

  // One low-poly sphere shared by all three bodies, so the spin is easy to see.
  const sphereGeometry = new THREE.SphereGeometry(1, 6, 6);
  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
  const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
  const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });

  // The graph: solarSystem > [sunMesh, earthOrbit > [earthMesh, moonOrbit > moonMesh]].
  // Orbits are empty Object3D nodes: they only exist to be offset and then rotated.
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);

  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(5, 5, 5);
  solarSystem.add(sunMesh);

  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 10;
  solarSystem.add(earthOrbit);
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthOrbit.add(earthMesh);

  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 2;
  earthOrbit.add(moonOrbit);
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moonMesh);

  // Rotating a node turns everything beneath it, so each of these spins its children too.
  const spinning = [solarSystem, sunMesh, earthOrbit, earthMesh, moonMesh];

  const nodes: [string, THREE.Object3D, number][] = [
    ['solarSystem', solarSystem, 25],
    ['sunMesh', sunMesh, 10],
    ['earthOrbit', earthOrbit, 10],
    ['earthMesh', earthMesh, 10],
    ['moonOrbit', moonOrbit, 10],
    ['moonMesh', moonMesh, 10],
  ];
  const helpers = nodes.map(([, node, units]) => new AxisGridHelper(node, units));

  let controls: OrbitControls | null = null;
  let timer = 0;
  if (preview) {
    // No panel in a card: step the helpers through the nodes so the local spaces show.
    let step = 0;
    timer = window.setInterval(() => {
      helpers.forEach((hp, i) => (hp.visible = i === step % helpers.length));
      step++;
    }, 1600);
  } else {
    controls = new OrbitControls(camera, renderer.domElement);
    const boxes = nodes.map(([name], i) =>
      checkbox(name, false, (on) => {
        const helper = helpers[i];
        if (helper) helper.visible = on;
      }),
    );
    el.append(h('div', { class: 'panel' }, ...boxes));
  }

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    const t = time * 0.001;
    spinning.forEach((obj) => (obj.rotation.y = t));
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    clearInterval(timer);
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    helpers.forEach((hp) => hp.dispose());
    sphereGeometry.dispose();
    sunMaterial.dispose();
    earthMaterial.dispose();
    moonMaterial.dispose();
    renderer.dispose();
  };
};

export default mount;
