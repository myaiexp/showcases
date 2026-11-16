// Basics: exporting an element to PNG
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/export'; // the export element plugin
import { cycleFill, exportPanel } from '../../shared/export-view.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The right side shows what rect.export("png") returned. The button downloads test.png.' });
  const u = sizer(stage);
  const half = stage.preview ? 120 : 300; // the canvas on the left, the exported result on the right
  const leafer = stage.own(new Leafer({ view: stage.view, width: half, height: stage.height, fill: '#333' }));
  const panel = exportPanel(stage, half + 4);
  const rect = Rect.one({ fill: GREEN }, (half - u(100)) / 2, u(60), u(100), u(100));
  leafer.add(rect);

    const run = async (): Promise<void> => {
      const result = await rect.export('png'); // a file name such as 'test.png' downloads it instead
      panel.image(result.data as string, `${result.width} × ${result.height} png`);
    };
    void run();

  if (stage.preview) cycleFill(stage, rect, run);
  else button(stage.bar!, 'download test.png', () => void rect.export('test.png'));

  return stage.dispose;
};

export default mount;
