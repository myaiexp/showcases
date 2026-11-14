// a factory makes one effect instance per element
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';
import { DriftEffect } from './drift-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Effects keep state (here a buffer and a phase), so each element gets its own.
  const makeEffect = (speed: number) => new DriftEffect({ speed });

  const words: [string, string, number][] = [
    ['slow', '#7fd1ff', 1],
    ['mid', '#ffd37f', 2.6],
    ['fast', '#ff8fb1', 5],
  ];
  for (const [text, color, speed] of words) {
    const h = headline(text, color);
    h.style.fontSize = ctx.preview ? '28px' : '56px';
    h.style.margin = ctx.preview ? '0 14px' : '0 28px';
    stage.root.append(h);
    await vfx.add(h, { effect: makeEffect(speed) });
  }
  stage.say('Three elements, three DriftEffect instances from one factory: each keeps its own trail buffer and phase.');
  return () => stage.dispose();
};

export default mount;
