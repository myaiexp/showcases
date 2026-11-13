// Taking a screenshot: render, then toBlob in the same task, into a strip of thumbnails
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

const MAX_SHOTS = 6;

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101418);
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
  camera.position.z = 2;
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-1, 2, 4);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.6));

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const cubes = [0x44aa88, 0x8844aa, 0xaa8844].map((color, i) => {
    const cube = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color }));
    cube.position.x = (i - 1) * 2;
    scene.add(cube);
    return cube;
  });

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';

  const strip = h('div', { class: 'strip' });
  const button = h('button', { type: 'button', class: 'shot' }, 'Take screenshot');
  const note = h('span', { class: 'note' }, 'Click a thumbnail to save it.');
  el.append(h('div', { class: 'wrap' }, renderer.domElement, preview ? strip : null));
  if (!preview) el.append(h('div', { class: 'panel' }, h('div', { class: 'row' }, button, note), strip));

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  // Same scene update + draw the loop uses, so a capture can call it on its own.
  let seconds = 0;
  function render(): void {
    cubes.forEach((cube, i) => {
      const rot = seconds * (1 + i * 0.1);
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    renderer.render(scene, camera);
  }

  const urls: string[] = [];
  let count = 0;
  function capture(): void {
    // The canvas contents are only guaranteed until the browser presents the frame
    // (WebGL clears the buffer, WebGPU hands the texture over). So draw now, and ask
    // for the pixels in this same task, before any await or timer can intervene.
    render();
    const { width, height } = renderer.domElement;
    renderer.domElement.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      urls.push(url);
      const name = `screencapture-${++count}-${width}x${height}.png`;
      const thumb = h('img', { src: url, alt: name, title: `${name} (click to save)` });
      const link = h('a', { href: url, download: name }, thumb);
      strip.prepend(link);
      while (strip.children.length > MAX_SHOTS) {
        strip.lastElementChild?.remove();
        URL.revokeObjectURL(urls.shift() as string);
      }
    });
  }
  button.addEventListener('click', capture);

  await renderer.init();
  resize();
  renderer.setAnimationLoop((time) => {
    seconds = time / 1000;
    render();
  });

  // A card has no pointer: take a shot on a timer so the strip fills up.
  const timer = preview ? window.setInterval(capture, 1400) : 0;

  return () => {
    renderer.setAnimationLoop(null);
    clearInterval(timer);
    button.removeEventListener('click', capture);
    observer.disconnect();
    urls.forEach((u) => URL.revokeObjectURL(u));
    geometry.dispose();
    cubes.forEach((c) => (c.material as THREE.Material).dispose());
    renderer.dispose();
  };
};

export default mount;
