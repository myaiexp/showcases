// Two clips on one object: crossFadeTo, fadeIn/fadeOut and effective weights on AnimationAction
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// Clip "slide": swings along x and is blue. Clip "bounce": hops along y, tumbles and is orange.
// Both write .position and .material.color, so blending them is easy to see.
function buildClips(): { slide: THREE.AnimationClip; bounce: THREE.AnimationClip } {
  const slide = new THREE.AnimationClip('slide', 2, [
    new THREE.VectorKeyframeTrack('.position', [0, 1, 2], [-1.8, 0, 0, 1.8, 0, 0, -1.8, 0, 0]),
    new THREE.ColorKeyframeTrack('.material.color', [0, 2], [0.2, 0.5, 1, 0.2, 0.5, 1]),
  ]);
  const half = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 1).normalize(), Math.PI);
  const bounce = new THREE.AnimationClip('bounce', 1, [
    new THREE.VectorKeyframeTrack('.position', [0, 0.5, 1], [0, -1, 0, 0, 1.2, 0, 0, -1, 0]),
    new THREE.QuaternionKeyframeTrack('.quaternion', [0, 0.5, 1], [0, 0, 0, 1, ...half.toArray(), 0, 0, 0, 1]),
    new THREE.ColorKeyframeTrack('.material.color', [0, 1], [1, 0.55, 0.1, 1, 0.55, 0.1]),
  ]);
  return { slide, bounce };
}

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.3, 7);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(2, 4, 5);
  scene.add(sun);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // One mixer, one action per clip. Both play all the time; weights decide who is visible.
  const mixer = new THREE.AnimationMixer(cube);
  const clips = buildClips();
  const slide = mixer.clipAction(clips.slide).setEffectiveWeight(1).play();
  const bounce = mixer.clipAction(clips.bounce).setEffectiveWeight(0).play();

  const opts = { duration: 1.5, warp: false };
  const fade = (to: THREE.AnimationAction, from: THREE.AnimationAction): void => {
    to.stopFading();
    from.stopFading();
    to.time = 0; // a clip that sat at weight 0 starts its cycle from the top
    from.crossFadeTo(to, opts.duration, opts.warp);
  };
  const toBounce = (): void => fade(bounce, slide);
  const toSlide = (): void => fade(slide, bounce);

  let timer: number | undefined;
  let panel: HTMLElement | null = null;
  let meters: (() => void) | null = null;
  if (preview) {
    // Flip between the clips on a timer so the card keeps changing.
    let toB = true;
    timer = window.setInterval(() => {
      if (toB) toBounce();
      else toSlide();
      toB = !toB;
    }, 2600);
  } else {
    const slider = (label: string, min: number, max: number, step: number, value: number, on: (v: number) => void): HTMLInputElement => {
      const input = h('input', { type: 'range', min: String(min), max: String(max), step: String(step), value: String(value) });
      input.addEventListener('input', () => on(Number(input.value)));
      panel?.append(h('label', {}, `${label} `, input));
      return input;
    };
    panel = h('div', { class: 'panel' });
    const b1 = h('button', { type: 'button' }, 'crossFadeTo bounce');
    const b2 = h('button', { type: 'button' }, 'crossFadeTo slide');
    b1.addEventListener('click', toBounce);
    b2.addEventListener('click', toSlide);
    const warp = h('input', { type: 'checkbox' });
    warp.addEventListener('change', () => (opts.warp = warp.checked));
    panel.append(b1, b2, h('label', {}, warp, ' warp'));
    slider('duration (s)', 0.2, 4, 0.1, opts.duration, (v) => (opts.duration = v));
    // Manual weights: stopFading first so a running fade does not overwrite the value.
    const wSlide = slider('slide weight', 0, 1, 0.01, 1, (v) => slide.stopFading().setEffectiveWeight(v));
    const wBounce = slider('bounce weight', 0, 1, 0.01, 0, (v) => bounce.stopFading().setEffectiveWeight(v));
    slider('mixer.timeScale', 0, 2, 0.1, 1, (v) => (mixer.timeScale = v));
    // While a fade runs the sliders follow the effective weights.
    meters = () => {
      wSlide.value = String(slide.getEffectiveWeight());
      wBounce.value = String(bounce.getEffectiveWeight());
    };
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

  const clock = new THREE.Timer();
  renderer.setAnimationLoop((time) => {
    clock.update(time);
    mixer.update(clock.getDelta());
    meters?.();
    renderer.render(scene, camera);
  });

  return () => {
    window.clearInterval(timer);
    renderer.setAnimationLoop(null);
    observer.disconnect();
    mixer.stopAllAction();
    mixer.uncacheRoot(cube);
    clock.dispose();
    panel?.remove();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
