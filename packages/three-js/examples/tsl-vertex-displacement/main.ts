// Vertex displacement: positionNode moves a plane's vertices in the vertex stage, normalNode relights it
import * as THREE from 'three/webgpu';
import { cos, modelNormalMatrix, normalize, positionLocal, sin, uniform, vec3 } from 'three/tsl';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { slider } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x10151f);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 4, 4.6);
  camera.lookAt(0, 0, 0);

  // Uniforms are the knobs: the loop and the sliders write .value, the shader reads it.
  const amplitude = uniform(0.35);
  const frequency = uniform(3);
  const phase = uniform(0);

  // Height of the surface at a point of the plane: h(x, y).
  const x = positionLocal.x.mul(frequency).add(phase);
  const y = positionLocal.y.mul(frequency.mul(0.8)).add(phase.mul(0.7));
  const height = sin(x).mul(cos(y)).mul(amplitude);

  const geometry = new THREE.PlaneGeometry(4, 4, preview ? 64 : 160, preview ? 64 : 160);
  const material = new THREE.MeshStandardNodeMaterial({ color: 0x4fb0ff, roughness: 0.45, metalness: 0.1 });
  // positionNode replaces the local vertex position before the model-view transform.
  // The plane lies in local XY, so the height goes into z.
  material.positionNode = positionLocal.add(vec3(0, 0, height));

  // Moving vertices does not move the normals. The slope of h gives the new local normal,
  // and modelNormalMatrix takes it to view space, which is what normalNode expects.
  const dhdx = cos(x).mul(cos(y)).mul(amplitude).mul(frequency);
  const dhdy = sin(x).mul(sin(y)).mul(amplitude).mul(frequency.mul(0.8)).negate();
  const slopeNormal = normalize(modelNormalMatrix.mul(vec3(dhdx.negate(), dhdy.negate(), 1)));
  material.normalNode = slopeNormal;

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  const sun = new THREE.DirectionalLight(0xffffff, 3);
  sun.position.set(2, 3, 2);
  scene.add(mesh, sun, new THREE.HemisphereLight(0xaaccff, 0x223344, 0.8));

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
  let speed = 1.5;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    const normalsBox = h('input', { type: 'checkbox' });
    normalsBox.checked = true;
    normalsBox.addEventListener('change', () => {
      // Dropping normalNode shows the flat-plane normals the vertices started with.
      material.normalNode = normalsBox.checked ? slopeNormal : null;
      material.needsUpdate = true;
    });
    el.append(
      h(
        'div',
        { class: 'panel' },
        slider({ label: 'amplitude', min: 0, max: 0.8, step: 0.01, value: amplitude.value, onInput: (v) => (amplitude.value = v) }),
        slider({ label: 'frequency', min: 1, max: 8, step: 0.1, value: frequency.value, onInput: (v) => (frequency.value = v) }),
        slider({ label: 'speed', min: 0, max: 4, step: 0.1, value: speed, onInput: (v) => (speed = v) }),
        h('label', { class: 'toggle' }, normalsBox, 'recompute normals (normalNode)'),
      ),
    );
  }

  await renderer.init();
  resize();

  let last = 0;
  renderer.setAnimationLoop((t) => {
    phase.value += ((t - last) / 1000) * speed;
    last = t;
    if (preview) mesh.rotation.z = t / 8000;
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
