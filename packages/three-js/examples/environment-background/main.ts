// RoomEnvironment baked by PMREMGenerator, used as scene.background and scene.environment
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { Mount } from '@/types.ts';
import { makePanel } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 1.2, 6);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  // The generator needs a ready renderer, so init first.
  await renderer.init();

  // RoomEnvironment is a small lit scene; PMREMGenerator turns it into a prefiltered cube
  // map that materials can sample at any roughness.
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(room);
  const envMap = envTarget.texture;
  scene.environment = envMap; // image-based lighting for every PBR material
  scene.background = envMap; // the same map drawn behind everything
  scene.backgroundBlurriness = 0.2;

  // Reflective objects: roughness and metalness differ so the environment reads differently.
  const geometries: THREE.BufferGeometry[] = [
    new THREE.SphereGeometry(0.9, 48, 24),
    new THREE.SphereGeometry(0.9, 48, 24),
    new THREE.TorusKnotGeometry(0.6, 0.22, 128, 24),
  ];
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.05 }),
    new THREE.MeshStandardMaterial({ color: 0xc0392b, metalness: 0.2, roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 1, roughness: 0.25 }),
  ];
  const meshes = geometries.map((g, i) => {
    const mesh = new THREE.Mesh(g, materials[i]);
    mesh.position.x = (i - 1) * 2.2;
    scene.add(mesh);
    return mesh;
  });

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h } = renderer.domElement;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);
  resize();

  let controls: OrbitControls | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    el.append(makePanel(scene, envMap));
  }

  renderer.setAnimationLoop((time) => {
    const t = time / 1000;
    meshes.forEach((m, i) => (m.rotation.y = t * (0.4 + i * 0.15)));
    if (preview) {
      // Cards have no panel: sweep the blur and swing the camera instead.
      scene.backgroundBlurriness = 0.5 + Math.sin(t) * 0.5;
      camera.position.set(Math.sin(t * 0.4) * 6, 1.2, Math.cos(t * 0.4) * 6);
      camera.lookAt(0, 0, 0);
    }
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    for (const g of geometries) g.dispose();
    for (const m of materials) m.dispose();
    envTarget.dispose();
    pmrem.dispose();
    room.dispose();
    renderer.dispose();
  };
};

export default mount;
