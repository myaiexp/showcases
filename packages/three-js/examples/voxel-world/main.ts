// A generated voxel chunk meshed into a single BufferGeometry with hidden faces left out
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import { CELL, VoxelWorld } from './world.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfd8ea);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  const center = new THREE.Vector3(CELL / 2, 8, CELL / 2);
  camera.position.set(-14, 32, -14);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x556655, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(-1, 2, 4);
  scene.add(sun);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  const world = new VoxelWorld();
  // Vertex colours carry the per-face colour built into the geometry.
  const material = new THREE.MeshLambertMaterial({ vertexColors: true });
  const mesh = new THREE.Mesh(new THREE.BufferGeometry(), material);
  scene.add(mesh);
  const readout = h('output', { class: 'readout' });

  const rebuild = (frequency: number, cull: boolean): void => {
    world.generate(frequency);
    const { geometry, stats } = world.buildGeometry(cull);
    mesh.geometry.dispose();
    mesh.geometry = geometry;
    const kept = ((stats.faces / stats.naiveFaces) * 100).toFixed(0);
    readout.textContent = `${stats.voxels} voxels, ${stats.faces} faces emitted of ${stats.naiveFaces} (${kept}%), ${stats.faces * 2} triangles`;
  };
  let frequency = 1;
  let cull = true;
  rebuild(frequency, cull);

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
    controls.target.copy(center);
    controls.enableDamping = true;
    const slider = h('input', { type: 'range', min: '0.5', max: '3', step: '0.25', value: '1' });
    slider.addEventListener('input', () => rebuild((frequency = Number(slider.value)), cull));
    const cullBox = h('input', { type: 'checkbox', checked: '' });
    cullBox.addEventListener('change', () => rebuild(frequency, (cull = cullBox.checked)));
    const wire = h('input', { type: 'checkbox' });
    wire.addEventListener('change', () => (material.wireframe = wire.checked));
    el.append(
      h(
        'div',
        { class: 'panel' },
        h('label', {}, 'hill frequency ', slider),
        h('label', {}, cullBox, ' skip faces that touch a neighbour'),
        h('label', {}, wire, ' wireframe'),
        readout,
      ),
    );
  }

  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    const t = time / 1000;
    if (preview) {
      camera.position.set(center.x + Math.sin(t * 0.3) * 40, 28, center.z + Math.cos(t * 0.3) * 40);
      camera.lookAt(center);
    }
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    mesh.geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
