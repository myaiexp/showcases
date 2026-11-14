// "View from front / side / top" buttons that fly the camera on a spring, plus a lens (fov) slider
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { THREE, stageHost, threeStage } from '../../shared/three.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

type View = 'Front' | 'Side' | 'Top' | '3/4';
// Camera positions. Top is nudged off the vertical so "up" stays defined while the camera looks down.
const VIEWS: Record<View, { x: number; y: number; z: number }> = {
  Front: { x: 0, y: 0.8, z: 5 },
  Side: { x: 5, y: 0.8, z: 0 },
  Top: { x: 0, y: 6, z: 0.8 },
  '3/4': { x: 3.4, y: 2.4, z: 3.4 },
};

const mount: Mount = (el, { preview }) => {
  const host = stageHost(el, preview, 320);
  host.style.position = 'relative';
  const stage = threeStage(host, { preview, position: [3.4, 2.4, 3.4], fov: 40 });
  const { camera } = stage;

  // A speaker (body, two drivers, a grille strip) on a grid, so the camera motion reads.
  const grid = new THREE.GridHelper(10, 20, 0x5b6ee1, 0x2c3353);
  grid.position.y = -0.5;
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1, 1), new THREE.MeshStandardMaterial({ color: '#3b4252', roughness: 0.6 }));
  const driverMat = new THREE.MeshStandardMaterial({ color: '#f1b72c', roughness: 0.4 });
  for (const x of [-0.55, 0.55]) {
    const d = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 32), driverMat);
    d.rotation.x = Math.PI / 2;
    d.position.set(x, 0, 0.5);
    body.add(d);
  }
  const strip = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.02), new THREE.MeshStandardMaterial({ color: '#4f8cff' }));
  strip.position.set(0, 0.38, 0.51);
  body.add(strip);
  stage.scene.add(grid, body);

  const tag = document.createElement('span');
  tag.className = 'tag';
  host.append(tag);

  let fov = 40;
  const cleanups: (() => void)[] = [];
  const scope = scopeMotion(el, () => {
    const goto = (name: View): void => {
      tag.textContent = `${name} view`;
      // A camera is an Object3D, so x, y and z are its position. One spring moves all three.
      animate(camera, VIEWS[name], { type: 'spring', visualDuration: 1, bounce: 0 });
    };
    goto('3/4');

    if (preview) {
      const order: View[] = ['Front', 'Side', 'Top', '3/4'];
      let i = 0;
      const tick = (): void => {
        goto(order[i++ % order.length]!);
        delay(tick, 2.2);
      };
      delay(tick, 1);
      return;
    }
    const ui = panel(el);
    cleanups.push(() => ui.dispose());
    for (const name of Object.keys(VIEWS) as View[]) ui.button(name, () => goto(name));
    // Any other property is set as it is: fov is a plain number on the camera. The stage
    // calls updateProjectionMatrix() every frame, which the docs say an animated fov needs.
    ui.slider('lens (fov)', { min: 15, max: 90, step: 1, value: fov }, (v) => {
      fov = v;
      animate(camera, { fov }, { type: 'spring', visualDuration: 0.4, bounce: 0 });
    });
    hint(el, 'Press a view: the camera swings there on one spring. Drag the lens slider: a low fov zooms in and flattens, a high one is a wide-angle.');
  });

  return () => {
    scope.cancel();
    for (const c of cleanups) c();
    stage.dispose();
  };
};

export default mount;
