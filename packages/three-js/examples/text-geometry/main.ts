// TextGeometry from a FontLoader-parsed font, with extrusion depth and bevel options
import * as THREE from 'three/webgpu';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { makeFontData, SUPPORTED } from './font.ts';
import { buildPanel, type TextOptions } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.3, 5);
  // Aim at the origin, where OrbitControls (full view only) also looks, so the card frames the same shot.
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(3, 4, 5);
  scene.add(sun);

  // FontLoader.parse turns typeface.json data into a Font; no request is made.
  const font = new FontLoader().parse(makeFontData());

  const material = new THREE.MeshStandardMaterial({ color: 0x4f8cff, roughness: 0.4 });
  const mesh = new THREE.Mesh(new THREE.BufferGeometry(), material);
  scene.add(mesh);

  const rebuild = (o: TextOptions): void => {
    mesh.geometry.dispose();
    const text = [...o.text.toUpperCase()].filter((c) => SUPPORTED.includes(c)).join('');
    const geometry = new TextGeometry(text || ' ', {
      font,
      size: 1, // the font's resolution is 1000, so size 1 means a letter 0.7 tall
      depth: o.depth,
      curveSegments: 4,
      bevelEnabled: o.bevelEnabled,
      bevelThickness: o.bevelThickness,
      bevelSize: o.bevelSize,
      bevelSegments: o.bevelSegments,
    });
    geometry.center(); // text starts at the origin's left edge; centre it so it spins about its middle
    mesh.geometry = geometry;
    // Fit wide strings in view.
    const width = geometry.boundingBox ? geometry.boundingBox.max.x - geometry.boundingBox.min.x : 1;
    mesh.scale.setScalar(Math.min(1.3, 4.6 / Math.max(width, 0.01)));
  };
  const initial: TextOptions = preview
    ? { text: 'THREE', depth: 0.25, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 3 }
    : { text: 'THREE JS', depth: 0.25, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 3 };
  rebuild(initial);

  let controls: OrbitControls | null = null;
  let panel: HTMLElement | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    panel = buildPanel(initial, rebuild);
    el.append(panel);
  }

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h } = renderer.domElement;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);
  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    mesh.rotation.y = Math.sin(time / 1200) * 0.6; // a sway keeps the text readable
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    panel?.remove();
    mesh.geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
