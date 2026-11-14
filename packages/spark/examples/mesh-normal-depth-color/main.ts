// The exported normal and depth colour modifiers, switched on at runtime
import { SplatMesh, modifiers } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { pushFlatTorus } from './torus.ts';

const MODES = ['original colours', 'world normal colour', 'depth colour', 'depth colour, reversed'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.2, 2.6], orbit: 0.3 });
  const torus = new SplatMesh({ constructSplats: (splats) => pushFlatTorus(splats, ctx.preview ? 14000 : 30000) });
  stage.scene.add(torus);

  let mode: Mode = ctx.preview ? 'world normal colour' : 'original colours';
  let minDepth = 1.4;
  let maxDepth = 3.8;
  const info = ctx.preview ? null : readout(el);

  const apply = (): void => {
    if (mode === 'original colours') {
      torus.worldModifier = undefined;
      torus.updateGenerator();
    } else if (mode === 'world normal colour') {
      // Sets enableWorldToView, installs a worldModifier and calls updateGenerator() itself.
      modifiers.setWorldNormalColor(torus);
    } else {
      modifiers.setDepthColor(torus, minDepth, maxDepth, mode === 'depth colour, reversed');
    }
    if (info) info.textContent = `mode: ${mode}`;
  };
  apply();

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'modifier', MODES, (v) => ((mode = v), apply()));
    // The depth range is baked in as constants, so each change installs a fresh modifier.
    slider(bar, 'minDepth', 0.2, 3, 0.1, minDepth, (v) => ((minDepth = v), mode.startsWith('depth') && apply()));
    slider(bar, 'maxDepth', 2, 7, 0.1, maxDepth, (v) => ((maxDepth = v), mode.startsWith('depth') && apply()));
  } else {
    // Alternate the two modifiers in the card.
    const timer = window.setInterval(() => {
      mode = mode === 'world normal colour' ? 'depth colour' : 'world normal colour';
      apply();
    }, 3000);
    stage.run((_, dt) => (torus.rotation.x += dt * 0.2));
    return () => (clearInterval(timer), stage.dispose());
  }

  stage.run((_, dt) => (torus.rotation.x += dt * 0.2));
  return () => stage.dispose();
};

export default mount;
