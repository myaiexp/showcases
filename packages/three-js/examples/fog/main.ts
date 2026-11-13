// Fog and FogExp2: rows of cubes fading into the fog colour, with the background matched
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import { panel, select, slider } from './panel.ts';
import './style.css';

type Mode = 'Fog' | 'FogExp2' | 'None';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(0, 3, 8);
  camera.lookAt(0, 1, -20);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const tag = h('div', { class: 'tag' });
  const view = h('div', { class: preview ? 'view is-preview' : 'view' }, renderer.domElement, tag);
  el.append(view);

  // Twelve rows of three cubes marching away from the camera, over a floor.
  const disposables: { dispose(): void }[] = [];
  const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
  const floorGeo = new THREE.PlaneGeometry(40, 120);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x556070 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.z = -50;
  scene.add(floor, new THREE.HemisphereLight(0xffffff, 0x445566, 2.2));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(4, 8, 6);
  scene.add(sun);
  disposables.push(cubeGeo, floorGeo, floorMat);
  const rows = preview ? 10 : 14;
  for (let r = 0; r < rows; r++) {
    for (let c = -1; c <= 1; c++) {
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL((r * 3 + c + 1) * 0.045, 0.75, 0.55) });
      const cube = new THREE.Mesh(cubeGeo, mat);
      cube.position.set(c * 4, 1, -r * 5);
      scene.add(cube);
      disposables.push(mat);
    }
  }

  // The fog colour and scene.background must match, or distant objects fade to a
  // different colour than the sky behind them.
  const state = { mode: 'Fog' as Mode, color: '#a8c8e0', near: 5, far: 45, density: 0.04 };
  const applyFog = (): void => {
    const color = new THREE.Color(state.color);
    scene.background = color;
    if (state.mode === 'Fog') scene.fog = new THREE.Fog(color, state.near, state.far);
    else if (state.mode === 'FogExp2') scene.fog = new THREE.FogExp2(color, state.density);
    else scene.fog = null;
    tag.textContent =
      state.mode === 'Fog'
        ? `Fog near ${state.near.toFixed(0)} far ${state.far.toFixed(0)}`
        : state.mode === 'FogExp2'
          ? `FogExp2 density ${state.density.toFixed(3)}`
          : 'no fog';
  };
  applyFog();

  let controls: OrbitControls | null = null;
  let panelEl: HTMLElement | null = null;
  let timer = 0;
  if (preview) {
    // No input in a card: alternate between the two fog types.
    timer = window.setInterval(() => {
      state.mode = state.mode === 'Fog' ? 'FogExp2' : 'Fog';
      applyFog();
    }, 2500);
  } else {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, -20);
    controls.update();
    const near = slider('near', 0, 60, 1, state.near, (v) => {
      state.near = v;
      if (state.far < v) far.set((state.far = v));
      applyFog();
    }, 0);
    const far = slider('far', 1, 100, 1, state.far, (v) => {
      state.far = v;
      if (state.near > v) near.set((state.near = v));
      applyFog();
    }, 0);
    const density = slider('density', 0, 0.15, 0.001, state.density, (v) => {
      state.density = v;
      applyFog();
    }, 3);
    const colour = h('input', { type: 'color', value: state.color });
    colour.addEventListener('input', () => {
      state.color = colour.value;
      applyFog();
    });
    panelEl = panel(
      select<Mode>('scene.fog', ['Fog', 'FogExp2', 'None'], state.mode, (v) => {
        state.mode = v;
        applyFog();
      }).row,
      h('label', { class: 'ctl' }, h('span', {}, 'fog + background'), colour),
      near.row,
      far.row,
      density.row,
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
    if (preview) {
      // Drift down the avenue so objects keep entering and leaving the fog.
      camera.position.z = 8 - ((time / 1000) % 10) * 0.6;
      camera.position.x = Math.sin(time / 2500) * 1.5;
    }
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    window.clearInterval(timer);
    observer.disconnect();
    controls?.dispose();
    panelEl?.remove();
    for (const d of disposables) d.dispose();
    renderer.dispose();
  };
};

export default mount;
