// Export a small scene with GLTFExporter, parse the result back with GLTFLoader and show both
import * as THREE from 'three/webgpu';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// A little still life: three named meshes in one group.
function buildOriginal(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'still-life';
  const parts: [string, THREE.BufferGeometry, number, THREE.Vector3][] = [
    ['box', new THREE.BoxGeometry(1, 1, 1), 0xe5484d, new THREE.Vector3(-0.9, -0.3, 0)],
    ['ball', new THREE.SphereGeometry(0.6, 24, 16), 0x4f8cff, new THREE.Vector3(0.6, -0.1, 0.3)],
    ['cone', new THREE.ConeGeometry(0.4, 1.1, 20), 0x46c37b, new THREE.Vector3(0, 0.7, -0.5)],
  ];
  for (const [name, geometry, color, position] of parts) {
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: 0.5 }));
    mesh.name = name;
    mesh.position.copy(position);
    group.add(mesh);
  }
  return group;
}

function disposeTree(root: THREE.Object3D): void {
  root.traverse((o) => {
    if (!(o instanceof THREE.Mesh)) return;
    o.geometry.dispose();
    (o.material as THREE.Material).dispose();
  });
}

const mount: Mount = async (el, { preview, signal }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 1.5, 8);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(3, 5, 4);
  scene.add(sun);

  const original = buildOriginal();
  original.position.x = -1.9;
  scene.add(original);

  // The exported file never leaves memory: export to an ArrayBuffer (.glb) or a JSON string
  // (.gltf), then hand the same data straight to GLTFLoader.parse.
  let copy: THREE.Object3D | null = null;
  let version = 0;
  const readout = h('output', { class: 'readout' }, 'exporting...');
  const roundTrip = async (binary: boolean, trs: boolean): Promise<void> => {
    const mine = ++version;
    const result = await new GLTFExporter().parseAsync(original, { binary, trs });
    // Binary export gives an ArrayBuffer; JSON export gives the glTF object, which we serialise.
    const data = result instanceof ArrayBuffer ? result : JSON.stringify(result);
    const bytes = typeof data === 'string' ? new Blob([data]).size : data.byteLength;
    const gltf = await new GLTFLoader().parseAsync(data, '');
    if (mine !== version || signal.aborted) {
      disposeTree(gltf.scene);
      return;
    }
    if (copy) {
      scene.remove(copy);
      disposeTree(copy);
    }
    copy = gltf.scene;
    copy.position.x = 1.9;
    scene.add(copy);
    let meshes = 0;
    copy.traverse((o) => o instanceof THREE.Mesh && meshes++);
    readout.textContent = `${binary ? '.glb (ArrayBuffer)' : '.gltf (JSON string)'}: ${bytes} bytes. Loaded copy on the right: ${meshes} meshes.`;
  };
  await roundTrip(true, false);

  let controls: OrbitControls | null = null;
  let panel: HTMLElement | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    const binary = h('input', { type: 'checkbox', checked: '' });
    const trs = h('input', { type: 'checkbox' });
    const run = (): void => void roundTrip(binary.checked, trs.checked);
    binary.addEventListener('change', run);
    trs.addEventListener('change', run);
    panel = h(
      'div',
      { class: 'panel' },
      h('label', {}, binary, ' binary (.glb)'),
      h('label', {}, trs, ' trs (position/rotation/scale per node)'),
      readout,
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

  renderer.setAnimationLoop((time) => {
    original.rotation.y = time / 2000;
    if (copy) copy.rotation.y = time / 2000;
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    version++;
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    panel?.remove();
    disposeTree(original);
    if (copy) disposeTree(copy);
    renderer.dispose();
  };
};

export default mount;
