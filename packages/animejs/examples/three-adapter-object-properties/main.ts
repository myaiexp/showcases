// Three.js adapter object properties: texture, fog, light, scene and camera names in one timeline
import { createTimeline } from 'animejs';
import 'animejs/adapters/three';
import * as THREE from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/three-stage.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const readout = document.createElement('pre');
  readout.className = 'readout';

  // 8x8 checker as a DataTexture so there is something to scroll, repeat and rotate.
  const data = new Uint8Array(8 * 8 * 4);
  for (let i = 0; i < 64; i++) {
    const on = (i + Math.floor(i / 8)) % 2 === 0;
    data.set(on ? [240, 240, 240, 255] : [50, 60, 90, 255], i * 4);
  }
  const texture = new THREE.DataTexture(data, 8, 8);
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.center.set(0.5, 0.5);
  texture.needsUpdate = true;

  const wall = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), new THREE.MeshBasicMaterial({ map: texture }));
  wall.position.z = -3;
  const ball = new THREE.Mesh(new THREE.SphereGeometry(1, preview ? 24 : 48, preview ? 16 : 32), new THREE.MeshLambertMaterial());
  const lamp = new THREE.PointLight('#ffffff', 60, 30, 1.5);
  lamp.position.set(2, 2, 4);
  const fog = new THREE.Fog('#202040', 4, 14);

  const stage = createStage(el, {
    preview,
    onFrame: () => {
      if (preview) return;
      const c = (col: THREE.Color): string => `#${col.getHexString()}`;
      readout.textContent = [
        `texture.offset.x   ${texture.offset.x.toFixed(2)}    texture.repeat.x ${texture.repeat.x.toFixed(2)}`,
        `texture.rotation   ${texture.rotation.toFixed(2)} rad`,
        `fog.color          ${c(fog.color)}    fog.near ${fog.near.toFixed(1)}`,
        `light.color        ${c(lamp.color)}    light.intensity ${lamp.intensity.toFixed(0)}`,
        `scene.background   ${c(stage.scene.background as THREE.Color)}`,
        `camera.fov         ${stage.camera.fov.toFixed(1)} (focalLength ${stage.camera.getFocalLength().toFixed(1)} mm)`,
      ].join('\n');
    },
  });
  stage.own(texture);
  stage.scene.add(wall, ball, lamp, new THREE.AmbientLight('#ffffff', 0.3));
  stage.scene.fog = fog;
  stage.scene.background = new THREE.Color('#202040');

  // The adapter's names per target type: offsetX / repeatX / rotation (Texture), color + near (Fog),
  // color (Light), background (Scene), focalLength (PerspectiveCamera).
  const tl = createTimeline({ defaults: { duration: 3000, ease: 'inOutSine' }, loop: true, alternate: true })
    .add(texture, { offsetX: [0, 1], repeatX: [1, 2.5], rotation: [0, 45] }, 0)
    .add(fog, { color: ['#202040', '#402030'], near: [4, 8] }, 0)
    .add(lamp, { color: ['#ffffff', '#ffb060'], intensity: [60, 120] }, 0)
    .add(stage.scene, { background: ['#202040', '#402030'] }, 0)
    .add(stage.camera, { focalLength: [30, 55] }, 0);
  if (!preview) el.append(readout);

  return () => {
    tl.revert();
    stage.destroy();
  };
};

export default mount;
