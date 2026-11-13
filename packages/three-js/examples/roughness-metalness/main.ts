// A roughness (across) by metalness (down) grid of MeshStandardMaterial spheres
import * as THREE from 'three/webgpu';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from './panel.ts';
import './style.css';

const SPACING = 1.1;

const mount: Mount = async (el, { preview }) => {
  const cols = preview ? 5 : 7;
  const rows = preview ? 3 : 5;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x15181d);
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const wrap = h('div', { class: 'wrap' }, renderer.domElement);
  el.append(wrap);

  // Same sphere for every cell; only the two material numbers change.
  const geometry = new THREE.SphereGeometry(0.45, preview ? 24 : 40, preview ? 16 : 28);
  const materials: THREE.MeshStandardMaterial[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const material = new THREE.MeshStandardMaterial({
        color: 0xcc9966,
        roughness: col / (cols - 1),
        metalness: row / (rows - 1),
      });
      materials.push(material);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((col - (cols - 1) / 2) * SPACING, -(row - (rows - 1) / 2) * SPACING, 0);
      scene.add(mesh);
    }
  }

  // A fully metallic surface has no diffuse colour: all it shows is what it reflects, so with
  // nothing to reflect the bottom rows go black. An environment map supplies that.
  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(-2, 3, 4);
  scene.add(light);

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const halfH = (rows * SPACING) / 2 + (preview ? 0.1 : 0.5);
    const halfW = (cols * SPACING) / 2 + (preview ? 0.1 : 0.5);
    camera.position.set(0, 0, Math.max(halfH / tan, halfW / (tan * camera.aspect)));
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  await renderer.init();
  resize();

  // Bake the RoomEnvironment scene into a prefiltered cube map (PMREM), the format PBR
  // materials sample. The renderer must be initialised before this call.
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(room);
  scene.environment = envTarget.texture;

  if (!preview) {
    const envOn = checkbox('environment map', true, (on) => {
      scene.environment = on ? envTarget.texture : null;
    });
    const intensity = slider({
      label: 'env intensity',
      min: 0,
      max: 3,
      step: 0.05,
      value: 1,
      onInput: (v) => (scene.environmentIntensity = v),
    });
    wrap.append(
      h('span', { class: 'caption x' }, 'roughness 0 to 1'),
      h('span', { class: 'caption y' }, 'metalness 0 to 1'),
    );
    el.append(h('div', { class: 'panel' }, envOn, intensity.row));
  }

  renderer.setAnimationLoop((time) => {
    // Turning the environment makes reflections slide across the spheres.
    scene.environmentRotation.y = time / 3000;
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    scene.environment = null;
    geometry.dispose();
    materials.forEach((m) => m.dispose());
    room.dispose();
    envTarget.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
};

export default mount;
