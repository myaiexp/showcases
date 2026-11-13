// A torus knot rendered at an adjustable pixel ratio, with the drawing-buffer size shown
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  // A knot with a wireframe overlay: thin lines show resolution loss more than flat colour.
  const geometry = new THREE.TorusKnotGeometry(1.4, 0.45, 160, 24);
  const material = new THREE.MeshPhongMaterial({ color: 0x3388cc });
  const knot = new THREE.Mesh(geometry, material);
  const edges = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 }),
  );
  knot.add(edges);
  scene.add(knot);
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-1, 2, 4);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.4));

  const readout = h('p', { class: 'readout' });

  // setSize(w, h, false) sets the drawing buffer to w*ratio by h*ratio and leaves the CSS
  // size alone, so the canvas keeps filling its box whatever the ratio is.
  let ratio = preview ? 1 : Math.min(window.devicePixelRatio, 2);
  const apply = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setPixelRatio(ratio);
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    camera.updateProjectionMatrix();
    const c = renderer.domElement;
    readout.textContent = `CSS ${w}x${ch}  x  ratio ${ratio.toFixed(2)}  =  drawing buffer ${c.width}x${c.height}  (devicePixelRatio ${window.devicePixelRatio})`;
  };
  const observer = new ResizeObserver(apply);
  observer.observe(renderer.domElement);

  let timer = 0;
  if (preview) {
    // No controls in a card: sweep the ratio so the crisp-to-blocky change is visible.
    const start = performance.now();
    timer = window.setInterval(() => {
      const phase = ((performance.now() - start) / 3000) % 2;
      ratio = 0.15 + 0.85 * Math.abs(phase - 1);
      apply();
    }, 120);
  } else {
    const ratioSlider = slider({
      label: 'pixel ratio',
      min: 0.1,
      max: 2,
      step: 0.05,
      value: ratio,
      onInput: (v) => {
        ratio = v;
        apply();
      },
    });
    const dpr = h('button', { type: 'button' }, 'devicePixelRatio');
    dpr.addEventListener('click', () => {
      ratio = Math.min(window.devicePixelRatio, 2);
      ratioSlider.set(ratio);
      apply();
    });
    // Without smoothing, the browser's upscaling stops hiding the individual pixels.
    const pixelated = checkbox('pixelated upscaling', true, (on) =>
      renderer.domElement.classList.toggle('pixelated', on),
    );
    renderer.domElement.classList.add('pixelated');
    el.append(h('div', { class: 'panel' }, ratioSlider.row, h('div', {}, dpr), pixelated, readout));
  }

  await renderer.init();
  apply();

  renderer.setAnimationLoop((time) => {
    knot.rotation.x = time / 2500;
    knot.rotation.y = time / 1700;
    renderer.render(scene, camera);
  });

  return () => {
    clearInterval(timer);
    renderer.setAnimationLoop(null);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    edges.geometry.dispose();
    edges.material.dispose();
    renderer.dispose();
  };
};

export default mount;
