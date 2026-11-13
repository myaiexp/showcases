// A MeshPhysicalMaterial torus knot with sliders for its optional layers
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { slider } from './panel.ts';
import './style.css';

type Layer = 'clearcoat' | 'sheen' | 'transmission' | 'iridescence';
const LAYERS: Layer[] = ['clearcoat', 'sheen', 'transmission', 'iridescence'];

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1d23);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 7);
  // Aim at the origin, where OrbitControls (full view only) also looks, so the card frames the same shot.
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  // Every layer is off (0) by default, so the base is plain MeshStandardMaterial. The base
  // is dark and rough so that sheen, which adds a soft edge glow, is easy to see.
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x6a2a8a,
    roughness: 0.45,
    metalness: 0,
    clearcoat: 0,
    clearcoatRoughness: 0.05,
    sheen: 0,
    sheenRoughness: 0.4,
    sheenColor: new THREE.Color(0xffffff), // the default is black, which hides the sheen
    transmission: 0,
    thickness: 1, // transmission refracts through a volume this thick
    ior: 1.5,
    iridescence: 0,
  });
  const geometry = new THREE.TorusKnotGeometry(1.1, 0.4, preview ? 100 : 200, preview ? 16 : 32);
  const knot = new THREE.Mesh(geometry, material);
  scene.add(knot);

  // Coloured bars behind the knot: transmission shows the scene through the surface.
  const barGeometry = new THREE.BoxGeometry(0.5, 6, 0.5);
  const barMaterials = [0xff5555, 0xffcc33, 0x55dd88, 0x44aaff, 0xcc66ff].map(
    (color) => new THREE.MeshBasicMaterial({ color }),
  );
  barMaterials.forEach((m, i) => {
    const bar = new THREE.Mesh(barGeometry, m);
    bar.position.set((i - 2) * 1.5, 0, -2.5);
    scene.add(bar);
  });

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

  // Clearcoat, sheen and iridescence are lit mainly by reflections: give them a room to reflect.
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(room);
  scene.environment = envTarget.texture;

  let controls: OrbitControls | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    const rows = LAYERS.map((layer) => {
      const s = slider({
        label: layer,
        min: 0,
        max: 1,
        step: 0.01,
        value: material[layer],
        onInput: (v) => (material[layer] = v),
      });
      return s.row;
    });
    const thickness = slider({
      label: 'thickness',
      min: 0,
      max: 3,
      step: 0.05,
      value: material.thickness,
      onInput: (v) => (material.thickness = v),
    });
    const ior = slider({
      label: 'ior',
      min: 1,
      max: 2.333,
      step: 0.01,
      value: material.ior,
      onInput: (v) => (material.ior = v),
    });
    el.append(h('div', { class: 'panel' }, ...rows, thickness.row, ior.row));
  }

  renderer.setAnimationLoop((time) => {
    const t = time / 1000;
    knot.rotation.y = t * 0.4;
    knot.rotation.x = t * 0.2;
    if (preview) {
      // No sliders in a card: sweep each layer up and down out of phase with the others.
      LAYERS.forEach((layer, i) => {
        material[layer] = 0.5 + 0.5 * Math.sin(t * 0.9 + i * 1.6);
      });
    }
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    scene.environment = null;
    geometry.dispose();
    material.dispose();
    barGeometry.dispose();
    barMaterials.forEach((m) => m.dispose());
    room.dispose();
    envTarget.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
};

export default mount;
