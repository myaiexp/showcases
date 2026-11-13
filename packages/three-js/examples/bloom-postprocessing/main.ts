// Bloom: a scene pass plus a bloom node composed in a RenderPipeline, with live sliders
import * as THREE from 'three/webgpu';
import { pass } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { slider } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05060a);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 1.2, 6);

  // Bright emissive shapes give the bloom something to extract.
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const glowers: THREE.Mesh[] = [];
  const colors = [0xff3b6b, 0x3bd1ff, 0xffd23b, 0x7dff6b];
  const count = preview ? 3 : 4;
  for (let i = 0; i < count; i++) {
    const geometry = i % 2 ? new THREE.IcosahedronGeometry(0.6, 1) : new THREE.TorusGeometry(0.55, 0.2, 24, 48);
    const material = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: colors[i],
      emissiveIntensity: 2,
      roughness: 0.4,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const angle = (i / count) * Math.PI * 2;
    mesh.position.set(Math.cos(angle) * 1.8, Math.sin(angle * 2) * 0.4, Math.sin(angle) * 1.8);
    scene.add(mesh);
    geometries.push(geometry);
    materials.push(material);
    glowers.push(mesh);
  }
  const floorGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x888899, roughness: 0.6 });
  const core = new THREE.Mesh(floorGeo, floorMat);
  scene.add(core, new THREE.HemisphereLight(0xffffff, 0x222233, 0.6));
  geometries.push(floorGeo);
  materials.push(floorMat);

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

  // The post-processing stack: RenderPipeline replaces renderer.render() in the loop.
  const renderPipeline = new THREE.RenderPipeline(renderer);
  const scenePass = pass(scene, camera);
  const scenePassColor = scenePass.getTextureNode('output');
  // bloom(input, strength, radius, threshold) returns a node holding only the glow.
  const bloomPass = bloom(scenePassColor, preview ? 0.9 : 0.6, 0.3, 0.8);
  // Add the glow back onto the untouched beauty pass.
  renderPipeline.outputNode = scenePassColor.add(bloomPass);

  let controls: OrbitControls | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // strength, radius and threshold are uniform nodes: set .value, no rebuild needed.
    el.append(
      h(
        'div',
        { class: 'panel' },
        slider({ label: 'strength', min: 0, max: 3, step: 0.05, value: bloomPass.strength.value, onInput: (v) => (bloomPass.strength.value = v) }),
        slider({ label: 'radius', min: 0, max: 1, step: 0.01, value: bloomPass.radius.value, onInput: (v) => (bloomPass.radius.value = v) }),
        slider({ label: 'threshold', min: 0, max: 2, step: 0.01, value: bloomPass.threshold.value, onInput: (v) => (bloomPass.threshold.value = v) }),
      ),
    );
  }

  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    glowers.forEach((m, i) => {
      m.rotation.x = time / 1500 + i;
      m.rotation.y = time / 1100;
    });
    core.rotation.y = time / 3000;
    if (!controls && preview) {
      const a = time / 4000;
      camera.position.set(Math.sin(a) * 6, 1.2, Math.cos(a) * 6);
      camera.lookAt(0, 0, 0);
    }
    controls?.update();
    renderPipeline.render();
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    bloomPass.dispose();
    renderPipeline.dispose();
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    renderer.dispose();
  };
};

export default mount;
