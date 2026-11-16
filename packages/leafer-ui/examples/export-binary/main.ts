// Basics: exporting a Blob
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/export'; // the export element plugin
import { cycleFill, exportPanel } from '../../shared/export-view.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The result is a Blob; its object URL feeds the image.' });
  const u = sizer(stage);
  const half = stage.preview ? 120 : 300; // the canvas on the left, the exported result on the right
  const leafer = stage.own(new Leafer({ view: stage.view, width: half, height: stage.height, fill: '#333' }));
  const panel = exportPanel(stage, half + 4);
  const rect = Rect.one({ fill: GREEN }, (half - u(100)) / 2, u(60), u(100), u(100));
  leafer.add(rect);

    let url = '';
    stage.onDispose(() => URL.revokeObjectURL(url));
    const run = async (): Promise<void> => {
      const result = await rect.export('png', true); // true: binary, same as { blob: true }
      const blob = result.data as Blob;
      URL.revokeObjectURL(url);
      url = URL.createObjectURL(blob);
      panel.image(url);
      panel.text(`Blob: ${blob.type}, ${blob.size} bytes`);
    };
    void run();

  if (stage.preview) cycleFill(stage, rect, run);

  return stage.dispose;
};

export default mount;
