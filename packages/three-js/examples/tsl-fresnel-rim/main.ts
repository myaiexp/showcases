// Rim lighting: a fresnel term from normalView and positionViewDirection added as emissive light
import * as THREE from 'three/webgpu';
import { normalView, positionViewDirection, uniform } from 'three/tsl';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { slider } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0d14);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.3, 5);
  // Aim at the origin, where OrbitControls (full view only) also looks, so the card frames the same shot.
  camera.lookAt(0, 0, 0);

  const rimColor = uniform(new THREE.Color(0x4fd0ff));
  const rimPower = uniform(3);
  const rimStrength = uniform(1.5);

  // Both vectors live in view space. Facing the camera their dot product is 1, at the
  // silhouette it is 0, so one minus the dot is a rim mask that grows toward the edge.
  const facing = normalView.dot(positionViewDirection).saturate();
  const rim = facing.oneMinus().pow(rimPower);

  // The material keeps its normal lighting; the rim is added on top through emissiveNode.
  const makeMaterial = (base: number): THREE.MeshStandardNodeMaterial => {
    const m = new THREE.MeshStandardNodeMaterial({ color: base, roughness: 0.5, metalness: 0.1 });
    m.emissiveNode = rimColor.mul(rim).mul(rimStrength);
    return m;
  };
  const sphereMat = makeMaterial(0x7a3b2e);
  const knotMat = makeMaterial(0x2e5f7a);
  const sphereGeo = new THREE.SphereGeometry(1, 64, 48);
  const knotGeo = new THREE.TorusKnotGeometry(0.7, 0.25, 160, 24);
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  const knot = new THREE.Mesh(knotGeo, knotMat);
  sphere.position.x = -1.5;
  knot.position.x = 1.5;
  const sun = new THREE.DirectionalLight(0xffffff, 2.5);
  sun.position.set(3, 4, 3);
  scene.add(sphere, knot, sun, new THREE.HemisphereLight(0x8899aa, 0x222222, 0.6));

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
    const colorInput = h('input', { type: 'color', value: '#4fd0ff' });
    colorInput.addEventListener('input', () => rimColor.value.set(colorInput.value));
    el.append(
      h(
        'div',
        { class: 'panel' },
        slider({ label: 'power', min: 0.5, max: 8, step: 0.1, value: rimPower.value, onInput: (v) => (rimPower.value = v) }),
        slider({ label: 'strength', min: 0, max: 4, step: 0.05, value: rimStrength.value, onInput: (v) => (rimStrength.value = v) }),
        h('label', { class: 'row' }, h('span', {}, 'rim colour'), colorInput, h('span', {})),
      ),
    );
  }

  await renderer.init();
  resize();

  renderer.setAnimationLoop((t) => {
    sphere.rotation.y = t / 6000;
    knot.rotation.x = t / 3500;
    knot.rotation.y = t / 4500;
    if (preview) rimPower.value = 3 + Math.sin(t / 1500) * 2;
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
