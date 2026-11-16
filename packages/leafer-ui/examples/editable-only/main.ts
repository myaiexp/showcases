// Interaction: editable true makes an element selectable in the editor
import { App, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click the yellow rects (editable) and the grey one (not editable)." });
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const w = Math.round(stage.width * 0.22);
  const h = Math.round(w * 1.1);
  const gap = Math.round(stage.width * 0.06);
  const x0 = Math.round((stage.width - (3 * w + 2 * gap)) / 2);
  const y0 = Math.round((stage.height - h) / 2 - 12);
  const mid = (i: number) => ({ x: x0 + i * (w + gap) + w / 2, y: y0 + h / 2 });
  const box = (i: number, data: object) => new Rect({ x: x0 + i * (w + gap), y: y0, width: w, height: h, fill: ['#FEB027', '#FFE04B', '#79CB4D'][i], cornerRadius: 12, ...data });

  const a = box(0, { editable: true, name: 'A' });
  const b = box(1, { editable: true, name: 'B' });
  const c = box(2, { fill: '#b9b5aa', name: 'C (not editable)' });
  app.tree.add([a, b, c]);
  const say = label(stage, '', true);
  stage.loop(() => say('selected: ' + (app.editor.list.map((r) => r.name).join(', ') || '(none)')));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await stage.wait(500);
      for (const i of [0, 1, 2]) {
        await ghost.tap(mid(i).x, mid(i).y);
        await stage.wait(1000);
      }
      await ghost.tap(10, stage.height - 10);
      await stage.wait(700);
    });
  }

  return stage.dispose;
};

export default mount;
