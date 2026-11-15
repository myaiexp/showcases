// addEvent(functionName, time, parameter): the callback receives the parameter object
import { AnimationClip, AnimationVector3Curve, type PBRMaterial, Script, Transform, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';
import { lin, tick } from '../../shared/gfx-kit.ts';

interface Swatch {
  name: string;
  color: [number, number, number];
}

class Painter extends Script {
  material!: PBRMaterial;
  last = '';
  paint(swatch: Swatch): void {
    this.material.baseColor.set(...lin(swatch.color), 1);
    this.last = swatch.name;
  }
}

const mount: Mount = async (el, ctx) => {
  const { stage, engine, cube, material, say } = await cubeStage(el, ctx, { size: 1.5 });
  const painter = cube.addComponent(Painter);
  painter.material = material;
  const clip = new AnimationClip('turn');
  const spin = new AnimationVector3Curve();
  keys(spin, [[0, new Vector3(0, 0, 0)], [4, new Vector3(0, 360, 0)]]);
  clip.addCurveBinding('', Transform, 'rotation', spin);
  const swatches: Swatch[] = [
    { name: 'red', color: [1, 0.2, 0.2] },
    { name: 'green', color: [0.3, 0.9, 0.3] },
    { name: 'blue', color: [0.3, 0.45, 1] },
    { name: 'yellow', color: [1, 0.85, 0.2] },
  ];
  // The (functionName, time, parameter) overload: one call per event, parameter handed to paint().
  swatches.forEach((swatch, i) => clip.addEvent('paint', i, swatch));
  playClip(engine, cube, clip);
  tick(cube, () => say(`clip.addEvent("paint", t, { name, color })\nlast parameter: ${painter.last || 'none yet'}`));
  return stage.dispose;
};

export default mount;
