// Three cubes lit by a DirectionalLight, with sliders for the light's intensity and position
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { slider } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 5);
  camera.position.z = 3.5;

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  // Phong materials react to light. A MeshBasicMaterial would ignore it.
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const makeCube = (color: number, x: number): THREE.Mesh => {
    const cube = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color }));
    cube.position.x = x;
    scene.add(cube);
    return cube;
  };
  const cubes = [makeCube(0x44aa88, -2), makeCube(0x8844aa, 0), makeCube(0xaa8844, 2)];

  // A DirectionalLight shines from its position toward its target (the origin by default),
  // like the sun: every ray is parallel.
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-1, 2, 4);
  scene.add(light);

  if (!preview) {
    const lightX = slider({
      label: 'light.position.x',
      min: -5,
      max: 5,
      step: 0.1,
      value: light.position.x,
      onInput: (v) => (light.position.x = v),
      format: (v) => v.toFixed(1),
    });
    const lightY = slider({
      label: 'light.position.y',
      min: -5,
      max: 5,
      step: 0.1,
      value: light.position.y,
      onInput: (v) => (light.position.y = v),
      format: (v) => v.toFixed(1),
    });
    const intensity = slider({
      label: 'light.intensity',
      min: 0,
      max: 6,
      step: 0.1,
      value: light.intensity,
      onInput: (v) => (light.intensity = v),
      format: (v) => v.toFixed(1),
    });
    el.append(h('div', { class: 'panel' }, lightX.row, lightY.row, intensity.row));
  }

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h2 } = renderer.domElement;
    if (w === 0 || h2 === 0) return;
    renderer.setSize(w, h2, false);
    camera.aspect = w / h2;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    const t = time * 0.001;
    // Each cube spins slightly faster than the one before it.
    cubes.forEach((cube, i) => {
      const speed = 1 + i * 0.1;
      cube.rotation.x = t * speed;
      cube.rotation.y = t * speed;
    });
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    geometry.dispose();
    cubes.forEach((c) => (c.material as THREE.Material).dispose());
    renderer.dispose();
  };
};

export default mount;
