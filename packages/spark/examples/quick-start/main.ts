// The docs' quick start: one SplatMesh loaded from a URL, spinning in front of the camera
import * as THREE from 'three';
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { BUTTERFLY_URL, pushButterfly } from '../../shared/subjects.ts';
import { overlay } from '../../shared/controls.ts';

const mount: Mount = (el, { preview }) => {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `display:block;width:100%;height:${preview ? 200 : 440}px`;
  el.append(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 2, 0.01, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));

  // Spark 2 needs a SparkRenderer in the scene; it draws every SplatMesh it finds.
  const spark = new SparkRenderer({ renderer });
  scene.add(spark);

  // Cards never download, so they spin a procedural stand-in built in the browser.
  const butterfly = preview
    ? new SplatMesh({ constructSplats: (splats) => pushButterfly(splats) })
    : new SplatMesh({ url: BUTTERFLY_URL });
  if (!preview) {
    // The file is stored in OpenCV axes (y down, z forward): flip it 180° about X.
    butterfly.quaternion.set(1, 0, 0, 0);
    const status = overlay(el, 'Loading butterfly.spz…');
    butterfly.initialized.then(
      (mesh) => (status.textContent = `${mesh.packedSplats?.numSplats ?? 0} splats`),
      () => (status.textContent = 'Could not load butterfly.spz'),
    );
  }
  butterfly.position.set(0, 0, -3);
  scene.add(butterfly);

  const resize = (): void => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
    butterfly.rotation.y += 0.01;
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    butterfly.dispose();
    spark.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };
};

export default mount;
