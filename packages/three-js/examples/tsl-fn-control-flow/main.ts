// Fn, If and Loop: a Julia-set fractal written as a TSL shader function on a plane
import * as THREE from 'three/webgpu';
import { Break, Fn, If, Loop, cos, float, uniform, uv, vec2, vec3 } from 'three/tsl';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { slider } from './panel.ts';
import './style.css';

const MAX_ITERATIONS = 48;

// Fn() makes a shader function: its body runs once while the graph is built, and everything
// it records (Loop, If, assign) becomes real GPU control flow, unlike a JS `for` or `if`.
const julia = Fn(([coord, c, zoom, aspect]: [any, any, any, any]) => {
  // toVar() declares mutable shader variables that assign() can update.
  const z = coord.sub(0.5).mul(vec2(aspect, 1)).mul(zoom).toVar();
  const escapeStep = float(0).toVar();
  const escaped = float(0).toVar();

  Loop(MAX_ITERATIONS, ({ i }) => {
    // z = z^2 + c on complex numbers stored as vec2.
    const re = z.x.mul(z.x).sub(z.y.mul(z.y));
    const im = z.x.mul(z.y).mul(2);
    z.assign(vec2(re, im).add(c));

    // If runs per pixel on the GPU. Break leaves the Loop as soon as the point escapes.
    If(z.length().greaterThan(2), () => {
      escapeStep.assign(i.toFloat());
      escaped.assign(1);
      Break();
    });
  });

  // Points that never escaped belong to the set and stay dark; the rest get a palette.
  const result = vec3(0.02, 0.02, 0.06).toVar();
  If(escaped.greaterThan(0.5), () => {
    const t = escapeStep.div(MAX_ITERATIONS).mul(6);
    result.assign(vec3(cos(t), cos(t.add(2.1)), cos(t.add(4.2))).mul(0.5).add(0.5));
  });
  return result;
});

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  // Distance at which a plane 1 unit tall exactly fills the view.
  camera.position.z = 0.5 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));

  const c = uniform(new THREE.Vector2(-0.7, 0.27));
  const zoom = uniform(2.6);
  const aspect = uniform(1);

  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicNodeMaterial();
  material.colorNode = julia(uv(), c, zoom, aspect);
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  const renderer = new THREE.WebGPURenderer({ antialias: false });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    camera.updateProjectionMatrix();
    // Stretch the plane to the view so the fractal is not squashed.
    plane.scale.x = camera.aspect;
    aspect.value = camera.aspect;
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  let animate = true;
  if (!preview) {
    const play = h('input', { type: 'checkbox' });
    play.checked = true;
    const cx = slider({ label: 'c.x', min: -1.2, max: 1.2, step: 0.005, value: c.value.x, onInput: (v) => { animate = false; play.checked = false; c.value.x = v; } });
    const cy = slider({ label: 'c.y', min: -1.2, max: 1.2, step: 0.005, value: c.value.y, onInput: (v) => { animate = false; play.checked = false; c.value.y = v; } });
    play.addEventListener('change', () => (animate = play.checked));
    el.append(
      h(
        'div',
        { class: 'panel' },
        cx,
        cy,
        slider({ label: 'zoom', min: 0.5, max: 4, step: 0.05, value: zoom.value, onInput: (v) => (zoom.value = v) }),
        h('label', { class: 'toggle' }, play, 'drift c automatically'),
      ),
    );
  }

  await renderer.init();
  resize();

  renderer.setAnimationLoop((t) => {
    if (animate) c.value.set(Math.cos(t / 3000) * 0.3 - 0.7, Math.sin(t / 2300) * 0.2 + 0.27);
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
