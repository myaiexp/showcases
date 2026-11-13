// Ten thousand instances: one InstancedMesh, matrices and colours rewritten every frame
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

const MAX = 10000;

const mount: Mount = async (el, { preview }) => {
  const max = preview ? 1600 : MAX;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0e12);
  const camera = new THREE.PerspectiveCamera(50, 2, 0.1, 200);
  camera.position.set(0, 26, 34);
  camera.lookAt(0, 0, 0);
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(10, 30, 20);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.7));

  const renderer = new THREE.WebGPURenderer({ antialias: !preview });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';

  // One geometry + one material drawn `count` times: a single draw call.
  const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  const material = new THREE.MeshStandardMaterial();
  const mesh = new THREE.InstancedMesh(geometry, material, max);
  // Frequently rewritten, so tell three.js to expect it.
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(mesh);

  const side = Math.ceil(Math.sqrt(max));
  const spacing = 0.9;
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  // Instances show first `count` entries only, so a slider can change it for free.
  mesh.count = preview ? max : 5000;

  function update(t: number): void {
    for (let i = 0; i < mesh.count; i++) {
      const x = (i % side) - side / 2;
      const z = Math.floor(i / side) - side / 2;
      const wave = Math.sin(x * 0.25 + t * 1.5) + Math.cos(z * 0.25 + t);
      dummy.position.set(x * spacing, wave, z * spacing);
      dummy.rotation.set(t + x * 0.1, t * 0.7 + z * 0.1, 0);
      dummy.scale.setScalar(0.8 + 0.4 * Math.sin(wave + t));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.setHSL(0.55 + wave * 0.12, 0.8, 0.5 + wave * 0.12));
    }
    // The buffers are uploaded again only when flagged.
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }

  let controls: OrbitControls | null = null;
  let statsEl: HTMLElement | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    const slider = h('input', { type: 'range', min: '1', max: String(MAX), step: '1', value: String(mesh.count) });
    const value = h('b', {}, String(mesh.count));
    slider.addEventListener('input', () => {
      mesh.count = Number(slider.value);
      value.textContent = slider.value;
    });
    statsEl = h('span', { class: 'stat' });
    el.append(renderer.domElement, h('div', { class: 'panel' }, h('label', {}, 'Instances ', slider, ' ', value), statsEl));
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

  let lastStats = 0;
  renderer.setAnimationLoop((time) => {
    update(time / 1000);
    controls?.update();
    if (preview) mesh.rotation.y = time / 6000;
    renderer.render(scene, camera);
    if (statsEl && time - lastStats > 250) {
      lastStats = time;
      statsEl.textContent = `draw calls: ${renderer.info.render.drawCalls}, triangles: ${renderer.info.render.triangles.toLocaleString()}`;
    }
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    scene.remove(mesh);
    mesh.dispose();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
