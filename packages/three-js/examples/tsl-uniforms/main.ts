// Uniforms: uniform() nodes shared by two materials, with .value set from sliders
import * as THREE from 'three/webgpu';
import { mix, positionLocal, smoothstep, uniform } from 'three/tsl';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { slider } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.4, 5.2);
  // Aim at the origin, where OrbitControls (full view only) also looks, so the card frames the same shot.
  camera.lookAt(0, 0, 0);

  // A uniform wraps a JS value the GPU reads. Change .value and the next frame uses it,
  // without rebuilding the shader.
  const colorA = uniform(new THREE.Color(0xff5577));
  const colorB = uniform(new THREE.Color(0x2a3cff));
  const stripes = uniform(6);
  const softness = uniform(0.15);
  const offset = uniform(0);

  // Stripes along local Y, mixed between the two colours.
  const band = positionLocal.y.mul(stripes).add(offset).sin().mul(0.5).add(0.5);
  const stripeColor = mix(colorA, colorB, smoothstep(softness.oneMinus().mul(0.5), softness.mul(0.5).add(0.5), band));

  // The same uniform nodes feed both materials, so one slider moves both meshes.
  const makeMaterial = (): THREE.MeshBasicNodeMaterial => {
    const m = new THREE.MeshBasicNodeMaterial();
    m.colorNode = stripeColor;
    return m;
  };
  const sphereMat = makeMaterial();
  const knotMat = makeMaterial();
  const sphereGeo = new THREE.SphereGeometry(1, 48, 32);
  const knotGeo = new THREE.TorusKnotGeometry(0.7, 0.25, 128, 20);
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  const knot = new THREE.Mesh(knotGeo, knotMat);
  sphere.position.x = -1.5;
  knot.position.x = 1.5;
  scene.add(sphere, knot);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  let controls: OrbitControls | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    const colorInput = (label: string, node: typeof colorA): HTMLElement => {
      const input = h('input', { type: 'color', value: `#${node.value.getHexString()}` });
      input.addEventListener('input', () => node.value.set(input.value));
      return h('label', { class: 'row' }, h('span', {}, label), input, h('span', {}));
    };
    el.append(
      h(
        'div',
        { class: 'panel' },
        colorInput('colorA', colorA),
        colorInput('colorB', colorB),
        slider({ label: 'stripes', min: 1, max: 20, step: 0.5, value: stripes.value, onInput: (v) => (stripes.value = v) }),
        slider({ label: 'softness', min: 0, max: 1, step: 0.01, value: softness.value, onInput: (v) => (softness.value = v) }),
        slider({ label: 'offset', min: 0, max: 6.28, step: 0.01, value: offset.value, onInput: (v) => (offset.value = v) }),
      ),
    );
  }

  await renderer.init();
  resize();

  renderer.setAnimationLoop((t) => {
    sphere.rotation.y = t / 5000;
    knot.rotation.x = t / 3000;
    knot.rotation.y = t / 4000;
    // With no sliders in a card, a timer plays the part of the reader.
    if (preview) {
      stripes.value = 7 + Math.sin(t / 1200) * 4;
      softness.value = 0.5 + Math.sin(t / 1700) * 0.45;
      offset.value = t / 600;
      colorA.value.setHSL((t / 8000) % 1, 0.85, 0.6);
    }
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    sphereGeo.dispose();
    knotGeo.dispose();
    sphereMat.dispose();
    knotMat.dispose();
    renderer.dispose();
  };
};

export default mount;
