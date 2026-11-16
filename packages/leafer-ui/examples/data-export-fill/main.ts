// Data: the fill option paints a background under the export
import type { Mount } from '@/types.ts';
import { cycleFill } from '../../shared/export-view.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const { stage, ui, panel } = exportScene(el, ctx, 'Without fill the png is transparent (the checkerboard); jpg has no alpha and goes black.');
  const FILLS = ['none', '#ffffff', '#FEB027', '#333333'] as const;
  let fill: (typeof FILLS)[number] = 'none';
  const run = async (): Promise<void> => {
    const result = await ui.export('png', fill === 'none' ? {} : { fill });
    panel.image(result.data as string, fill === 'none' ? 'no fill' : `fill: '${fill}'`);
  };
  pick(stage, 'fill', FILLS, (v) => ((fill = v), void run()), 1500);
  if (stage.preview) cycleFill(stage, ui, run, 1500);

  return stage.dispose;
};

export default mount;
