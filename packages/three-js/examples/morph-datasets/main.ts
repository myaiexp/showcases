// Morph targets between datasets: one merged geometry, each dataset a morph target
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { DATASETS, makeDatasetGeometries } from './globe.ts';
import './style.css';

const DURATION = 1000; // ms per transition

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0e12);
  const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 20);
  camera.position.set(0, 1.2, 3.6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: !preview });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';

  const geometries = makeDatasetGeometries(preview ? 4 : 1.5);
  // The first geometry is the base; every dataset (including the first) becomes a target.
  // Each target must have the same vertex count as the base.
  const base = geometries[0] as THREE.BufferGeometry;
  base.morphAttributes.position = geometries.map((g) => g.getAttribute('position'));
  base.morphAttributes.color = geometries.map((g) => g.getAttribute('color'));

  const material = new THREE.MeshBasicMaterial({ vertexColors: true });
  const mesh = new THREE.Mesh(base, material);
  scene.add(mesh);
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.99, 32, 16), new THREE.MeshBasicMaterial({ color: 0x15202e }));
  scene.add(core);
  mesh.updateMorphTargets(); // creates morphTargetInfluences, one per target
  const influences = mesh.morphTargetInfluences as number[];
  influences.fill(0);
  influences[0] = 1;

  // The tween: remember where the influences were, and ease each toward 1 or 0.
  let from = influences.slice();
  let to = influences.slice();
  let startedAt = 0;
  let active = 0;
  const buttons: HTMLButtonElement[] = [];
  let controls: OrbitControls | null = null;

  function show(index: number, now = performance.now()): void {
    active = index;
    from = influences.slice();
    to = influences.map((_, i) => (i === index ? 1 : 0));
    startedAt = now;
    buttons.forEach((b, i) => b.classList.toggle('selected', i === index));
  }

  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    const row = h('div', { class: 'panel' }, h('span', {}, 'Dataset'));
    DATASETS.forEach((info, i) => {
      const b = h('button', { type: 'button' }, info.name);
      b.addEventListener('click', () => show(i));
      buttons.push(b);
      row.append(b);
    });
    el.append(renderer.domElement, row);
    show(0);
  } else {
    el.append(renderer.domElement);
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
  const cycle = preview ? window.setInterval(() => show((active + 1) % DATASETS.length), 2200) : 0;

  renderer.setAnimationLoop((time) => {
    const t = Math.min((performance.now() - startedAt) / DURATION, 1);
    const eased = t * t * (3 - 2 * t);
    influences.forEach((_, i) => {
      influences[i] = THREE.MathUtils.lerp(from[i] as number, to[i] as number, eased);
    });
    mesh.rotation.y = core.rotation.y = time / 6000;
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    clearInterval(cycle);
    observer.disconnect();
    controls?.dispose();
    geometries.forEach((g) => g.dispose());
    material.dispose();
    core.geometry.dispose();
    (core.material as THREE.Material).dispose();
    renderer.dispose();
  };
};

export default mount;
