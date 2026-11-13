// Texture filtering: a 16x16 generated texture on a receding plane, with switchable mag/min filters
import * as THREE from 'three/webgpu';
import type { Mount } from '@/types.ts';
import { checkbox, panel, select } from './panel.ts';
import { h } from '@/ui/dom.ts';
import './style.css';

const MAG = {
  NearestFilter: THREE.NearestFilter,
  LinearFilter: THREE.LinearFilter,
} as const;

const MIN = {
  NearestFilter: THREE.NearestFilter,
  LinearFilter: THREE.LinearFilter,
  NearestMipmapNearestFilter: THREE.NearestMipmapNearestFilter,
  NearestMipmapLinearFilter: THREE.NearestMipmapLinearFilter,
  LinearMipmapNearestFilter: THREE.LinearMipmapNearestFilter,
  LinearMipmapLinearFilter: THREE.LinearMipmapLinearFilter,
} as const;

type MagName = keyof typeof MAG;
type MinName = keyof typeof MIN;

/** A 16x16 one-texel checkerboard made in code. Its mips blur towards flat grey. */
function makeTexture(): THREE.DataTexture {
  const size = 16;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const light = (x + y) % 2 === 0;
      let rgb = light ? [240, 232, 200] : [30, 42, 74];
      // Tint the first row and column so the tile edges are visible up close.
      if (x === 0 || y === 0) rgb = light ? [230, 90, 70] : [150, 40, 40];
      data.set([...rgb, 255], (y * size + x) * 4);
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 60);
  // minFilters that read mips need the mip chain, so ask three.js to generate it.
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x10141c);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 0.45, 2.5);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const view = h('div', { class: preview ? 'view is-preview' : 'view' }, renderer.domElement);
  el.append(view);

  // A long, narrow plane lying flat: near the camera a texel covers many pixels
  // (magnification), far away many texels share one pixel (minification).
  const texture = makeTexture();
  const geometry = new THREE.PlaneGeometry(6, 120);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  plane.position.z = -55;
  scene.add(plane);

  let mag: MagName = 'NearestFilter';
  let min: MinName = 'LinearMipmapLinearFilter';
  let sway = true;
  const tag = h('div', { class: 'tag' });
  const apply = (): void => {
    texture.magFilter = MAG[mag];
    texture.minFilter = MIN[min];
    // Changing a filter only takes effect once the texture is flagged as changed.
    texture.needsUpdate = true;
    tag.textContent = preview ? `min ${min.replace("Filter", "")}` : `mag ${mag.replace('Filter', '')} | min ${min.replace('Filter', '')}`;
  };
  apply();
  view.append(tag);

  let panelEl: HTMLElement | null = null;
  let timer = 0;
  if (preview) {
    // No input in a card: step through the minFilters on a timer.
    const names = Object.keys(MIN) as MinName[];
    let i = 0;
    timer = window.setInterval(() => {
      i = (i + 1) % names.length;
      min = names[i] ?? min;
      apply();
    }, 1500);
  } else {
    panelEl = panel(
      select('magFilter', Object.keys(MAG) as MagName[], mag, (v) => {
        mag = v;
        apply();
      }).row,
      select('minFilter', Object.keys(MIN) as MinName[], min, (v) => {
        min = v;
        apply();
      }).row,
      checkbox('Sway the camera', sway, (v) => (sway = v)).row,
    );
    el.append(panelEl);
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
    // Moving makes the flicker of the non-mipmapped filters easy to see.
    const t = sway || preview ? time / 1000 : 0;
    camera.position.x = Math.sin(t * 0.5) * 0.6;
    camera.position.z = 2.5 + Math.sin(t * 0.3) * 0.8;
    camera.lookAt(0, 0, -12);
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    window.clearInterval(timer);
    observer.disconnect();
    panelEl?.remove();
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
  };
};

export default mount;
