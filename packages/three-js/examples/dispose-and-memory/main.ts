// Create batches of meshes, then remove them with and without dispose() and watch renderer.info
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

const BATCH = 20;

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 12);
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(3, 5, 4);
  scene.add(sun);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const wrap = h('div', { class: 'wrap' }, renderer.domElement);
  const readout = h('pre', { class: 'readout' });
  wrap.append(readout);
  el.append(wrap);

  let withTextures = false;
  const meshes: THREE.Mesh[] = [];
  // Everything created below is owned by the app: three.js never frees it on its own.
  const addBatch = (): void => {
    for (let i = 0; i < (preview ? 10 : BATCH); i++) {
      const geometry = new THREE.SphereGeometry(0.35, 12, 8); // one geometry per mesh, on purpose
      const material = new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(Math.random(), 0.7, 0.55) });
      if (withTextures) {
        const data = new Uint8Array(16 * 16 * 4).map(() => Math.floor(Math.random() * 255));
        material.map = new THREE.DataTexture(data, 16, 16);
        material.map.needsUpdate = true;
      }
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4);
      scene.add(mesh);
      meshes.push(mesh);
    }
  };
  // Removing from the scene only stops drawing. dispose() is what releases GPU resources.
  // Meshes removed without dispose stay referenced here, so a later dispose can still reach them.
  const orphans: THREE.Mesh[] = [];
  const removeAll = (dispose: boolean): void => {
    for (const mesh of meshes) scene.remove(mesh);
    if (!dispose) {
      orphans.push(...meshes);
      meshes.length = 0;
      return;
    }
    for (const mesh of [...meshes, ...orphans]) {
      mesh.geometry.dispose();
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.map?.dispose(); // textures are separate: disposing the material does not free them
      material.dispose();
    }
    meshes.length = 0;
    orphans.length = 0;
  };

  let timer: number | undefined;
  let panel: HTMLElement | null = null;
  if (preview) {
    // Grow for a few ticks, then clear everything with dispose, and repeat.
    let tick = 0;
    timer = window.setInterval(() => {
      tick = (tick + 1) % 6;
      if (tick === 0) removeAll(true);
      else addBatch();
    }, 700);
  } else {
    const button = (label: string, on: () => void): HTMLElement => {
      const b = h('button', { type: 'button' }, label);
      b.addEventListener('click', on);
      return b;
    };
    const tex = h('input', { type: 'checkbox' });
    tex.addEventListener('change', () => (withTextures = tex.checked));
    panel = h(
      'div',
      { class: 'panel' },
      button(`Add ${BATCH} meshes`, addBatch),
      button('Remove all (no dispose)', () => removeAll(false)),
      button('Remove all and dispose (frees orphans too)', () => removeAll(true)),
      h('label', {}, tex, ' give each mesh a texture'),
      h('p', { class: 'note' }, 'After "no dispose" the meshes vanish but the geometry and texture counts stay up: that is a leak.'),
    );
    el.append(panel);
    // Open with one batch on screen so the counters have something to report.
    addBatch();
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
    scene.rotation.y = time / 6000;
    renderer.render(scene, camera);
    // renderer.info.memory counts what the renderer currently holds on the GPU.
    const { geometries, textures } = renderer.info.memory;
    readout.textContent = `meshes in scene  ${meshes.length}\ninfo.memory.geometries  ${geometries}\ninfo.memory.textures  ${textures}`;
  });

  return () => {
    window.clearInterval(timer);
    renderer.setAnimationLoop(null);
    observer.disconnect();
    panel?.remove();
    removeAll(true);
    renderer.dispose();
  };
};

export default mount;
