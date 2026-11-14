// new Marked(a, b, c): every argument is an extension, applied in order
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, row, sourcePane, textPane } from '../../shared/panes.ts';
import { checkbox } from '../../shared/controls.ts';
import { PACK_SAMPLE, PACKS } from '../../shared/use-kit.ts';

const ORDER = [PACKS.chat, PACKS.marker, PACKS.arrows];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the packs to pass to the constructor' });
  const src = sourcePane(stage, PACK_SAMPLE);
  const code = textPane(stage, 'The call');
  const doc = docPane(stage);
  stage.root.append(src.el);
  src.el.classList.add('mk-pane-src-top');
  row(stage.root, code.el, doc.el);

  const on = new Set<string>(stage.preview ? [] : ORDER.map((p) => p.id));
  const draw = (): void => {
    const chosen = ORDER.filter((p) => on.has(p.id));
    // Each chosen pack is one more argument to the constructor.
    const m = new Marked(...chosen.map((p) => p.ext));
    code.show(`new Marked(${chosen.map((p) => `\n  ${p.code}`).join(',')}${chosen.length ? '\n' : ''})`);
    doc.show(m.parse(src.value(), { async: false }));
  };

  if (stage.preview) {
    let i = 0;
    stage.play(async (wait) => {
      on.clear();
      for (const p of ORDER.slice(0, i % (ORDER.length + 1))) on.add(p.id);
      i++;
      draw();
      await wait(1900);
    });
  } else {
    src.onInput(draw);
    for (const p of ORDER) {
      checkbox(stage.bar!, p.label, true, (v) => {
        if (v) on.add(p.id);
        else on.delete(p.id);
        draw();
      });
    }
    draw();
  }
  return () => stage.dispose();
};

export default mount;
