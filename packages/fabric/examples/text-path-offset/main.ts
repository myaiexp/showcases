// Text: pathStartOffset slides text along its path, and wraps around a closed one
import { Canvas, FabricText, Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { BLUE, INK } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Closed path, so the offset wraps: past the end the letters come back at the start.' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  // A circle written as two arcs, radius 80.
  const path = new Path('M 0 80 A 80 80 0 1 1 160 80 A 80 80 0 1 1 0 80 Z', { stroke: BLUE, strokeWidth: 1, fill: '', objectCaching: false });
  const text = new FabricText('round and round we go · ', {
    left: 180,
    top: 120,
    fontFamily: 'Kalam',
    fontSize: 26,
    fill: INK,
    path,
    pathStartOffset: 0,
  });
  canvas.add(text);

  const say = status(stage);
  const set = (v: number): void => {
    text.set('pathStartOffset', v);
    say(`pathStartOffset: ${v.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  set(0);

  if (stage.bar) slider(stage.bar, 'pathStartOffset', 0, 500, 1, 0, set);
  else stage.loop((_dt, t) => set((t * 60) % 500));
  return stage.dispose;
};

export default mount;
