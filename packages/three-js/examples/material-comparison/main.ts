// The same sphere in Basic, Lambert, Phong, Standard and Physical materials, side by side
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from './panel.ts';
import './style.css';

const COLOR = 0x2288cc;
const SPACING = 2.6;

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x20242b);
  const camera = new THREE.PerspectiveCamera(22, 1, 0.1, 100);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const wrap = h('div', { class: 'wrap' }, renderer.domElement);
  el.append(wrap);

  const dir = new THREE.DirectionalLight(0xffffff, 3);
  dir.position.set(-2, 3, 4);
  scene.add(dir, new THREE.AmbientLight(0xffffff, 0.4));

  // Same geometry and colour everywhere; only the material class changes.
  const phong = new THREE.MeshPhongMaterial({ color: COLOR, shininess: 60 });
  const standard = new THREE.MeshStandardMaterial({ color: COLOR, roughness: 0.35, metalness: 0 });
  const physical = new THREE.MeshPhysicalMaterial({
    color: COLOR,
    roughness: 0.35,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
  const entries: [string, THREE.Material][] = [
    ['Basic', new THREE.MeshBasicMaterial({ color: COLOR })],
    ['Lambert', new THREE.MeshLambertMaterial({ color: COLOR })],
    ['Phong', phong],
    ['Standard', standard],
    ['Physical', physical],
  ];

  const geometry = new THREE.SphereGeometry(1, 20, 14);
  const meshes = entries.map(([, material], i) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (i - (entries.length - 1) / 2) * SPACING;
    scene.add(mesh);
    return mesh;
  });
  const labels = preview ? [] : entries.map(([name]) => h('span', { class: 'label' }, name));
  wrap.append(...labels);

  // flatShading is baked into the compiled shader, so changing it needs needsUpdate.
  // MeshBasicMaterial has no lighting, hence nothing to flatten.
  const setFlat = (on: boolean): void => {
    for (const [, m] of entries) {
      if (m instanceof THREE.MeshBasicMaterial) continue;
      const lit = m as THREE.MeshPhongMaterial;
      lit.flatShading = on;
      lit.needsUpdate = true;
    }
  };

  let timer = 0;
  if (preview) {
    // No controls in a card: flip flatShading every couple of seconds.
    let flat = false;
    timer = window.setInterval(() => setFlat((flat = !flat)), 1800);
  } else {
    const flat = checkbox('flatShading', false, setFlat);
    const shin = slider({
      label: 'Phong shininess',
      min: 0,
      max: 150,
      step: 1,
      value: phong.shininess,
      onInput: (v) => (phong.shininess = v),
      format: (v) => String(v),
    });
    const rough = slider({
      label: 'roughness',
      min: 0,
      max: 1,
      step: 0.01,
      value: standard.roughness,
      onInput: (v) => (standard.roughness = physical.roughness = v),
    });
    el.append(h('div', { class: 'panel' }, flat, shin.row, rough.row));
  }

  const ndc = new THREE.Vector3();
  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    const aspect = w / ch;
    camera.aspect = aspect;
    // Back the camera off until the whole row of spheres fits across the canvas.
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const halfW = (entries.length * SPACING) / 2 + 0.2;
    camera.position.set(0, 0, Math.max(1.9 / tan, halfW / (tan * aspect)));
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    labels.forEach((label, i) => {
      ndc.set(meshes[i]?.position.x ?? 0, -1.4, 0).project(camera);
      label.style.left = `${(ndc.x * 0.5 + 0.5) * 100}%`;
      label.style.top = `${(-ndc.y * 0.5 + 0.5) * 100}%`;
    });
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    meshes.forEach((m) => (m.rotation.y = time / 4000));
    renderer.render(scene, camera);
  });

  return () => {
    clearInterval(timer);
    renderer.setAnimationLoop(null);
    observer.disconnect();
    geometry.dispose();
    entries.forEach(([, m]) => m.dispose());
    renderer.dispose();
  };
};

export default mount;
