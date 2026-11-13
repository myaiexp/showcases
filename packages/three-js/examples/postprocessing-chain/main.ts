// Effect chain: dotScreen, rgbShift and film composed as nodes, each switched on or off
import * as THREE from 'three/webgpu';
import { pass } from 'three/tsl';
import type { Node } from 'three/webgpu';
import { dotScreen } from 'three/addons/tsl/display/DotScreenNode.js';
import { rgbShift } from 'three/addons/tsl/display/RGBShiftNode.js';
import { film } from 'three/addons/tsl/display/FilmNode.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

type EffectKey = 'dotScreen' | 'rgbShift' | 'film';
const ORDER: EffectKey[] = ['dotScreen', 'rgbShift', 'film'];

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1b2233);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0.8, 4.5);
  // Aim at the origin, where OrbitControls (full view only) also looks, so the card frames the same shot.
  camera.lookAt(0, 0, 0);

  const geometry = new THREE.TorusKnotGeometry(0.9, 0.3, 160, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xff8a4f, roughness: 0.4, metalness: 0.2 });
  const knot = new THREE.Mesh(geometry, material);
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(2, 3, 4);
  scene.add(knot, light, new THREE.HemisphereLight(0xaaccff, 0x332211, 1));

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  const renderPipeline = new THREE.RenderPipeline(renderer);
  const scenePass = pass(scene, camera);

  // Each effect takes the previous node as its input, so the chain is plain composition.
  const enabled: Record<EffectKey, boolean> = { dotScreen: false, rgbShift: true, film: true };
  const wrappers: Record<EffectKey, (input: Node) => Node> = {
    dotScreen: (input) => dotScreen(input, 1.57, 0.6),
    rgbShift: (input) => rgbShift(input, 0.008, 0.5),
    film: (input) => film(input),
  };
  const readout = h('code', { class: 'chain' });

  const rebuild = (): void => {
    let node: Node = scenePass;
    const names = ['pass(scene, camera)'];
    for (const key of ORDER) {
      if (!enabled[key]) continue;
      node = wrappers[key](node);
      names.push(`${key}()`);
    }
    renderPipeline.outputNode = node;
    // The output node changed, so the pipeline has to be rebuilt.
    renderPipeline.needsUpdate = true;
    readout.textContent = names.join(' → ');
  };

  const boxes = {} as Record<EffectKey, HTMLInputElement>;
  let controls: OrbitControls | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    const panel = h('div', { class: 'panel' });
    for (const key of ORDER) {
      const box = h('input', { type: 'checkbox' });
      box.checked = enabled[key];
      box.addEventListener('change', () => {
        enabled[key] = box.checked;
        rebuild();
      });
      boxes[key] = box;
      panel.append(h('label', { class: 'toggle' }, box, key));
    }
    panel.append(readout);
    el.append(panel);
  }
  rebuild();

  // In a card there is no input: step through effect combinations on a timer.
  const combos: boolean[][] = [[false, false, false], [true, false, false], [false, true, false], [true, true, true], [false, true, true]];
  let comboIndex = 0;
  const timer = preview
    ? window.setInterval(() => {
        comboIndex = (comboIndex + 1) % combos.length;
        const combo = combos[comboIndex] ?? [];
        ORDER.forEach((key, i) => (enabled[key] = combo[i] ?? false));
        rebuild();
      }, 1800)
    : 0;

  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    knot.rotation.x = time / 3000;
    knot.rotation.y = time / 2000;
    controls?.update();
    renderPipeline.render();
  });

  return () => {
    window.clearInterval(timer);
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    renderPipeline.dispose();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
