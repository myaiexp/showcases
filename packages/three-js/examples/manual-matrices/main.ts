// matrixAutoUpdate = false: Matrix4.compose writes a cube's matrix, decompose reads it back
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

type Params = Record<'px' | 'py' | 'rx' | 'ry' | 'rz' | 'sx' | 'sy' | 'sz' | 'shear', number>;

// [key, label, min, max, step]
const SLIDERS: [keyof Params, string, number, number, number][] = [
  ['px', 'position x', -2, 2, 0.05],
  ['py', 'position y', -1.5, 1.5, 0.05],
  ['rx', 'rotation x (rad)', -3.14, 3.14, 0.05],
  ['ry', 'rotation y (rad)', -3.14, 3.14, 0.05],
  ['rz', 'rotation z (rad)', -3.14, 3.14, 0.05],
  ['sx', 'scale x', 0.3, 2, 0.05],
  ['sy', 'scale y', 0.3, 2, 0.05],
  ['sz', 'scale z', 0.3, 2, 0.05],
  ['shear', 'shear xy (not decomposable)', 0, 1, 0.05],
];

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.5, 7);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(2, 4, 5);
  scene.add(sun);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const solidMaterial = new THREE.MeshStandardMaterial({ color: 0x4f8cff, roughness: 0.5 });
  const wireMaterial = new THREE.MeshBasicMaterial({ color: 0xffd23f, wireframe: true });

  // The solid cube is driven only by its matrix: position/quaternion/scale are ignored, and
  // updateMatrix() is never called because it would overwrite what compose() wrote.
  const manual = new THREE.Mesh(geometry, solidMaterial);
  manual.matrixAutoUpdate = false;
  // The wireframe cube gets back only what decompose() recovers and updates itself as usual.
  const decomposed = new THREE.Mesh(geometry, wireMaterial);
  scene.add(manual, decomposed);

  const params: Params = { px: 0, py: 0, rx: 0.4, ry: 0.6, rz: 0, sx: 1, sy: 1, sz: 1, shear: 0 };
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const shearMatrix = new THREE.Matrix4();
  const euler = new THREE.Euler();

  const readout = h('pre', { class: 'readout' });
  const apply = (): void => {
    position.set(params.px, params.py, 0);
    quaternion.setFromEuler(euler.set(params.rx, params.ry, params.rz));
    scale.set(params.sx, params.sy, params.sz);
    manual.matrix.compose(position, quaternion, scale);
    if (params.shear > 0) manual.matrix.multiply(shearMatrix.makeShear(params.shear, 0, 0, 0, 0, 0));
    manual.matrixWorldNeedsUpdate = true; // tell the renderer the matrix changed

    // Read the matrix back. A pure T*R*S matrix round-trips; a sheared one does not.
    manual.matrix.decompose(decomposed.position, decomposed.quaternion, decomposed.scale);
    if (preview) return;
    const e = manual.matrix.elements;
    const row = (r: number): string => [0, 1, 2, 3].map((c) => (e[c * 4 + r] ?? 0).toFixed(2).padStart(6)).join(' ');
    const p = decomposed.position;
    const s = decomposed.scale;
    readout.textContent =
      `matrix.elements (rows)\n${[0, 1, 2, 3].map(row).join('\n')}\n\n` +
      `decompose -> position ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${p.z.toFixed(2)}` +
      `  scale ${s.x.toFixed(2)} ${s.y.toFixed(2)} ${s.z.toFixed(2)}` +
      (params.shear > 0 ? '\nwireframe drifts from the solid: shear cannot be stored as position/quaternion/scale' : '');
  };
  apply();

  let panel: HTMLElement | null = null;
  if (!preview) {
    const rows = SLIDERS.map(([key, label, min, max, step]) => {
      const input = h('input', { type: 'range', min: String(min), max: String(max), step: String(step), value: String(params[key]) });
      input.addEventListener('input', () => {
        params[key] = Number(input.value);
        apply();
      });
      return h('label', {}, `${label} `, input);
    });
    panel = h('div', { class: 'panel' }, ...rows, readout);
    el.append(panel);
  }

  const resize = (): void => {
    const { clientWidth: w, clientHeight: hh } = renderer.domElement;
    if (w === 0 || hh === 0) return;
    renderer.setSize(w, hh, false);
    camera.aspect = w / hh;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);
  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    if (preview) {
      // No sliders in a card: sweep the parameters so the matrix visibly changes.
      const t = time / 1000;
      params.px = Math.sin(t) * 1.5;
      params.py = Math.cos(t * 0.7) * 0.8;
      params.ry = t * 0.8;
      params.sx = 1 + Math.sin(t * 1.3) * 0.5;
      params.shear = Math.max(0, Math.sin(t * 0.5));
      apply();
    }
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    panel?.remove();
    geometry.dispose();
    solidMaterial.dispose();
    wireMaterial.dispose();
    renderer.dispose();
  };
};

export default mount;
