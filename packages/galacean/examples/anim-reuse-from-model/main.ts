// Reuse another model's animation: same node names, so its controller drives this character
import { Animator } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { plainRobotGlb } from '../../shared/anim-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, loadGlb, rig } from '../../shared/model-kit.ts';
import { steps } from '../../shared/gfx-kit.ts';

const NAMES = ['Walk', 'Run', 'Wave', 'Jump'] as const;

const mount: Mount = async (el, ctx) => {
  // The character has meshes and nodes but no animation; the animation model is the plain robot.
  const r = await rig(el, ctx, plainRobotGlb, { camera: [0, 1.7, 6], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, root, model, say } = r;
  const animationGltf = await loadGlb(stage, robotGlb());
  if (ctx.signal.aborted) {
    stage.dispose();
    return NOOP;
  }
  const source = animationGltf.instantiateSceneRoot();
  source.isActive = false;
  root.addChild(source);
  const animator = model.getComponent(Animator) ?? model.addComponent(Animator);
  animator.animatorController = source.getComponent(Animator)!.animatorController;
  const play = (name: string): void => {
    animator.play(name);
    say(`blue robot has no clips of its own\nplays "${name}" from the other model's controller`);
  };
  if (stage.preview) steps(root, 2, NAMES.length, (i) => play(NAMES[i]!));
  else {
    play('Walk');
    NAMES.forEach((n) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn';
      b.textContent = n;
      b.onclick = () => play(n);
      stage.bar.append(b);
    });
  }
  return stage.dispose;
};

export default mount;
