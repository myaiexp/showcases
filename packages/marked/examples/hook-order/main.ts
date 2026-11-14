// Two preprocess hooks: the one registered last runs first
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane, textPane } from '../../shared/panes.ts';
import { select } from '../../shared/controls.ts';
import { render } from '../../shared/renderer-kit.ts';

const LIST = `Shopping:

- tomatoes
- basil
- more tomatoes`;

const CARD = '- tomatoes\n- basil';

const ORDERS = ['expand, then bold', 'bold, then expand'] as const;
type Order = (typeof ORDERS)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Flip which hook is registered last: it runs first' });
  let order: Order = ORDERS[0];

  const log: string[] = [];
  const tell = (name: string, text: string): void => {
    log.push(`${name}\n  ${text.replace(/\n/g, '⏎').slice(0, stage.preview ? 22 : 70)}`);
  };
  const expand = {
    preprocess(md: string) {
      const out = md.replace(/tomatoes/g, 'cherry tomatoes');
      tell('"expand" ran', out);
      return out;
    },
  };
  const bold = {
    preprocess(md: string) {
      const out = md.replace(/cherry tomatoes/g, '**cherry tomatoes**');
      tell('"bold" ran', out);
      return out;
    },
  };

  const build = (): Marked => {
    const m = new Marked();
    // Each use() adds a hook; the last one added runs first.
    const [first, second] = order === ORDERS[0] ? [bold, expand] : [expand, bold];
    m.use({ hooks: first });
    m.use({ hooks: second });
    return m;
  };
  let m = build();

  const src = sourcePane(stage, stage.preview ? CARD : LIST);
  const steps = textPane(stage, 'Hooks in the order they ran');
  const doc = docPane(stage, 'Page');
  const draw = (): void => {
    log.length = 0;
    const html = render(m, src.value());
    steps.show(log.join('\n'));
    doc.show(html);
  };

  if (stage.preview) {
    row(stage.root, src.el, steps.el);
    stage.root.append(doc.el);
    doc.el.style.flex = '0 0 60px';
    stage.every(2500, () => {
      order = order === ORDERS[0] ? ORDERS[1] : ORDERS[0];
      m = build();
      draw();
    });
  } else {
    row(stage.root, src.el, doc.el);
    stage.root.append(steps.el);
    src.onInput(draw);
    select(stage.bar!, 'Run order', ORDERS, (v) => {
      order = v;
      m = build();
      draw();
    }, order);
    note(stage.root, 'The two use() calls swap places, so the hooks run in the other order (the last one registered runs first). "bold" only finds "cherry tomatoes" when "expand" has already written it, so only one order gives bold words.');
  }
  draw();
  return () => stage.dispose();
};

export default mount;
