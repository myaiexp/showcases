// 3D headphones that spin and hop on a spring: animate() driving a Three.js group through threeEffect
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { THREE, stageHost, threeStage } from '../../shared/three.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const host = stageHost(el, preview);
  const stage = threeStage(host, { preview, position: [0, 0.2, 4.6] });

  // Headphones from primitives: a band (half a torus), two cups and two cushions.
  const phones = new THREE.Group();
  const body = new THREE.Group();
  body.position.y = -0.3;
  phones.add(body);
  const dark = new THREE.MeshStandardMaterial({ color: '#2b2f3a', roughness: 0.4, metalness: 0.6 });
  const paint = new THREE.MeshStandardMaterial({ color: '#4f8cff', roughness: 0.3, metalness: 0.2 });
  const foam = new THREE.MeshStandardMaterial({ color: '#15171d', roughness: 0.9 });
  body.add(new THREE.Mesh(new THREE.TorusGeometry(1, 0.07, 12, 40, Math.PI), dark));
  for (const side of [-1, 1]) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.3, 32), paint);
    cup.rotation.z = Math.PI / 2;
    cup.position.set(side * 1.02, 0, 0);
    const pad = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.12, 12, 32), foam);
    pad.rotation.y = Math.PI / 2;
    pad.position.set(side * 0.86, 0, 0);
    body.add(cup, pad);
  }
  stage.scene.add(phones);
  phones.rotation.y = 0.5;

  const ui = panel(el);
  if (preview) ui.el.remove();
  let turns = 0;
  let bounce = 0.35;
  let duration = 0.8;

  const scope = scopeMotion(el, () => {
    const spin = (): void => {
      turns++;
      // Initial values are read from the group, so there is no from keyframe. Each call reuses the
      // same motion value, so a spring started mid-spin inherits the speed of the one before it.
      animate(phones, { rotateY: 28 + turns * 360 }, { type: 'spring', visualDuration: duration, bounce });
      animate(phones, { y: [null, 0.45, 0], scale: [null, 1.12, 1] }, { duration: 0.8, times: [0, 0.4, 1], ease: 'easeOut' });
    };

    if (preview) {
      const tick = (): void => {
        spin();
        delay(tick, 2.2);
      };
      delay(tick, 0.4);
      return;
    }
    host.addEventListener('pointerdown', spin);
    host.style.cursor = 'pointer';
    ui.button('Spin', spin);
  });

  if (!preview) {
    ui.slider('bounce', { min: 0, max: 0.8, step: 0.05, value: bounce }, (v) => (bounce = v));
    ui.slider('visual duration', { min: 0.3, max: 2, step: 0.1, value: duration }, (v) => (duration = v));
    hint(el, 'Click the headphones, or the button. Click again mid-spin: the new spring keeps the speed of the old one instead of restarting.');
  }

  return () => {
    scope.cancel();
    ui.dispose();
    stage.dispose();
  };
};

export default mount;
