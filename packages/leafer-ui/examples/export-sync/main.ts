// Basics: exporting synchronously
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/export'; // the export element plugin
import { cycleFill, exportPanel } from '../../shared/export-view.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'rect.syncExport("jpg") returns the data immediately.' });
  const u = sizer(stage);
  const half = stage.preview ? 120 : 300; // the canvas on the left, the exported result on the right
  const leafer = stage.own(new Leafer({ view: stage.view, width: half, height: stage.height, fill: '#333' }));
  const panel = exportPanel(stage, half + 4);
  const rect = Rect.one({ fill: GREEN }, (half - u(100)) / 2, u(60), u(100), u(100));
  leafer.add(rect);

    const run = (): void => {
      const result = rect.syncExport('jpg'); // no await: async-loaded images must already be done
      const data = result.data as string;
      panel.image(data);
      panel.text(`${data.slice(0, stage.preview ? 40 : 70)}…\n${data.length} characters`);
    };
    run();

  if (stage.preview) cycleFill(stage, rect, run);

  return stage.dispose;
};

export default mount;
