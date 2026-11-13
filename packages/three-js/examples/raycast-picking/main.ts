// Hover picking: a Raycaster cast from the pointer highlights the nearest cube it hits
import * as THREE from 'three/webgpu';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf2f2f2);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  camera.position.z = 30;

  // Parent the camera to a pole so spinning the pole orbits the camera around the scene.
  const pole = new THREE.Object3D();
  pole.add(camera);
  scene.add(pole);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x888899, 1.2));
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(-1, 2, 4);
  camera.add(light); // lights parented to the camera move with it

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  // Deterministic pseudo-random layout so the scene looks the same on every mount.
  let seed = 7;
  const rand = (min: number, max: number): number => {
    seed = (seed * 16807) % 2147483647;
    return min + (max - min) * (seed / 2147483647);
  };

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const materials: THREE.MeshStandardMaterial[] = [];
  const cubes: THREE.Mesh[] = [];
  const count = preview ? 40 : 100;
  for (let i = 0; i < count; i++) {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(rand(0, 1), rand(0.5, 1), 0.5),
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(rand(-20, 20), rand(-20, 20), rand(-20, 20));
    cube.rotation.set(rand(0, Math.PI), rand(0, Math.PI), 0);
    cube.scale.set(rand(3, 6), rand(3, 6), rand(3, 6));
    cube.name = `cube ${i}`;
    scene.add(cube);
    cubes.push(cube);
    materials.push(material);
  }

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h2 } = renderer.domElement;
    if (w === 0 || h2 === 0) return;
    renderer.setSize(w, h2, false);
    camera.aspect = w / h2;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  // Pointer in normalised device coordinates: -1..+1, with +y up (hence the flip).
  const pointer = new THREE.Vector2(-100000, -100000); // far outside = nothing to pick
  const canvas = renderer.domElement;
  const onMove = (e: PointerEvent): void => {
    const rect = canvas.getBoundingClientRect();
    pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
  };
  const onLeave = (): void => {
    pointer.set(-100000, -100000);
  };

  const readout = h('output', { class: 'readout' }, 'Move the pointer over the cubes.');
  if (!preview) {
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    el.append(h('div', { class: 'panel' }, readout));
  }

  const raycaster = new THREE.Raycaster();
  let picked: THREE.Mesh | null = null;

  const pick = (time: number): void => {
    // Restore the previous pick before choosing a new one.
    if (picked) (picked.material as THREE.MeshStandardMaterial).emissive.setHex(0);
    picked = null;
    // Cast a ray from the camera through the pointer; hits come back nearest first.
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(cubes);
    if (hits.length === 0) {
      readout.textContent = 'Nothing under the pointer.';
      return;
    }
    const first = hits[0]!;
    picked = first.object as THREE.Mesh;
    (picked.material as THREE.MeshStandardMaterial).emissive.setHex((time * 8) % 2 > 1 ? 0xffff00 : 0xff0000);
    readout.textContent = `${picked.name}, ${first.distance.toFixed(1)} units away, ${hits.length} hit${hits.length > 1 ? 's' : ''} along the ray`;
  };

  await renderer.init();
  resize();

  const t0 = performance.now();
  renderer.setAnimationLoop(() => {
    const time = (performance.now() - t0) / 1000;
    pole.rotation.y = time * 0.1;
    // In a card nobody can point, so a fake pointer drifts in a circle.
    if (preview) pointer.set(Math.cos(time * 1.3) * 0.5, Math.sin(time * 1.7) * 0.5);
    pick(time);
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerleave', onLeave);
    geometry.dispose();
    for (const m of materials) m.dispose();
    renderer.dispose();
  };
};

export default mount;
