// Transparent canvas over HTML: clear alpha 0 lets the CSS background and text show through
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene(); // no scene.background: that would paint over the page
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
  camera.position.z = 2;
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-1, 2, 4);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.6));

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const cubes = [0x44aa88, 0x8844aa, 0xaa8844].map((color, i) => {
    // Half-transparent materials, so the text beneath reads through the cubes too.
    const material = new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.6 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (i - 1) * 2;
    scene.add(cube);
    return cube;
  });

  // alpha defaults to true; the clear alpha is what decides how see-through the empty areas are.
  const renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';

  const slider = h('input', { type: 'range', min: '0', max: '1', step: '0.05', value: '0' });
  const value = h('span', { class: 'val' }, '0.00');
  slider.addEventListener('input', () => {
    renderer.setClearAlpha(Number(slider.value));
    value.textContent = Number(slider.value).toFixed(2);
  });

  // The canvas sits in front of the HTML and ignores the pointer, so the text stays selectable.
  const backdrop = h(
    'div',
    { class: 'backdrop' },
    h('div', { class: 'content' }, h('h1', {}, 'Cubes-R-Us!'), h('p', {}, 'We make the best cubes!')),
    renderer.domElement,
  );
  el.append(backdrop);
  if (!preview) {
    el.append(
      h(
        'div',
        { class: 'panel' },
        h('label', {}, 'Clear alpha ', slider, ' ', value),
        h('span', { class: 'note' }, 'At 0 the page shows through; at 1 the clear colour (black) is opaque.'),
      ),
    );
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
    const t = time / 1000;
    cubes.forEach((cube, i) => {
      cube.rotation.x = t * (1 + i * 0.1);
      cube.rotation.y = t * (1 + i * 0.1);
    });
    if (preview) {
      // No slider in a card, so sweep the clear alpha up and down instead.
      const a = Math.max(0, Math.sin(t * 0.8)) * 0.8;
      renderer.setClearAlpha(a);
    }
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
