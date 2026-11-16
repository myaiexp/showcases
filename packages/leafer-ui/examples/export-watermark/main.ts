// Basics: drawing a watermark in the onCanvas hook
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/export'; // the export element plugin
import { cycleFill, exportPanel } from '../../shared/export-view.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The exported image carries a mark drawn in onCanvas.' });
  const u = sizer(stage);
  const half = stage.preview ? 120 : 300; // the canvas on the left, the exported result on the right
  const leafer = stage.own(new Leafer({ view: stage.view, width: half, height: stage.height, fill: '#333' }));
  const panel = exportPanel(stage, half + 4);
  const rect = Rect.one({ fill: GREEN }, (half - u(100)) / 2, u(60), u(100), u(100));
  leafer.add(rect);

    const run = async (): Promise<void> => {
      const result = await rect.export('png', {
        pixelRatio: 2,
        onCanvas(canvas) {
          const { context, pixelRatio, width, height } = canvas; // logical size; pixelWidth is the real one
          context.scale(pixelRatio, pixelRatio); // undo the pixel ratio difference
          context.fillStyle = '#000';
          context.fillText('(c) Leafer', width - 48, height - 8);
        },
      });
      panel.image(result.data as string, `${result.width} × ${result.height}`);
    };
    void run();

  if (stage.preview) cycleFill(stage, rect, run);

  return stage.dispose;
};

export default mount;
