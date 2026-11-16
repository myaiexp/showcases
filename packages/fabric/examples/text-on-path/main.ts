// Text: the path option makes the characters follow a curve
import { Canvas, FabricText, Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { cycle, INK, RED } from '../../shared/text.ts';

const ALIGNS = ['left', 'center', 'right'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The path draws itself when it has a stroke or fill (set visible: false to hide it). textAlign places the text along the path.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const path = new Path('M 0 0 C 60 -140 240 -140 300 0', { stroke: RED, strokeWidth: 1.5, fill: '', strokeDashArray: [5, 4], objectCaching: false });
  const text = new FabricText('Text on a path, following the curve', {
    left: 180,
    top: 150,
    fontFamily: 'Lora',
    fontSize: 24,
    fill: INK,
    textAlign: 'center',
    path,
  });
  canvas.add(text);

  const say = status(stage);
  const align = (v: (typeof ALIGNS)[number]): void => {
    text.set('textAlign', v);
    say(`textAlign: '${v}'`);
    canvas.requestRenderAll();
  };
  align('center');

  if (stage.bar) {
    select(stage.bar, 'textAlign', ALIGNS, align, 'center');
    checkbox(stage.bar, 'show path', true, (v) => {
      path.set('visible', v);
      canvas.requestRenderAll();
    });
  } else {
    cycle(stage, ALIGNS, 1400, align);
  }
  return stage.dispose;
};

export default mount;
