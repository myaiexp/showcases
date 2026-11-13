// A preallocated BufferGeometry: setDrawRange grows the line, needsUpdate pushes changed values
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// A buffer cannot be resized after rendering, so reserve the maximum up front.
const MAX_POINTS = 500;

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 8);
  // Aim at the origin, where OrbitControls (full view only) also looks, so the card frames the same shot.
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(MAX_POINTS * 3); // 3 floats per point
  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  geometry.setAttribute('position', positionAttribute);
  let drawCount = 2;
  geometry.setDrawRange(0, drawCount); // draw only the first 2 points to start

  const material = new THREE.LineBasicMaterial({ color: 0xff5a4f });
  const line = new THREE.Line(geometry, material);
  scene.add(line);

  // Fill every slot once with a random walk. Slots beyond drawCount are simply not drawn yet.
  const walk = (): void => {
    let x = 0;
    let y = 0;
    let z = 0;
    for (let i = 0; i < MAX_POINTS; i++) {
      positionAttribute.setXYZ(i, x, y, z);
      x += (Math.random() - 0.5) * 0.8;
      y += (Math.random() - 0.5) * 0.8;
      z += (Math.random() - 0.5) * 0.8;
      // Gentle pull to the origin keeps the walk inside the camera's view.
      x *= 0.985;
      y *= 0.985;
      z *= 0.985;
    }
    positionAttribute.needsUpdate = true; // required once the data has been uploaded
  };
  walk();

  const opts = { perFrame: 2, wobble: false };
  const readout = h('output', { class: 'readout' });
  let panel: HTMLElement | null = null;
  let controls: OrbitControls | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    const speed = h('input', { type: 'range', min: '0', max: '10', step: '1', value: String(opts.perFrame) });
    speed.addEventListener('input', () => (opts.perFrame = Number(speed.value)));
    const wobble = h('input', { type: 'checkbox' });
    wobble.addEventListener('change', () => (opts.wobble = wobble.checked));
    const reroll = h('button', { type: 'button' }, 'New random walk');
    reroll.addEventListener('click', () => {
      walk();
      drawCount = 2;
    });
    panel = h(
      'div',
      { class: 'panel' },
      h('label', {}, 'points added per frame ', speed),
      h('label', {}, wobble, ' rewrite positions each frame'),
      reroll,
      readout,
    );
    el.append(panel);
  }

  const resize = (): void => {
    const { clientWidth: w, clientHeight: hh } = renderer.domElement;
    if (w === 0 || hh === 0) return;
    renderer.setSize(w, hh, false);
    camera.aspect = w / hh;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);
  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    // Growing needs only a new draw range, no data upload.
    drawCount += preview ? 1 : opts.perFrame;
    if (drawCount > MAX_POINTS) {
      drawCount = 2;
      walk();
    }
    geometry.setDrawRange(0, drawCount);

    if (opts.wobble) {
      // Changing values does need needsUpdate.
      for (let i = 0; i < MAX_POINTS; i++) {
        positionAttribute.setY(i, positionAttribute.getY(i) + Math.sin(time / 300 + i * 0.2) * 0.01);
      }
      positionAttribute.needsUpdate = true;
    }
    // Values changed, so refresh the bounds used for frustum culling.
    geometry.computeBoundingSphere();

    line.rotation.y = time / 4000;
    readout.textContent = `drawRange.count = ${drawCount} of ${MAX_POINTS} preallocated points`;
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    panel?.remove();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
