// Many houses from two source meshes with createInstance, or independent clones
import { ArcRotateCamera, Color3, HemisphericLight, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { AbstractMesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createHouse } from './house.ts';
import './style.css';

// [house type (1 detached, 2 semi), rotation y, x, z]
const places: [1 | 2, number, number, number][] = [
  [1, -Math.PI / 16, -6.8, 2.5],
  [1, -Math.PI / 16, -4.5, 3],
  [1, -Math.PI / 3, -1.5, 4],
  [2, 15 * Math.PI / 16, -1.5, 6],
  [2, 15 * Math.PI / 16, -6.8, -1],
  [1, 5 * Math.PI / 4, 0.5, -3],
  [2, Math.PI + Math.PI / 2.5, 0.75, -5],
  [1, Math.PI + Math.PI / 2.1, 2.5, -5],
  [1, Math.PI / 2.25, 4.5, 2],
  [2, Math.PI / 2.5, 4.5, 4],
  [1, -Math.PI / 4, 2, 6],
  [2, -Math.PI / 4, -3, -4],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor.set(0.72, 0.85, 0.95, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2.5, Math.PI / 3, 20, new Vector3(0, 0, 0), scene);
  camera.upperBetaLimit = Math.PI / 2.2;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.4), scene);
  const ground = MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.35, 0.6, 0.3);
  ground.material = groundMat;

  // One detached and one semi-detached source house; the rest are copies of them.
  const sources = { 1: createHouse(scene, 1), 2: createHouse(scene, 2) };
  sources[1].position.set(-8, 0, -4);
  sources[2].position.set(8, 0, -4);

  let copies: AbstractMesh[] = [];
  const build = (useInstances: boolean): void => {
    copies.forEach((m) => m.dispose());
    copies = places.map(([type, rotY, x, z], i) => {
      const src = sources[type];
      const copy = useInstances ? src.createInstance(`house${i}`) : src.clone(`house${i}`);
      copy.rotation.y = rotY;
      copy.position.set(x, 0, z);
      return copy;
    });
  };
  build(true);

  let panel: HTMLElement | null = null;
  if (!ctx.preview) {
    panel = document.createElement('div');
    panel.className = 'panel';
    const info = document.createElement('span');
    const setInfo = (mode: string): void => {
      info.textContent = `${mode}: ${places.length} houses made from 2 source meshes`;
    };
    setInfo('createInstance');
    for (const [text, inst] of [['createInstance', true], ['clone', false]] as const) {
      const b = document.createElement('button');
      b.classList.add('btn');
      b.textContent = text;
      b.onclick = () => {
        build(inst);
        setInfo(text);
      };
      panel.append(b);
    }
    panel.append(info);
    el.append(panel);
  }

  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.006;
  });
  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
