// Three.js adapter overview: one animate() call per object, in degrees and CSS colors
import { animate } from 'animejs';
import 'animejs/adapters/three';
import * as THREE from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/three-stage.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const readout = document.createElement('pre');
  readout.className = 'readout';

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.28, preview ? 64 : 128, preview ? 8 : 16),
    new THREE.MeshStandardMaterial({ color: '#ff8800', roughness: 0.35, transparent: true }),
  );
  const light = new THREE.PointLight('#ffffff', 40, 20, 1.2);
  light.position.set(2, 2, 4);

  const stage = createStage(el, {
    preview,
    onFrame: () => {
      if (preview) return;
      const m = knot.material as THREE.MeshStandardMaterial;
      readout.textContent = [
        `mesh.position.x      ${knot.position.x.toFixed(2)}`,
        `mesh.rotation.y      ${knot.rotation.y.toFixed(2)} rad (${THREE.MathUtils.radToDeg(knot.rotation.y).toFixed(0)} deg)`,
        `material.opacity     ${m.opacity.toFixed(2)}`,
        `material.color       #${m.color.getHexString()}`,
        `scene.background     #${(stage.scene.background as THREE.Color).getHexString()}`,
        `camera.fov           ${stage.camera.fov.toFixed(1)}`,
      ].join('\n');
    },
  });
  stage.scene.background = new THREE.Color('#1a1a2e');
  stage.scene.add(knot, light, new THREE.AmbientLight('#ffffff', 0.4));

  const common = { duration: 3000, loop: true, alternate: true, ease: 'inOutSine' } as const;
  // Same call shape for every target: names are flattened onto the object.
  const anims = [
    animate(knot, {
      x: [-1.2, 1.2], // mesh.position.x
      rotateY: [0, 360], // mesh.rotation.y, written in degrees
      rotateX: [0, 40],
      opacity: [1, 0.55], // mesh.material.opacity
      color: ['#ff8800', '#00c8ff'], // mesh.material.color, any CSS color
      ...common,
    }),
    animate(light, { color: ['#ffffff', '#fffacd', '#ff80c0'], ...common }),
    animate(stage.scene, { background: ['#1a1a2e', '#2e1a2a'], ...common }),
    animate(stage.camera, { fov: [55, 35], ...common }),
  ];
  if (!preview) el.append(readout);

  return () => {
    anims.forEach((a) => a.revert());
    stage.destroy();
  };
};

export default mount;
