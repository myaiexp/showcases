// Basics: exporting at pixelRatio 1 and 2
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/export'; // the export element plugin
import { cycleFill, exportPanel } from '../../shared/export-view.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The slider sets pixelRatio for the second image.' });
  const u = sizer(stage);
  const half = stage.preview ? 120 : 300; // the canvas on the left, the exported result on the right
  const leafer = stage.own(new Leafer({ view: stage.view, width: half, height: stage.height, fill: '#333' }));
  const panel = exportPanel(stage, half + 4);
  const rect = Rect.one({ fill: GREEN }, (half - u(100)) / 2, u(60), u(100), u(100));
  leafer.add(rect);

    let ratio = 2;
    const run = async (): Promise<void> => {
      const normal = await rect.export('png');
      const hd = await rect.export('png', { pixelRatio: ratio }); // 2x export
      panel.image(normal.data as string, `${normal.width} × ${normal.height}`, 0);
      panel.image(hd.data as string, `${hd.width} × ${hd.height}`, 1);
    };
    void run();

  if (stage.preview) cycleFill(stage, rect, run);
  else slider(stage.bar!, 'pixelRatio', 1, 4, 1, ratio, (v) => ((ratio = v), void run()));

  return stage.dispose;
};

export default mount;
