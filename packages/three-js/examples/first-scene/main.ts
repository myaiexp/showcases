// Spinning green cube: scene, camera, WebGPURenderer and setAnimationLoop
import * as THREE from 'three/webgpu';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  // The three things every three.js app needs: a scene, a camera and a renderer.
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 2.5;

  // WebGPURenderer uses WebGPU where available and falls back to WebGL 2.
  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Match the drawing buffer and the camera's aspect to the canvas's CSS size.
  const resize = (): void => {
    const { clientWidth: w, clientHeight: h } = renderer.domElement;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  // WebGPU initialises asynchronously. setAnimationLoop would wait for it on its own;
  // awaiting init() here keeps the mount pending until the renderer is ready.
  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;
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
