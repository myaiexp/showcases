// Every light type: pick one and watch it light the same small scene, with its helper
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import { KINDS, makeRig, type Kind, type Rig } from './rigs.ts';
import { checkbox, panel, select, slider } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  // WebGPU needs the RectAreaLight's lookup data registered once, before any render
  // (the WebGL-only RectAreaLightUniformsLib does not apply here).
  THREE.RectAreaLightNode.setLTC(RectAreaLightTexturesLib.init());

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x14171c);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 10, 18);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const tag = h('div', { class: 'tag' });
  const view = h('div', { class: preview ? 'view is-preview' : 'view' }, renderer.domElement, tag);
  el.append(view);

  // RectAreaLight only shades MeshStandardMaterial / MeshPhysicalMaterial, so use it everywhere.
  const disposables: { dispose(): void }[] = [];
  const add = (geo: THREE.BufferGeometry, color: number, x: number, y: number, z: number): THREE.Mesh => {
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    disposables.push(geo, mat);
    return mesh;
  };
  const seg = preview ? 16 : 32;
  const ground = add(new THREE.PlaneGeometry(24, 24), 0x8899aa, 0, 0, 0);
  ground.rotation.x = -Math.PI / 2;
  const cube = add(new THREE.BoxGeometry(3, 3, 3), 0x88aacc, 4, 1.5, 0);
  add(new THREE.SphereGeometry(2, seg, seg / 2), 0xccaa88, -4, 2, 0);

  let rig: Rig | null = null;
  let intensityUi: ReturnType<typeof slider> | null = null;
  const setKind = (kind: Kind): void => {
    if (rig) {
      scene.remove(rig.light, ...rig.extras);
      if (rig.helper) scene.remove(rig.helper);
      rig.dispose();
    }
    rig = makeRig(kind);
    scene.add(rig.light, ...rig.extras);
    if (rig.helper) scene.add(rig.helper);
    tag.textContent = `${kind}Light`;
    if (intensityUi) {
      intensityUi.input.max = String(rig.intensity * 2);
      intensityUi.set(rig.intensity);
    }
  };
  setKind('Directional');

  let controls: OrbitControls | null = null;
  let panelEl: HTMLElement | null = null;
  let timer = 0;
  let animate = true;
  let kindSelect: ReturnType<typeof select<Kind>> | null = null;
  if (preview) {
    // No input in a card: cycle through the six types.
    let i = KINDS.indexOf('Directional');
    timer = window.setInterval(() => {
      i = (i + 1) % KINDS.length;
      setKind(KINDS[i] ?? 'Directional');
    }, 2200);
  } else {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();
    kindSelect = select<Kind>('Light', KINDS, 'Directional', setKind);
    intensityUi = slider('intensity', 0, 5, 0.01, 2.5, (v) => {
      if (rig) rig.light.intensity = v;
    });
    intensityUi.input.max = String(5);
    panelEl = panel(
      kindSelect.row,
      intensityUi.row,
      checkbox('Move the light', animate, (v) => (animate = v)).row,
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

  let clock = 0;
  let last = 0;
  renderer.setAnimationLoop((time) => {
    if (animate) clock += (time - last) / 1000;
    last = time;
    rig?.place(clock * 0.6);
    cube.rotation.y = clock * 0.3;
    if (preview) {
      camera.position.set(Math.cos(clock * 0.15) * 4, 10, 18);
      camera.lookAt(0, 1, 0);
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
    rig?.dispose();
    for (const d of disposables) d.dispose();
    renderer.dispose();
  };
};

export default mount;
