// Procedural colour: a NodeMaterial colorNode built from uv() and time with TSL maths
import * as THREE from 'three/webgpu';
import { color, cos, mix, smoothstep, sin, time, uv, vec3 } from 'three/tsl';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// Each pattern is a plain JS function returning a TSL node. Methods chain left to right,
// so `a.mul(b).add(c)` reads as a * b + c.
const patterns = {
  // Three sine waves over uv and time, pushed through a cosine palette.
  plasma: () => {
    const p = uv().mul(8);
    const v = sin(p.x.add(time)).add(sin(p.y.mul(1.3).add(time.mul(1.2)))).add(sin(p.x.add(p.y).mul(0.7).add(time)));
    return vec3(cos(v), cos(v.add(2.094)), cos(v.add(4.188))).mul(0.5).add(0.5);
  },
  // Rings spreading from the middle of the uv square.
  rings: () => {
    const d = uv().sub(0.5).length();
    const band = sin(d.mul(40).sub(time.mul(3))).mul(0.5).add(0.5);
    return mix(color(0x0b1d3a), color(0xffb347), smoothstep(0.35, 0.65, band));
  },
  // A diagonal gradient that slides over time.
  gradient: () => {
    const t = uv().x.add(uv().y).mul(0.5).add(time.mul(0.15)).fract();
    return mix(color(0xff4f81), color(0x39d0ff), t.mul(2).sub(1).abs());
  },
};
type PatternName = keyof typeof patterns;

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 4);
  // Aim at the origin, where OrbitControls (full view only) also looks, so the card frames the same shot.
  camera.lookAt(0, 0, 0);

  const geometry = new THREE.SphereGeometry(1.3, 64, 48);
  // A node material: assign nodes to its *Node slots instead of writing shader text.
  const material = new THREE.MeshBasicNodeMaterial();
  material.colorNode = patterns.plasma();
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

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

  let controls: OrbitControls | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    const select = h('select', {}, ...(Object.keys(patterns) as PatternName[]).map((k) => h('option', { value: k }, k)));
    select.addEventListener('change', () => {
      material.colorNode = patterns[select.value as PatternName]();
      // A new graph means the shader has to be generated again.
      material.needsUpdate = true;
    });
    el.append(h('div', { class: 'panel' }, h('label', {}, 'colorNode pattern ', select)));
  }

  await renderer.init();
  resize();

  renderer.setAnimationLoop((t) => {
    mesh.rotation.y = t / 6000;
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
