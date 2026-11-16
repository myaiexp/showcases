// Basics: a screenshot of the engine canvas
import { Leafer, Rect, Ellipse } from 'leafer-ui';
import '@leafer-in/export'; // the export element plugin
import { cycleFill, exportPanel } from '../../shared/export-view.ts';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the shapes, then press the button.' });
  const u = sizer(stage);
  const half = stage.preview ? 120 : 300; // the canvas on the left, the exported result on the right
  const leafer = stage.own(new Leafer({ view: stage.view, width: half, height: stage.height, fill: '#333' }));
  const panel = exportPanel(stage, half + 4);
  const rect = Rect.one({ fill: GREEN }, (half - u(100)) / 2, u(60), u(100), u(100));
  leafer.add(rect);

    const circle = new Ellipse({ x: half / 2 - u(30), y: u(170), width: u(60), height: u(60), fill: '#FEB027', draggable: true });
    leafer.add(circle);
    rect.draggable = true;

    const run = async (): Promise<void> => {
      const result = await leafer.export('png', { screenshot: true }); // a file name would download it
      panel.image(result.data as string, `${result.width} × ${result.height}`);
    };
    void run();

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: half / 2, y: u(110) }, { x: half / 2 + u(20), y: u(130) }, 600);
      await run();
      await stage.wait(900);
      await ghost.drag({ x: half / 2 + u(20), y: u(130) }, { x: half / 2, y: u(110) }, 600);
      await run();
      await stage.wait(900);
    });
  } else button(stage.bar!, 'screenshot', () => void run());

  return stage.dispose;
};

export default mount;
