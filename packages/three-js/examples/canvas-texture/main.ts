// A 2D canvas redrawn every frame feeds a CanvasTexture; needsUpdate re-uploads it
import * as THREE from 'three/webgpu';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import './style.css';

const SIZE = 256;

const mount: Mount = async (el, { preview }) => {
  // The source: an ordinary 2D canvas, never attached to the page in preview.
  const source = document.createElement('canvas');
  source.width = SIZE;
  source.height = SIZE;
  source.className = 'source';
  const ctx = source.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Three bouncing dots leave fading trails: each frame paints a translucent white veil first.
  const balls = [0, 1, 2].map((i) => ({
    x: 40 + i * 70,
    y: 50 + i * 60,
    vx: 2.2 + i,
    vy: 1.7 + i * 0.8,
    r: 18 + i * 6,
    color: ['#e63946', '#2a9d8f', '#3a6ea5'][i],
  }));
  const drawFrame = (): void => {
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(0, 0, SIZE, SIZE);
    for (const b of balls) {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < b.r || b.x > SIZE - b.r) b.vx *= -1;
      if (b.y < b.r || b.y > SIZE - b.r) b.vy *= -1;
      ctx.fillStyle = b.color ?? '#000';
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 2.6;

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  const texture = new THREE.CanvasTexture(source);
  texture.colorSpace = THREE.SRGBColorSpace;
  const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h2 } = renderer.domElement;
    if (w === 0 || h2 === 0) return;
    renderer.setSize(w, h2, false);
    camera.aspect = w / h2;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  // Full view: let the reader stop the re-upload and watch the cube keep the old pixels
  // while the source canvas (shown beside the stage) keeps moving.
  let upload = true;
  if (!preview) {
    const box = h('input', { type: 'checkbox', checked: '' });
    box.addEventListener('change', () => (upload = box.checked));
    el.append(
      h(
        'div',
        { class: 'panel' },
        source,
        h(
          'div',
          { class: 'controls' },
          h('label', {}, box, ' texture.needsUpdate = true each frame'),
          h('p', {}, 'Left: the source canvas, redrawn every frame. Untick the box and the cube stops following it.'),
        ),
      ),
    );
  }

  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    drawFrame();
    // Tells three.js the canvas changed, so the next render re-uploads it to the GPU.
    if (upload) texture.needsUpdate = true;
    cube.rotation.x = time / 3000;
    cube.rotation.y = time / 2000;
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
  };
};

export default mount;
