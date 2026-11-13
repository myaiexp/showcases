// Three.js adapter transforms: skew, transformOrigin and the automatic visibility toggle
import { animate, utils } from 'animejs';
import 'animejs/adapters/three';
import * as THREE from 'three';
import type { Mount } from '@/types.ts';
import { createPanel, createStage } from '../../shared/three-stage.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const readout = document.createElement('pre');
  readout.className = 'readout';
  const names = ['rotate + y', 'skewX / skewZ', 'scale + origin'];

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const makeCube = (x: number): THREE.Mesh => {
    const cube = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
    cube.position.set(x, 0.5, 0);
    return cube;
  };
  const lift = makeCube(-2);
  const skewed = makeCube(0);
  const scaled = makeCube(2);
  const cubes = [lift, skewed, scaled];
  const stage = createStage(el, {
    preview,
    cameraPosition: [0, 3, 8],
    fov: 40,
    onFrame: () => {
      if (preview) return;
      readout.textContent = cubes
        .map((c, i) => `${(names[i] ?? '').padEnd(15)} scale.x ${c.scale.x.toFixed(2)}  visible ${c.visible}`)
        .join('\n');
    },
  });
  stage.camera.lookAt(0, 0.2, 0);
  stage.scene.add(...cubes, new THREE.AmbientLight('#ffffff', 0.6));
  const sun = new THREE.DirectionalLight('#ffffff', 2.5);
  sun.position.set(2, 3, 4);
  stage.scene.add(sun);

  utils.set(lift, { color: '#ff5050' });
  // transformOriginY / transformOrigin shift the pivot used by skew and scale.
  utils.set(skewed, { color: '#ffd24a', transformOriginY: -0.5 });
  utils.set(scaled, { color: '#4adf7a', transformOrigin: '-.5 -.5 .5' });

  const common = { duration: 2000, loop: true, ease: 'inOutSine' } as const;
  const anims = [
    animate(lift, { y: [0.5, 1, 0.5], rotateY: 180, ...common }),
    animate(skewed, { skewX: [-30, 30, 0, 0], skewZ: [0, 0, -30, 30], alternate: true, ...common }),
    animate(scaled, { scale: [1, 0.25, 1], transformOrigin: ['-.5 -.5 .5', '.5 .5 -.5'], alternate: true, ...common }),
  ];

  if (!preview) {
    const panel = createPanel(el);
    let hidden = false;
    panel.button('utils.set(cube, { scaleX: 0 }) toggles visible', () => {
      hidden = !hidden;
      utils.set(lift, { scaleX: hidden ? 0 : 1 });
    });
    panel.button('direct cube.scale.x = 0 leaves visible alone', () => {
      lift.scale.x = lift.scale.x === 0 ? 1 : 0;
    });
    el.append(readout);
  }

  return () => {
    anims.forEach((a) => a.revert());
    stage.destroy();
  };
};

export default mount;
