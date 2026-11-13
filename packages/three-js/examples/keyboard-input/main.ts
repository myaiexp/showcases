// Keyboard input on a canvas: tabindex makes it focusable so arrow keys reach it
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

const BOUND = 3.2;
const SPEED = 3; // world units per second
const ARROWS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101418);
  const camera = new THREE.PerspectiveCamera(50, 2, 0.1, 50);
  camera.position.set(0, 6, 5);
  camera.lookAt(0, 0, 0);
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-2, 5, 3);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.6));
  const grid = new THREE.GridHelper(BOUND * 2, 8, 0x667788, 0x334455);
  scene.add(grid);

  const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 0.4;
  scene.add(cube);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  const canvas = renderer.domElement;
  canvas.className = 'stage';
  // A canvas only receives key events when it can take focus. tabindex="0" does that;
  // the CSS removes the browser's focus outline (we draw our own border instead).
  canvas.tabIndex = 0;

  const status = h('div', { class: 'status' }, 'Click the canvas, then use the arrow keys');
  el.append(h('div', { class: 'wrap' }, canvas, status));

  const held = new Set<string>();
  const onFocus = (): void => {
    status.textContent = 'Focused: arrow keys move the cube';
  };
  const onBlur = (): void => {
    held.clear();
    status.textContent = 'Lost focus: click the canvas, then use the arrow keys';
  };
  const onKeyDown = (e: KeyboardEvent): void => {
    if (!(e.key in ARROWS)) return;
    e.preventDefault(); // keep the page from scrolling
    held.add(e.key);
  };
  const onKeyUp = (e: KeyboardEvent): void => {
    held.delete(e.key);
  };
  if (!preview) {
    canvas.addEventListener('focus', onFocus);
    canvas.addEventListener('blur', onBlur);
    canvas.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('keyup', onKeyUp);
  } else {
    status.textContent = 'Arrow keys move the cube';
    canvas.classList.add('focused');
  }

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = canvas;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  await renderer.init();
  resize();

  // Preview: a timer plays the part of a key press, cycling through the four arrows.
  const names = Object.keys(ARROWS);
  let step = 0;
  const timer = preview
    ? window.setInterval(() => {
        held.clear();
        held.add(names[step++ % names.length] as string);
        if (step % 2 === 0) held.add(names[(step + 1) % names.length] as string);
      }, 700)
    : 0;

  let last = 0;
  renderer.setAnimationLoop((time) => {
    const dt = last ? Math.min((time - last) / 1000, 0.1) : 0;
    last = time;
    for (const key of held) {
      const [dx, dz] = ARROWS[key] as [number, number];
      cube.position.x = THREE.MathUtils.clamp(cube.position.x + dx * SPEED * dt, -BOUND, BOUND);
      cube.position.z = THREE.MathUtils.clamp(cube.position.z + dz * SPEED * dt, -BOUND, BOUND);
    }
    cube.rotation.y += (held.size ? 3 : 0) * dt;
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    clearInterval(timer);
    canvas.removeEventListener('focus', onFocus);
    canvas.removeEventListener('blur', onBlur);
    canvas.removeEventListener('keydown', onKeyDown);
    canvas.removeEventListener('keyup', onKeyUp);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    grid.dispose();
    renderer.dispose();
  };
};

export default mount;
