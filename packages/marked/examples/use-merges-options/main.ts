// Later use() layers overwrite plain options but merge renderer overrides together
import { Marked, type MarkedExtension } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane, textPane } from '../../shared/panes.ts';
import { checkbox } from '../../shared/controls.ts';

interface Layer {
  label: string;
  code: string;
  ext: MarkedExtension;
}

const SAMPLE = 'Milk\n**Eggs** and _bread_';

// Each layer is one use() call, applied top to bottom.
const LAYERS: Layer[] = [
  {
    label: 'use #1',
    code: '{ breaks: true, renderer: { strong: <mark> } }',
    ext: {
      breaks: true,
      renderer: {
        strong({ tokens }) {
          return `<mark>${this.parser.parseInline(tokens)}</mark>`;
        },
      },
    },
  },
  {
    label: 'use #2',
    code: '{ breaks: false, renderer: { em: <u> } }',
    ext: {
      breaks: false,
      renderer: {
        em({ tokens }) {
          return `<u>${this.parser.parseInline(tokens)}</u>`;
        },
      },
    },
  },
  {
    label: 'use #3',
    code: '{ renderer: { strong: <b>LOUD</b> } }',
    ext: {
      renderer: {
        strong({ tokens }) {
          return `<b style="text-transform:uppercase">${this.parser.parseInline(tokens)}</b>`;
        },
      },
    },
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch layers on and off: each is another use() call' });
  const src = sourcePane(stage, SAMPLE);
  const log = textPane(stage, 'The calls');
  const doc = docPane(stage);
  stage.root.append(src.el);
  src.el.classList.add('mk-pane-src-top');
  row(stage.root, log.el, doc.el);

  const on = new Set<number>(stage.preview ? [] : [0, 1]);
  const draw = (): void => {
    const m = new Marked();
    const used = LAYERS.filter((_, i) => on.has(i));
    for (const layer of used) m.use(layer.ext);
    const lines = used.map((l) => `m.use(${l.code})`);
    // breaks was set by plain options, so the last layer that mentions it decides.
    const breaks = [...used].reverse().find((l) => 'breaks' in l.ext)?.ext.breaks ?? false;
    lines.push('', `breaks in effect: ${breaks}`);
    log.show(lines.join('\n'));
    doc.show(m.parse(src.value(), { async: false }));
  };

  if (stage.preview) {
    let i = 0;
    stage.play(async (wait) => {
      on.clear();
      for (let k = 0; k < i % 4; k++) on.add(k);
      i++;
      draw();
      await wait(1900);
    });
  } else {
    note(stage.root, 'breaks is a plain option: the last use() that sets it wins. Renderer overrides are merged: #1 and #2 both apply, and #3 replaces #1 for bold only.');
    src.onInput(draw);
    LAYERS.forEach((l, i) => {
      checkbox(stage.bar!, `${l.label}: ${l.code}`, on.has(i), (v) => {
        if (v) on.add(i);
        else on.delete(i);
        draw();
      });
    });
    draw();
  }
  return () => stage.dispose();
};

export default mount;
