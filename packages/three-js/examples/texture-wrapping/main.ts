// A drawn CanvasTexture on a plane, with controls for wrap mode, repeat, offset and rotation
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { select, slider } from './panel.ts';
import { drawPattern } from './pattern.ts';
import './style.css';

const WRAP_MODES = {
  ClampToEdgeWrapping: THREE.ClampToEdgeWrapping,
  RepeatWrapping: THREE.RepeatWrapping,
  MirroredRepeatWrapping: THREE.MirroredRepeatWrapping,
} as const;
type WrapName = keyof typeof WRAP_MODES;

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x15181d);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  // CanvasTexture wraps an existing <canvas> and flags itself for upload straight away.
  const texture = new THREE.CanvasTexture(drawPattern());
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.5, 2.5);

  const geometry = new THREE.PlaneGeometry(4, 4);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  scene.add(new THREE.Mesh(geometry, material));

  const setWrap = (axis: 'wrapS' | 'wrapT', name: WrapName): void => {
    texture[axis] = WRAP_MODES[name];
    texture.needsUpdate = true; // wrap modes are sampler settings: they need a re-upload
  };

  let timer = 0;
  if (preview) {
    // No panel in a card: swap the wrap mode on a timer while time drives the rest below.
    const modes = Object.values(WRAP_MODES);
    let n = 0;
    timer = window.setInterval(() => {
      texture.wrapS = texture.wrapT = modes[++n % modes.length] ?? THREE.RepeatWrapping;
      texture.needsUpdate = true;
    }, 2500);
  } else {
    const pair = (
      label: string,
      v: THREE.Vector2,
      min: number,
      max: number,
      step: number,
    ): HTMLElement[] =>
      (['x', 'y'] as const).map((axis) =>
        slider({ label: `${label}.${axis}`, min, max, step, value: v[axis], onInput: (n) => (v[axis] = n) }).row,
      );
    const names = Object.keys(WRAP_MODES) as WrapName[];
    el.append(
      h(
        'div',
        { class: 'panel' },
        select('wrapS', names, 'RepeatWrapping', (n) => setWrap('wrapS', n as WrapName)),
        select('wrapT', names, 'RepeatWrapping', (n) => setWrap('wrapT', n as WrapName)),
        ...pair('repeat', texture.repeat, 0.25, 5, 0.05),
        ...pair('offset', texture.offset, -2, 2, 0.01),
        // The centre is the pivot for rotation, in texture units: (0.5, 0.5) is the middle.
        ...pair('center', texture.center, -0.5, 1.5, 0.01),
        slider({
          label: 'rotation',
          min: -180,
          max: 180,
          step: 1,
          value: 0,
          onInput: (deg) => (texture.rotation = THREE.MathUtils.degToRad(deg)),
          format: (v) => `${v}°`,
        }).row,
      ),
    );
  }

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

  renderer.setAnimationLoop((time) => {
    if (preview) {
      const t = time / 1000;
      texture.center.set(0.5, 0.5);
      texture.rotation = t * 0.5;
      texture.offset.set(Math.sin(t * 0.7) * 0.5, t * 0.15);
      texture.repeat.setScalar(1.5 + Math.sin(t * 0.6));
    }
    renderer.render(scene, camera);
  });

  return () => {
    clearInterval(timer);
    renderer.setAnimationLoop(null);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
  };
};

export default mount;
