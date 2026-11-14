// gsplatNormal and the splat axis helpers, used to colour splats by orientation
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, controlBar, select } from '../../shared/controls.ts';
import { pushRolledTorus } from './torus.ts';

const AXES = ['gsplatNormal', 'gsplatXAxis', 'gsplatYAxis', 'gsplatZAxis'] as const;
type Axis = (typeof AXES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1, 2.8], orbit: 0.2 });
  const torus = new SplatMesh({ constructSplats: (splats) => pushRolledTorus(splats, ctx.preview ? 14000 : 30000) });
  stage.scene.add(torus);

  let axis: Axis = 'gsplatNormal';
  let absolute = true;

  const colourByAxis = () =>
    dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
      if (!gsplat) throw new Error('no gsplat');
      // Each helper returns a unit vec3 in the splat's object space.
      const dir =
        axis === 'gsplatNormal'
          ? dyno.gsplatNormal(gsplat) // whichever local axis is thinnest
          : axis === 'gsplatXAxis'
            ? dyno.gsplatXAxis(gsplat)
            : axis === 'gsplatYAxis'
              ? dyno.gsplatYAxis(gsplat)
              : dyno.gsplatZAxis(gsplat);
      // An axis and its opposite describe the same splat, so abs() folds the sign away.
      const signed = absolute ? dyno.abs(dir) : dyno.add(dyno.mul(dir, dyno.dynoConst('float', 0.5)), dyno.dynoConst('float', 0.5));
      return { gsplat: dyno.combineGsplat({ gsplat, rgb: signed }) };
    });

  const install = (): void => {
    torus.objectModifiers = [colourByAxis()];
    torus.updateGenerator();
  };
  install();

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'colour by', AXES, (v) => ((axis = v), install()));
    checkbox(bar, 'fold sign with abs()', true, (v) => ((absolute = v), install()));
  } else {
    // Cycle through the helpers in the card.
    let n = 0;
    const timer = window.setInterval(() => {
      axis = AXES[++n % AXES.length]!;
      install();
    }, 2200);
    stage.run((_, dt) => (torus.rotation.x += dt * 0.15));
    return () => (clearInterval(timer), stage.dispose());
  }

  stage.run((_, dt) => (torus.rotation.x += dt * 0.15));
  return () => stage.dispose();
};

export default mount;
