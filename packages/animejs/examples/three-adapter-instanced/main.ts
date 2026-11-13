// Three.js adapter instancing: getInstances() proxies animated with a 3D stagger grid, plus commitChanges()
import { animate, stagger, utils } from 'animejs';
import { commitChanges, getInstances } from 'animejs/adapters/three';
import * as THREE from 'three';
import type { Mount } from '@/types.ts';
import { createPanel, createStage } from '../../shared/three-stage.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const readout = document.createElement('pre');
  readout.className = 'readout';
  const n = preview ? 4 : 6; // cubes per axis
  const cell = 2 / n;
  const spread = ((n - 1) / 2) * cell;
  const grid: [number, number, number] = [n, n, n];
  const axis = (a: 'x' | 'y' | 'z', span = spread) => stagger([-span, span], { grid, axis: a });

  const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(cell, cell, cell), new THREE.MeshLambertMaterial(), n * n * n);
  // One proxy per slot; the array can be passed straight to animate().
  const instances = getInstances(mesh) as NonNullable<ReturnType<typeof getInstances>[number]>[];
  let note = 'click a button';
  const stage = createStage(el, {
    preview,
    cameraPosition: [0, 0, 3],
    onFrame: () => {
      if (preview) return;
      const first = instances[0]!;
      readout.textContent = [
        `instances.length     ${instances.length}`,
        `instances[0]         x ${first.x.toFixed(3)}  scale ${first.scale.toFixed(2)}`,
        note,
      ].join('\n');
    },
  });
  stage.scene.add(mesh, new THREE.AmbientLight('#ffffff', 0.5));
  const sun = new THREE.DirectionalLight('#ffffff', 2.5);
  sun.position.set(2, 3, 4);
  stage.scene.add(sun);

  const palette = ['#ff5050', '#ffa040', '#ffe050', '#50e070', '#50b0ff', '#a070ff', '#ff70c0'];

  const anims = [
    animate(mesh, { rotateY: 360, rotateX: 360, duration: 24000, loop: true, ease: 'linear' }),
    animate(instances, {
      color: palette,
      x: [axis('x', spread * 0.25), axis('x')],
      y: [axis('y', spread * 0.25), axis('y')],
      z: [axis('z', spread * 0.25), axis('z')],
      scale: [0.1, 0.25, 0.1],
      delay: stagger([0, 3000], { grid, from: 'center', reversed: true }),
      duration: 2000,
      loopDelay: 500,
      loop: true,
      alternate: true,
      ease: 'inOutQuad',
    }),
  ];

  if (!preview) {
    const panel = createPanel(el);
    panel.button('commitChanges(mesh), then read instanceMatrix', () => {
      commitChanges(mesh);
      const m = mesh.instanceMatrix.array;
      note = `instanceMatrix[0] translation = (${m[12]!.toFixed(3)}, ${m[13]!.toFixed(3)}, ${m[14]!.toFixed(3)})`;
    });
    panel.button('utils.set(instances[0], { scale: 0 }) hides one slot', () => {
      utils.set(instances[0]!, { scale: 0 });
      note = 'scale 0 hides an InstancedMesh slot (visible is a no-op there); the running tween will overwrite it';
    });
    el.append(readout);
  }

  return () => {
    anims.forEach((a) => a.revert());
    stage.destroy();
  };
};

export default mount;
