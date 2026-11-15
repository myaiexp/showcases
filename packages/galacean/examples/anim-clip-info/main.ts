// Inspect a clip: its length, curve bindings and events, read from the AnimationClip itself
import { AnimationEvent, AnimationClip, AnimationFloatCurve, AnimationVector3Curve, Transform, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { MeshRenderer } from '@galacean/engine';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, cube } = await cubeStage(el, ctx, { size: 1.4 });
  const clip = new AnimationClip('inspected');
  const move = new AnimationVector3Curve();
  keys(move, [[0, new Vector3(-2, 0, 0)], [2.5, new Vector3(2, 0, 0)]]);
  clip.addCurveBinding('', Transform, 'position', move);
  const roughness = new AnimationFloatCurve();
  keys(roughness, [[0, 0.1], [4, 0.9]]);
  clip.addCurveBinding('', MeshRenderer, 'material.roughness', roughness);
  const event = new AnimationEvent();
  event.functionName = 'ping';
  event.time = 1;
  clip.addEvent(event);
  playClip(engine, cube, clip);
  panel(stage).text(
    `${clip.name}: length ${clip.length} s (the last key of any curve)\n${clip.curveBindings.map((b) => `- "${b.relativePath}" ${b.property}: ${b.curve.keys.length} keys`).join('\n')}\nevents: ${clip.events.map((e) => `${e.functionName}@${e.time}`).join(', ')}`,
  );
  return stage.dispose;
};

export default mount;
