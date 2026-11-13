// Vector, Quaternion and Color KeyframeTracks in one AnimationClip, played by an AnimationMixer
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

const DURATION = 4;
const INTERPOLATION = {
  Linear: THREE.InterpolateLinear,
  Smooth: THREE.InterpolateSmooth,
  Discrete: THREE.InterpolateDiscrete,
} as const;
type Interp = keyof typeof INTERPOLATION;

// Every track names the property it drives ('.position') and holds flat times/values arrays.
function buildTracks(interp: Interp, enabled: Set<string>): THREE.KeyframeTrack[] {
  const mode = INTERPOLATION[interp];
  const tracks: THREE.KeyframeTrack[] = [];
  if (enabled.has('position')) {
    // 5 keyframes x 3 numbers: a loop that ends where it began.
    tracks.push(
      new THREE.VectorKeyframeTrack(
        '.position',
        [0, 1, 2, 3, 4],
        [-2, 0, 0, 0, 1.2, 0, 2, 0, 0, 0, -1.2, 0, -2, 0, 0],
        mode,
      ),
    );
  }
  if (enabled.has('quaternion')) {
    const q = (x: number, y: number, z: number, deg: number): number[] =>
      new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(x, y, z).normalize(), THREE.MathUtils.degToRad(deg)).toArray();
    tracks.push(
      new THREE.QuaternionKeyframeTrack(
        '.quaternion',
        [0, 1, 2, 3, 4],
        [...q(0, 1, 0, 0), ...q(0, 1, 0, 120), ...q(1, 1, 0, 240), ...q(1, 0, 1, 300), ...q(0, 1, 0, 360)],
        // Quaternion tracks interpolate linearly (slerp) or discretely; Smooth is not supported.
        mode === THREE.InterpolateSmooth ? THREE.InterpolateLinear : mode,
      ),
    );
  }
  if (enabled.has('color')) {
    // Colours are r, g, b triples. The path into the object is '.material.color'.
    tracks.push(
      new THREE.ColorKeyframeTrack(
        '.material.color',
        [0, 1.33, 2.66, 4],
        [0.9, 0.2, 0.25, 0.2, 0.8, 0.4, 0.3, 0.5, 1, 0.9, 0.2, 0.25],
        mode,
      ),
    );
  }
  return tracks;
}

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.5, 7);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(2, 4, 5);
  scene.add(sun);

  const geometry = new THREE.BoxGeometry(1.2, 0.8, 0.8);
  const material = new THREE.MeshStandardMaterial({ color: 0xe5484d, roughness: 0.45 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // The clip holds the data; the mixer plays it on a root object; the action controls playback.
  const mixer = new THREE.AnimationMixer(cube);
  const enabled = new Set(['position', 'quaternion', 'color']);
  let interp: Interp = 'Smooth';
  let clip: THREE.AnimationClip | null = null;
  let action: THREE.AnimationAction | null = null;
  const play = (): void => {
    const keepTime = action?.time ?? 0;
    const paused = action?.paused ?? false;
    if (clip) mixer.uncacheClip(clip); // stops its actions and restores the un-animated state
    clip = new THREE.AnimationClip('tracks', DURATION, buildTracks(interp, enabled));
    action = mixer.clipAction(clip).play();
    action.time = keepTime;
    action.paused = paused;
    mixer.update(0);
  };
  play();

  let panel: HTMLElement | null = null;
  const timeSlider = h('input', { type: 'range', min: '0', max: String(DURATION), step: '0.01', value: '0' });
  if (!preview) {
    const checks = (['position', 'quaternion', 'color'] as const).map((name) => {
      const box = h('input', { type: 'checkbox', checked: '' });
      box.addEventListener('change', () => {
        if (box.checked) enabled.add(name);
        else enabled.delete(name);
        play();
      });
      return h('label', {}, box, ` ${name} track`);
    });
    const select = h('select', {}, ...Object.keys(INTERPOLATION).map((n) => h('option', n === 'Smooth' ? { selected: '' } : {}, n)));
    select.addEventListener('change', () => {
      interp = select.value as Interp;
      play();
    });
    const pause = h('button', { type: 'button' }, 'Pause');
    pause.addEventListener('click', () => {
      if (!action) return;
      action.paused = !action.paused;
      pause.textContent = action.paused ? 'Play' : 'Pause';
    });
    const speed = h('input', { type: 'range', min: '0', max: '3', step: '0.1', value: '1' });
    speed.addEventListener('input', () => (mixer.timeScale = Number(speed.value)));
    timeSlider.addEventListener('input', () => {
      if (!action) return;
      action.time = Number(timeSlider.value);
      mixer.update(0); // apply the new time to the object without advancing
    });
    panel = h(
      'div',
      { class: 'panel' },
      ...checks,
      h('label', {}, 'interpolation ', select),
      pause,
      h('label', {}, 'mixer.timeScale ', speed),
      h('label', {}, 'action.time ', timeSlider),
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

  const clock = new THREE.Timer();
  renderer.setAnimationLoop((time) => {
    clock.update(time);
    mixer.update(clock.getDelta()); // the mixer needs the seconds since the last frame
    if (action) timeSlider.value = String(action.time);
    renderer.render(scene, camera);
  });

  return () => {
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
