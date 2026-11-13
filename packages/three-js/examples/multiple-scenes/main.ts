// One WebGPURenderer drawing three scenes into the rectangles of three HTML elements
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import './style.css';

interface Panel {
  elem: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  update: (time: number) => void;
}

const mount: Mount = async (el, { preview }) => {
  const disposables: { dispose(): void }[] = [];

  // One scene per "virtual canvas": its own light, camera and background.
  const makePanel = (
    name: string,
    background: number,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
  ): Panel => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(background);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
    camera.position.set(0, 1, 2.6);
    camera.lookAt(0, 0, 0);
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-1, 2, 4);
    scene.add(light, new THREE.AmbientLight(0xffffff, 0.6));
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    disposables.push(geometry, material);
    const elem = h('div', { class: 'diagram' }, h('span', {}, name));
    return { elem, scene, camera, update: (t) => (mesh.rotation.y = t * 0.6) };
  };

  const panels: Panel[] = [
    makePanel('Box', 0x3b1f1f, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xe63946 })),
    // A sphere with 4x2 segments is the manual's "pyramid".
    makePanel('Diamond', 0x1f2a3b, new THREE.SphereGeometry(0.8, 4, 2), new THREE.MeshStandardMaterial({ color: 0x3a6ea5, flatShading: true })),
    makePanel('Knot', 0x1f3b2c, new THREE.TorusKnotGeometry(0.5, 0.18, 96, 12), new THREE.MeshStandardMaterial({ color: 0x2a9d8f })),
  ];

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  const canvas = renderer.domElement;
  canvas.className = 'stage';
  const grid = h('div', { class: 'grid' }, ...panels.map((p) => p.elem));
  el.append(h('div', { class: 'wrap' }, canvas, grid));

  // The manual adds controls per scene by handing each control the scene's own element.
  const controls = preview ? [] : panels.map((p) => {
    const c = new OrbitControls(p.camera, p.elem);
    c.enableDamping = true;
    c.enableZoom = false;
    return c;
  });

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h2 } = canvas;
    if (w === 0 || h2 === 0) return;
    renderer.setSize(w, h2, false);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    const canvasRect = canvas.getBoundingClientRect();
    // Clear the whole canvas first, with the scissor test off.
    renderer.setScissorTest(false);
    renderer.clear(true, true);
    renderer.setScissorTest(true);
    for (const p of panels) {
      const rect = p.elem.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      // Viewport and scissor are measured from the canvas's bottom-left, in CSS pixels.
      const x = rect.left - canvasRect.left;
      const y = canvasRect.bottom - rect.bottom;
      renderer.setViewport(x, y, rect.width, rect.height);
      renderer.setScissor(x, y, rect.width, rect.height);
      p.camera.aspect = rect.width / rect.height;
      p.camera.updateProjectionMatrix();
      p.update(time / 1000);
      renderer.render(p.scene, p.camera);
    }
    for (const c of controls) c.update();
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    for (const c of controls) c.dispose();
    for (const d of disposables) d.dispose();
    renderer.dispose();
  };
};

export default mount;
