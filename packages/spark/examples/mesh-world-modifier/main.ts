// worldModifiers in sequence: a fixed-in-world ripple, then a colour band
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';
import { makeBand, makeRipple } from './modifiers.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.3, 4.2], target: [0, 0, 0], orbit: 0.08 });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  const amp = dyno.dynoFloat(0.12);
  const level = dyno.dynoFloat(-0.1);
  const ripple = makeRipple(amp);
  const band = makeBand(level);

  let space: 'world' | 'object' = 'world';
  let order: 'ripple, then band' | 'band, then ripple' = 'ripple, then band';
  const info = ctx.preview ? null : readout(el);

  // Same two modifiers, in whichever list and order the controls pick. A modifier list
  // only takes effect after updateGenerator().
  const apply = (): void => {
    const chain = order === 'ripple, then band' ? [ripple, band] : [band, ripple];
    knot.worldModifiers = space === 'world' ? chain : [];
    knot.objectModifiers = space === 'object' ? chain : [];
    knot.updateGenerator();
    if (info) info.textContent = `${space}Modifiers = [${order.replace(' then ', ' ')}]`;
  };
  apply();

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'list', ['world', 'object'] as const, (v) => ((space = v), apply()));
    select(bar, 'order', ['ripple, then band', 'band, then ripple'] as const, (v) => ((order = v), apply()));
    slider(bar, 'ripple amp', 0, 0.3, 0.01, amp.value, (v) => (amp.value = v));
    slider(bar, 'band level', -0.8, 0.8, 0.02, level.value, (v) => (level.value = v));
  }

  stage.run((time) => {
    // Slide the mesh through the scene: a world-space ripple stays put while it moves.
    knot.position.x = Math.sin(time * 0.6) * 1.1;
    knot.updateVersion();
  });
  return () => stage.dispose();
};

export default mount;
