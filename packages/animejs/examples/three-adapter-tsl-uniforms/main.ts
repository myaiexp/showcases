// Three.js adapter + TSL: uniform() slots on a NodeMaterial and bare shared UniformNodes (WebGPURenderer)
import { animate } from 'animejs';
import 'animejs/adapters/three';
import * as THREE from 'three';
import { MeshBasicNodeMaterial, WebGPURenderer } from 'three/webgpu';
import { positionLocal, uniform } from 'three/tsl';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/three-stage.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  const renderer = new WebGPURenderer({ alpha: true, antialias: !preview });
  await renderer.init(); // required before render(); falls back to WebGL2 without WebGPU
  if (signal.aborted) {
    renderer.dispose();
    return () => {};
  }
  const readout = document.createElement('pre');
  readout.className = 'readout';

  const geometry = new THREE.IcosahedronGeometry(0.9, preview ? 2 : 4);

  // Mesh A: slots assigned to uniform() nodes, animated by slot name on the material.
  const slotted = new MeshBasicNodeMaterial();
  const colorSlot = uniform(new THREE.Color('#ff0000'));
  const offsetSlot = uniform(new THREE.Vector3());
  slotted.colorNode = colorSlot;
  (slotted as unknown as Record<string, unknown>).offsetNode = offsetSlot;
  slotted.positionNode = positionLocal.add(offsetSlot);

  // Meshes B and C share two bare nodes: animate the node once, both materials follow.
  const sharedColor = uniform(new THREE.Color('#00aaff'));
  const sharedScale = uniform(1);
  const makeShared = (): MeshBasicNodeMaterial => {
    const m = new MeshBasicNodeMaterial();
    m.colorNode = sharedColor;
    m.positionNode = positionLocal.mul(sharedScale);
    return m;
  };
  const a = new THREE.Mesh(geometry, slotted);
  const b = new THREE.Mesh(geometry, makeShared());
  const c = new THREE.Mesh(geometry, makeShared());
  a.position.x = -2.4;
  c.position.x = 2.4;

  const stage = createStage(el, {
    preview,
    cameraPosition: [0, 0, 7],
    renderer,
    onFrame: () => {
      if (preview) return;
      readout.textContent = [
        `slot colorNode      #${colorSlot.value.getHexString()}`,
        `slot offsetNode.y   ${offsetSlot.value.y.toFixed(2)}`,
        `shared color node   #${sharedColor.value.getHexString()}`,
        `shared scale node   ${sharedScale.value.toFixed(2)}`,
      ].join('\n');
    },
  });
  stage.scene.add(a, b, c);

  const loop = { duration: 2400, loop: true, alternate: true, ease: 'inOutSine' } as const;
  const anims = [
    animate(slotted, { colorNode: ['#ff0000', '#00ff88'], offsetNodeY: [-0.6, 0.6], ...loop }),
    animate(sharedColor, { color: ['#00aaff', '#ffcc00'], ...loop }),
    animate(sharedScale, { value: [0.6, 1.3], ...loop }),
    animate([a, b, c], { rotateY: 360, duration: 8000, loop: true, ease: 'linear' }),
  ];
  if (!preview) el.append(readout);

  return () => {
    anims.forEach((x) => x.revert());
    stage.destroy();
  };
};

export default mount;
