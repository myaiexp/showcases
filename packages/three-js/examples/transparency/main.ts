// Transparent cubes and crossed planes: the sorting problem and the manual's workarounds
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import './style.css';

type Case = { label: string; note: string };
const CASES: Case[] = [
  { label: 'Cubes: transparent, FrontSide', note: 'Default side: the backs of every cube are missing.' },
  { label: 'Cubes: DoubleSide', note: 'Backs appear, but triangle order inside a cube is not sorted, so some back faces still vanish.' },
  { label: 'Cubes: BackSide mesh + FrontSide mesh', note: 'Each cube added twice; renderOrder draws the back mesh first.' },
  { label: 'Cubes: DoubleSide, depthWrite off', note: 'Nothing writes depth, so nothing hides anything. Faces blend in draw order.' },
  { label: 'Planes: transparent', note: 'Two crossing planes: whichever is drawn first hides part of the other.' },
  { label: 'Planes: alphaTest', note: 'Pixels under the alphaTest threshold are not drawn at all, so depth stops mattering. Drag the slider.' },
];

// A soft round blob: alpha fades from 1 at the middle to 0 at the edge, so alphaTest has a threshold to cut.
function makeBlobTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 25);
  camera.position.set(1.6, 1.2, 2.4);
  const addLight = (x: number, y: number, z: number): void => {
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(x, y, z);
    scene.add(light);
  };
  addLight(-1, 2, 4);
  addLight(1, -1, -2);
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const planeGeometry = new THREE.PlaneGeometry(2.6, 2.6);
  const blob = makeBlobTexture();
  const group = new THREE.Group();
  scene.add(group);
  let materials: THREE.Material[] = [];
  let alphaMaterials: THREE.MeshStandardMaterial[] = [];
  let alphaTest = 0.5;

  // Rebuild the 8 cubes or the 2 planes for the chosen case.
  const build = (index: number): void => {
    group.clear();
    for (const m of materials) m.dispose();
    materials = [];
    alphaMaterials = [];
    if (index < 4) {
      const d = 0.8;
      for (let i = 0; i < 8; i++) {
        const color = new THREE.Color().setHSL(i / 8, 1, 0.5);
        const pos = new THREE.Vector3(i & 1 ? d : -d, i & 2 ? d : -d, i & 4 ? d : -d);
        const sides = index === 2 ? [THREE.BackSide, THREE.FrontSide] : [index === 0 ? THREE.FrontSide : THREE.DoubleSide];
        sides.forEach((side, n) => {
          const material = new THREE.MeshStandardMaterial({ color, opacity: 0.5, transparent: true, side });
          if (index === 3) material.depthWrite = false;
          materials.push(material);
          const cube = new THREE.Mesh(cubeGeometry, material);
          cube.position.copy(pos);
          // Back faces first, then front faces: explicit rather than relying on stable sort.
          cube.renderOrder = n;
          group.add(cube);
        });
      }
    } else {
      [0, Math.PI / 2].forEach((rotY, n) => {
        const material = new THREE.MeshStandardMaterial({
          color: n === 0 ? 0x66cc88 : 0x6699dd,
          map: blob,
          transparent: true,
          side: THREE.DoubleSide,
          alphaTest: index === 5 ? alphaTest : 0,
          opacity: index === 5 ? 1 : 0.7,
        });
        materials.push(material);
        if (index === 5) alphaMaterials.push(material);
        const plane = new THREE.Mesh(planeGeometry, material);
        plane.rotation.y = rotY;
        group.add(plane);
      });
    }
  };
  build(0);

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h2 } = renderer.domElement;
    if (w === 0 || h2 === 0) return;
    renderer.setSize(w, h2, false);
    camera.aspect = w / h2;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  let controls: OrbitControls | null = null;
  let timer = 0;
  if (preview) {
    // No panel in a card: cycle the cases instead.
    let n = 0;
    timer = window.setInterval(() => build((n = (n + 1) % 4)), 2500);
  } else {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    const select = h('select', {}, ...CASES.map((c, i) => h('option', { value: String(i) }, c.label)));
    const note = h('p', { class: 'note' }, CASES[0]!.note);
    const slider = h('input', { type: 'range', min: '0', max: '1', step: '0.01', value: String(alphaTest) });
    const sliderLabel = h('label', { class: 'alpha' }, 'alphaTest ', slider);
    sliderLabel.hidden = true;
    select.addEventListener('change', () => {
      const i = Number(select.value);
      build(i);
      note.textContent = CASES[i]!.note;
      sliderLabel.hidden = i !== 5;
    });
    slider.addEventListener('input', () => {
      alphaTest = Number(slider.value);
      for (const m of alphaMaterials) m.alphaTest = alphaTest;
    });
    el.append(h('div', { class: 'panel' }, select, sliderLabel, note));
  }

  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    if (preview) {
      const t = time / 1000;
      camera.position.set(Math.sin(t * 0.5) * 3, 1.4, Math.cos(t * 0.5) * 3);
      camera.lookAt(0, 0, 0);
    }
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    window.clearInterval(timer);
    observer.disconnect();
    controls?.dispose();
    cubeGeometry.dispose();
    planeGeometry.dispose();
    for (const m of materials) m.dispose();
    blob.dispose();
    renderer.dispose();
  };
};

export default mount;
