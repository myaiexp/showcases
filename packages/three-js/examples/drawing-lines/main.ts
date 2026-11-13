// A Line built from Vector3 points with setFromPoints and a LineBasicMaterial, slowly rotating
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// Each shape is just a list of points; Line connects them in order.
const shapes: Record<string, () => THREE.Vector3[]> = {
  'Arrow (3 points)': () => [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 0, 0),
  ],
  'Circle (64 points)': () =>
    Array.from({ length: 65 }, (_, i) => {
      const a = (i / 64) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * 10, Math.sin(a) * 10, 0);
    }),
  'Zig-zag (9 points)': () =>
    Array.from({ length: 9 }, (_, i) => new THREE.Vector3(-16 + i * 4, i % 2 ? 6 : -6, 0)),
};

const mount: Mount = async (el, { preview }) => {
  // Camera as in the manual: narrow fov, far back, looking at the origin.
  const camera = new THREE.PerspectiveCamera(45, 1, 1, 500);
  camera.position.set(0, 0, 36);
  camera.lookAt(0, 0, 0);
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  // Lines need a line material, not a mesh material.
  const material = new THREE.LineBasicMaterial({ color: 0x4f8cff });
  let geometry = new THREE.BufferGeometry().setFromPoints(shapes['Arrow (3 points)']!());
  const line = new THREE.Line(geometry, material);
  scene.add(line);

  const state = { spin: true };
  let panel: HTMLElement | null = null;
  if (!preview) {
    const select = h('select', {}, ...Object.keys(shapes).map((n) => h('option', {}, n)));
    select.addEventListener('change', () => {
      // Build a new geometry from the new points and free the old one.
      const next = new THREE.BufferGeometry().setFromPoints(shapes[select.value]!());
      line.geometry = next;
      geometry.dispose();
      geometry = next;
    });
    const color = h('input', { type: 'color', value: '#4f8cff' });
    color.addEventListener('input', () => material.color.set(color.value));
    const spin = h('input', { type: 'checkbox', checked: '' });
    spin.addEventListener('change', () => (state.spin = spin.checked));
    panel = h(
      'div',
      { class: 'panel' },
      h('label', {}, 'Points ', select),
      h('label', {}, 'Colour ', color),
      h('label', {}, spin, ' Rotate'),
    );
    el.append(panel);
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

  let last = 0;
  renderer.setAnimationLoop((time) => {
    if (state.spin) line.rotation.y += (time - last) / 1500;
    last = time;
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    panel?.remove();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
