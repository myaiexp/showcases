// Spot light controls: angle, penumbra, distance, decay, intensity and a moving target
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import { checkbox, panel, slider } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e1116);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(-10, 12, 16);
  // Aim at the origin, where OrbitControls (full view only) also looks, so the card frames the same shot.
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const view = h('div', { class: preview ? 'view is-preview' : 'view' }, renderer.domElement);
  el.append(view);

  // Scene: a floor to catch the cone, plus a few shapes for it to sweep over.
  const floorGeo = new THREE.PlaneGeometry(40, 40);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x9aa4b0 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  const boxGeo = new THREE.BoxGeometry(2, 2, 2);
  const ballGeo = new THREE.SphereGeometry(1.2, preview ? 16 : 32, preview ? 8 : 16);
  const solidMat = new THREE.MeshStandardMaterial({ color: 0xcc9966 });
  const shapes: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const m = new THREE.Mesh(i % 2 ? ballGeo : boxGeo, solidMat);
    m.position.set((i - 2) * 4, i % 2 ? 1.2 : 1, ((i * 5) % 3) * 2 - 2);
    shapes.push(m);
  }
  scene.add(floor, ...shapes);

  // SpotLight(color, intensity, distance, angle, penumbra, decay). The cone opens toward
  // light.target, which has to be part of the scene for its matrix to update.
  const light = new THREE.SpotLight(0xffffff, 300, 0, Math.PI / 6, 0.3, 2);
  light.position.set(0, 10, 0);
  scene.add(light, light.target);
  // The helper draws the cone; call update() whenever the light changes.
  const helper = new THREE.SpotLightHelper(light);
  scene.add(helper);

  let moving = true;
  const target = { x: 0, z: 0 };
  let panelEl: HTMLElement | null = null;
  let controls: OrbitControls | null = null;
  const ui: Record<string, ReturnType<typeof slider>> = {};
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    ui.angle = slider('angle (deg)', 1, 90, 1, 30, (v) => (light.angle = THREE.MathUtils.degToRad(v)), 0);
    ui.penumbra = slider('penumbra', 0, 1, 0.01, 0.3, (v) => (light.penumbra = v));
    ui.distance = slider('distance', 0, 40, 0.5, 0, (v) => (light.distance = v), 1);
    ui.decay = slider('decay', 0, 4, 0.05, 2, (v) => (light.decay = v));
    ui.intensity = slider('intensity', 0, 800, 5, 300, (v) => (light.intensity = v), 0);
    ui.tx = slider('target x', -12, 12, 0.1, 0, (v) => (target.x = v), 1);
    ui.tz = slider('target z', -12, 12, 0.1, 0, (v) => (target.z = v), 1);
    panelEl = panel(
      ui.angle.row,
      ui.penumbra.row,
      ui.distance.row,
      ui.decay.row,
      ui.intensity.row,
      ui.tx.row,
      ui.tz.row,
      checkbox('Move the target', moving, (v) => (moving = v)).row,
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

  renderer.setAnimationLoop((time) => {
    const t = time / 1000;
    if (preview) {
      // No sliders in a card, so sweep angle and penumbra on their own.
      light.angle = THREE.MathUtils.degToRad(22 + Math.sin(t * 0.8) * 12);
      light.penumbra = 0.5 + Math.sin(t * 0.5) * 0.5;
    }
    if (moving || preview) {
      // A card is narrower than the full view, so the pool of light wanders less there.
      const reach = preview ? 0.4 : 1;
      target.x = Math.sin(t * 0.7) * 8 * reach;
      target.z = Math.cos(t * 0.5) * 5 * reach;
      ui.tx?.set(target.x);
      ui.tz?.set(target.z);
    }
    light.target.position.set(target.x, 0, target.z);
    light.target.updateMatrixWorld();
    helper.update();
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    panelEl?.remove();
    helper.dispose();
    light.dispose();
    for (const d of [floorGeo, floorMat, boxGeo, ballGeo, solidMat]) d.dispose();
    renderer.dispose();
  };
};

export default mount;
