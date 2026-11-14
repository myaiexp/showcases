// objectModifiers with a dynoBlock GsplatModifier that twists a pillar about Y
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, controlBar, slider } from '../../shared/controls.ts';
import { pushPillar } from './pillar.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.4, 3.2], orbit: 0.2 });
  const pillar = new SplatMesh({ constructSplats: (splats) => pushPillar(splats, ctx.preview ? 14000 : 30000) });
  stage.scene.add(pillar);

  // A uniform: changing its value reruns the same compiled program, no rebuild.
  const twist = dyno.dynoFloat(1.5);

  const twistModifier = dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
    if (!gsplat) throw new Error('no gsplat');
    const { center, quaternion } = dyno.splitGsplat(gsplat).outputs;
    const { y } = dyno.split(center).outputs;
    // Rotate every splat about Y by an angle that grows with its height.
    const half = dyno.mul(dyno.mul(y, twist), dyno.dynoConst('float', 0.5));
    const zero = dyno.dynoConst('float', 0);
    const rotate = dyno.combine({ vectorType: 'vec4', x: zero, y: dyno.sin(half), z: zero, w: dyno.cos(half) });
    return {
      gsplat: dyno.combineGsplat({
        gsplat,
        center: dyno.transformPos(center, { rotate }),
        quaternion: dyno.transformQuat(quaternion, { rotate }),
      }),
    };
  });

  // Assign the modifier list, then updateGenerator() so Spark rebuilds the pipeline.
  const setEnabled = (on: boolean): void => {
    pillar.objectModifiers = on ? [twistModifier] : [];
    pillar.updateGenerator();
  };
  setEnabled(true);

  if (!ctx.preview) {
    const bar = controlBar(el);
    checkbox(bar, 'objectModifiers on', true, setEnabled);
    slider(bar, 'twist (rad per unit)', -4, 4, 0.1, twist.value, (v) => (twist.value = v));
  }

  stage.run((time) => {
    // Sweep the uniform in cards; the slider owns it in the full view.
    if (ctx.preview) twist.value = 2.5 * Math.sin(time * 0.8);
    // A uniform edit alone does not mark the mesh dirty, so ask for regeneration.
    pillar.updateVersion();
  });
  return () => stage.dispose();
};

export default mount;
