// Text: pathSide puts the text on either side of the path, pathAlign picks the glyph anchor
import { Canvas, FabricText, Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { cycle, INK, RED } from '../../shared/text.ts';

const SIDES = ['left', 'right'] as const;
const ALIGNS = ['baseline', 'center', 'ascender', 'descender'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: "pathAlign decides which line of each glyph sits on the path: its baseline, the middle, the ascender line or the descender line. It is marked BETA in the source.",
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const path = new Path('M 0 90 C 70 -30 210 -30 280 90', { stroke: RED, strokeWidth: 1.5, fill: '', objectCaching: false });
  const text = new FabricText('Hamburg', { left: 180, top: 135, fontFamily: 'Inter', fontSize: 38, fontWeight: 600, fill: INK, path });
  canvas.add(text);

  const say = status(stage);
  let side: (typeof SIDES)[number] = 'left';
  let align: (typeof ALIGNS)[number] = 'baseline';
  const apply = (): void => {
    text.set({ pathSide: side, pathAlign: align });
    say(`pathSide: '${side}', pathAlign: '${align}'`);
    canvas.requestRenderAll();
  };
  apply();

  if (stage.bar) {
    select(stage.bar, 'pathSide', SIDES, (v) => ((side = v), apply()));
    select(stage.bar, 'pathAlign', ALIGNS, (v) => ((align = v), apply()));
  } else {
    cycle(stage, [0, 1, 2, 3, 4, 5, 6, 7], 1000, (i) => {
      side = SIDES[Math.floor(i / 4)]!;
      align = ALIGNS[i % 4]!;
      apply();
    });
  }
  return stage.dispose;
};

export default mount;
