// Name badges as Sprites that always face the camera, compared with flat plane badges
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import './style.css';

// Draw a name onto a 2D canvas; it becomes the badge texture.
function makeLabelCanvas(name: string, color: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const font = 'bold 40px sans-serif';
  ctx.font = font;
  canvas.width = Math.ceil(ctx.measureText(name).width) + 32;
  canvas.height = 64;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = font; // resizing a canvas resets its state
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(name, canvas.width / 2, canvas.height / 2 + 2);
  return canvas;
}

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe8eef4);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 3, 9);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x667788, 2));
  const sun = new THREE.DirectionalLight(0xffffff, 1.5);
  sun.position.set(3, 6, 4);
  scene.add(sun);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  const disposables: { dispose(): void }[] = [];
  const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.6, 1.6, 16);
  const headGeometry = new THREE.SphereGeometry(0.4, 16, 12);
  const planeGeometry = new THREE.PlaneGeometry(1, 1);
  disposables.push(bodyGeometry, headGeometry, planeGeometry);

  const people = [
    { name: 'Ada', color: '#c0392b' },
    { name: 'Grace Hopper', color: '#2a7f62' },
    { name: 'Linus', color: '#3a5ea5' },
  ].map(({ name, color }, i) => {
    const bodyMaterial = new THREE.MeshStandardMaterial({ color });
    const canvas = makeLabelCanvas(name, '#222');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    // The same texture can feed a SpriteMaterial (faces the camera) or a plain MeshBasicMaterial.
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    disposables.push(bodyMaterial, texture, spriteMaterial, planeMaterial);

    const root = new THREE.Object3D();
    root.position.x = (i - 1) * 3;
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.8;
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.y = 2;
    const sprite = new THREE.Sprite(spriteMaterial);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // Scale from texture pixels to world units, as the manual does with labelBaseScale.
    const sx = canvas.width * 0.012;
    const sy = canvas.height * 0.012;
    sprite.scale.set(sx, sy, 1);
    plane.scale.set(sx, sy, 1);
    sprite.position.y = plane.position.y = 2.9;
    plane.rotation.y = Math.PI / 2 + i * 0.3; // deliberately edge-on to the start camera
    root.add(body, head, sprite, plane);
    scene.add(root);
    return { sprite, plane };
  });

  const useSprites = { value: true };
  const applyMode = (): void => {
    for (const p of people) {
      p.sprite.visible = useSprites.value;
      p.plane.visible = !useSprites.value;
    }
  };
  applyMode();

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
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.5, 0);
    controls.enableDamping = true;
    const mode = h('input', { type: 'checkbox', checked: '' });
    mode.addEventListener('change', () => {
      useSprites.value = mode.checked;
      applyMode();
    });
    const spin = h('input', { type: 'range', min: '0', max: '6.28', step: '0.01', value: '0' });
    // SpriteMaterial.rotation spins the sprite in its own plane, still facing the camera.
    spin.addEventListener('input', () => {
      for (const p of people) p.sprite.material.rotation = Number(spin.value);
    });
    el.append(
      h(
        'div',
        { class: 'panel' },
        h('label', {}, mode, ' Sprite (untick for a flat Mesh plane)'),
        h('label', {}, 'SpriteMaterial.rotation ', spin),
        h('span', { class: 'hint' }, 'Orbit around the figures.'),
      ),
    );
  }

  await renderer.init();
  resize();

  const t0 = performance.now();
  renderer.setAnimationLoop(() => {
    if (preview) {
      const t = (performance.now() - t0) / 1000;
      camera.position.set(Math.sin(t * 0.6) * 9, 3, Math.cos(t * 0.6) * 9);
      camera.lookAt(0, 1.5, 0);
    }
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    for (const d of disposables) d.dispose();
    renderer.dispose();
  };
};

export default mount;
