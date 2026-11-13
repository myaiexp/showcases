// Merging thousands of boxes: one merged geometry versus one mesh per box, with draw calls
import * as THREE from 'three/webgpu';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { colorFor, makeCells, type Cell } from './globe.ts';
import { buildPanel } from './panel.ts';
import './style.css';

const BUCKETS = 16;

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0e12);
  const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 20);
  camera.position.set(0, 1.2, 3.6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: !preview });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';

  const panel = preview ? null : buildPanel();
  el.append(renderer.domElement);
  if (panel) el.append(panel.root);

  const globe = new THREE.Group();
  scene.add(globe);
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.99, 32, 16), new THREE.MeshBasicMaterial({ color: 0x15202e }));
  globe.add(core);

  // What the current build owns, so switching can dispose it.
  let disposables: { dispose(): void }[] = [];
  let built: THREE.Object3D[] = [];
  let cells: Cell[] = [];
  let boxCount = 0;

  function clearBuilt(): void {
    built.forEach((o) => globe.remove(o));
    disposables.forEach((d) => d.dispose());
    built = [];
    disposables = [];
  }

  // One BoxGeometry per cell, moved into place with applyMatrix4 and coloured with a
  // vertex-colour attribute, then mergeGeometries joins them into a single draw.
  function buildMerged(): void {
    const geometries = cells.map(({ matrix, amount }) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      geometry.applyMatrix4(matrix);
      const rgb = colorFor(amount).toArray().map((v) => v * 255);
      const count = geometry.getAttribute('position').count;
      const colors = new Uint8Array(count * 3);
      colors.forEach((_, i) => (colors[i] = rgb[i % 3] as number));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3, true));
      return geometry;
    });
    const merged = BufferGeometryUtils.mergeGeometries(geometries, false);
    geometries.forEach((g) => g.dispose());
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });
    const mesh = new THREE.Mesh(merged, material);
    globe.add(mesh);
    built = [mesh];
    disposables = [merged, material];
  }

  // The "before": every box is its own Mesh (one draw call each). One shared geometry,
  // and a small palette of shared materials, so memory is not what makes it slow.
  function buildIndividual(): void {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const materials = Array.from({ length: BUCKETS }, (_, i) => new THREE.MeshBasicMaterial({ color: colorFor((i + 0.5) / BUCKETS) }));
    const group = new THREE.Group();
    for (const { matrix, amount } of cells) {
      const mesh = new THREE.Mesh(geometry, materials[Math.min(BUCKETS - 1, Math.floor(amount * BUCKETS))]);
      mesh.applyMatrix4(matrix);
      group.add(mesh);
    }
    globe.add(group);
    built = [group];
    disposables = [geometry, ...materials];
  }

  function rebuild(merged: boolean, step: number): void {
    clearBuilt();
    const t0 = performance.now();
    cells = makeCells(step);
    boxCount = cells.length;
    if (merged) buildMerged();
    else buildIndividual();
    panel?.setBuild(boxCount, performance.now() - t0);
  }

  if (panel) panel.onChange(rebuild);
  const initial = preview ? { merged: true, step: 4 } : panel!.state();
  rebuild(initial.merged, initial.step);

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);
  const controls = preview ? null : new OrbitControls(camera, renderer.domElement);

  await renderer.init();
  resize();

  // Preview has no toggle, so flip merged/individual every few seconds.
  const flip = preview ? window.setInterval(() => rebuild(!(built[0] instanceof THREE.Mesh), 4), 3000) : 0;

  let last = 0;
  let fps = 60;
  let readoutAt = 0;
  renderer.setAnimationLoop((time) => {
    const dt = last ? time - last : 16;
    last = time;
    fps += (1000 / Math.max(dt, 1) - fps) * 0.1;
    globe.rotation.y += dt * 0.0003;
    controls?.update();
    renderer.render(scene, camera);
    if (panel && time - readoutAt > 250) {
      readoutAt = time;
      const { drawCalls, triangles } = renderer.info.render;
      panel.setStats(drawCalls, triangles, fps);
    }
  });

  return () => {
    renderer.setAnimationLoop(null);
    clearInterval(flip);
    observer.disconnect();
    controls?.dispose();
    clearBuilt();
    core.geometry.dispose();
    (core.material as THREE.Material).dispose();
    panel?.dispose();
    renderer.dispose();
  };
};

export default mount;
