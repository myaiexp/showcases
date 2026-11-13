// Rendering on demand: no animation loop, a frame is drawn only when something changed
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101418);
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
  camera.position.z = 2;

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-1, 2, 4);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.6));

  // The cubes never move, so nothing needs a per-frame update.
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const materials = [0x44aa88, 0x8844aa, 0xaa8844].map((color) => new THREE.MeshStandardMaterial({ color }));
  materials.forEach((material, i) => {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (i - 1) * 2;
    scene.add(cube);
  });

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';

  const counter = h('span', { class: 'count' }, '0');
  const readout = h('div', { class: 'readout' }, 'Frames rendered: ', counter);
  const wrap = h('div', { class: 'wrap' }, renderer.domElement, readout);
  el.append(wrap);

  let ready = false;
  let frames = 0;
  let renderRequested = false;
  let rafId = 0;

  function render(): void {
    renderRequested = false;
    // With damping on, update() keeps emitting 'change' until the motion settles.
    controls?.update();
    renderer.render(scene, camera);
    counter.textContent = String(++frames);
  }

  // Ask for a frame, but only one per animation frame however many changes arrive.
  function requestRenderIfNotRequested(): void {
    if (!ready || renderRequested) return;
    renderRequested = true;
    rafId = requestAnimationFrame(render);
  }

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h2 } = renderer.domElement;
    if (w === 0 || h2 === 0) return;
    renderer.setSize(w, h2, false);
    camera.aspect = w / h2;
    camera.updateProjectionMatrix();
    requestRenderIfNotRequested();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  let controls: OrbitControls | null = null;
  let timer = 0;
  let loopTimer = 0;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.addEventListener('change', requestRenderIfNotRequested);

    // For contrast: what a requestAnimationFrame loop would have drawn by now.
    const started = performance.now();
    const loopCount = h('span', { class: 'count' }, '0');
    readout.append(h('div', { class: 'loop' }, 'A continuous loop would be at ', loopCount));
    loopTimer = window.setInterval(() => {
      loopCount.textContent = String(Math.round(((performance.now() - started) / 1000) * 60));
    }, 250);
  } else {
    // No input in a card: nudge the camera now and then so a frame is still drawn.
    let angle = 0;
    timer = window.setInterval(() => {
      angle += 0.5;
      camera.position.set(Math.sin(angle) * 1.2, Math.cos(angle * 0.7) * 0.5, 2);
      camera.lookAt(0, 0, 0);
      requestRenderIfNotRequested();
    }, 900);
  }

  await renderer.init();
  ready = true;
  resize();
  render();

  return () => {
    cancelAnimationFrame(rafId);
    clearInterval(timer);
    clearInterval(loopTimer);
    observer.disconnect();
    controls?.dispose();
    geometry.dispose();
    materials.forEach((m) => m.dispose());
    renderer.dispose();
  };
};

export default mount;
