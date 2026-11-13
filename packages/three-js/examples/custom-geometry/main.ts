// Custom BufferGeometry: a sphere of loose quads built from raw arrays, animated through needsUpdate
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import { makeQuadSphere, type QuadSphere } from './sphere.ts';
import { checkbox, panel, slider } from './panel.ts';
import './style.css';

/** A small UV-test texture drawn in code: coloured by position so uv orientation is visible. */
function makeUvTexture(): THREE.DataTexture {
  const n = 8;
  const data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const dark = (x + y) % 2 === 0;
      data.set([(x / n) * 255, (y / n) * 255, dark ? 120 : 230, 255], (y * n + x) * 4);
    }
  }
  const texture = new THREE.DataTexture(data, n, n, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
}

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x12151b);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
  camera.position.set(0, 1.2, 4.2);
  // Aim at the origin, where OrbitControls (full view only) also looks, so the card frames the same shot.
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x445566, 1.5));
  const sun = new THREE.DirectionalLight(0xffffff, 2.5);
  sun.position.set(3, 4, 5);
  scene.add(sun);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const tag = h('div', { class: 'tag' });
  const view = h('div', { class: preview ? 'view is-preview' : 'view' }, renderer.domElement, tag);
  el.append(view);

  const texture = makeUvTexture();
  const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
  const settings = { around: preview ? 16 : 24, down: preview ? 10 : 16, push: 0.4, speed: 1 };
  let sphere: QuadSphere;
  const mesh = new THREE.Mesh(undefined, material);
  scene.add(mesh);
  const build = (): void => {
    // A new vertex count means new arrays, so replace the geometry and free the old one.
    mesh.geometry.dispose();
    sphere = makeQuadSphere(settings.around, settings.down);
    mesh.geometry = sphere.geometry;
    const verts = sphere.position.count;
    tag.textContent = `${verts} vertices | ${(sphere.geometry.index?.count ?? 0) / 3} triangles`;
  };
  build();

  let controls: OrbitControls | null = null;
  let panelEl: HTMLElement | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    panelEl = panel(
      slider('segments around', 4, 48, 1, settings.around, (v) => ((settings.around = v), build()), 0).row,
      slider('segments down', 3, 32, 1, settings.down, (v) => ((settings.down = v), build()), 0).row,
      slider('push out', 0, 1, 0.01, settings.push, (v) => (settings.push = v)).row,
      slider('speed', 0, 4, 0.05, settings.speed, (v) => (settings.speed = v)).row,
      checkbox('Wireframe', false, (v) => (material.wireframe = v)).row,
    );
    el.append(panelEl);
  }

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ht } = renderer.domElement;
    if (w === 0 || ht === 0) return;
    renderer.setSize(w, ht, false);
    camera.aspect = w / ht;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);
  await renderer.init();
  resize();

  const temp = new THREE.Vector3();
  let clock = 0;
  let last = 0;
  renderer.setAnimationLoop((time) => {
    clock += ((time - last) / 1000) * settings.speed;
    last = time;
    const { rest, position, segmentsAround } = sphere;
    const out = position.array as Float32Array;
    // Push every quad out along its normal by an amount that depends on its ring and angle.
    for (let i = 0; i < out.length; i += 3) {
      const quad = (i / 12) | 0;
      const ring = (quad / segmentsAround) | 0;
      const angle = ((quad % segmentsAround) / segmentsAround) * Math.PI * 2;
      const wave = Math.sin(clock * 2 + ring + angle) * 0.5 + 0.5;
      temp.fromArray(rest, i).multiplyScalar(1 + settings.push * wave);
      temp.toArray(out, i);
    }
    // Tell three.js the array changed so it re-uploads the attribute.
    position.needsUpdate = true;
    mesh.rotation.y = clock * 0.15;
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    panelEl?.remove();
    mesh.geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
  };
};

export default mount;
