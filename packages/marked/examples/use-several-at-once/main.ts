// use(a, b, c) in one call is the same as three separate use() calls
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane, textPane } from '../../shared/panes.ts';
import { typeLoop } from '../../shared/typing.ts';
import { PACK_SAMPLE, PACKS } from '../../shared/use-kit.ts';

const { chat, marker, arrows } = PACKS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the note: both pages stay identical' });
  const src = sourcePane(stage, stage.preview ? '' : PACK_SAMPLE);

  // Two private instances configured two ways.
  const together = new Marked();
  together.use(chat.ext, marker.ext, arrows.ext);
  const apart = new Marked();
  apart.use(chat.ext);
  apart.use(marker.ext);
  apart.use(arrows.ext);

  const a = docPane(stage, 'use(a, b, c)');
  const b = docPane(stage, 'use(a); use(b); use(c)');
  const verdict = textPane(stage, 'Same HTML?');

  const draw = (md: string): void => {
    const x = together.parse(md, { async: false });
    const y = apart.parse(md, { async: false });
    a.show(x);
    b.show(y);
    verdict.show(x === y ? 'yes, character for character' : 'no');
  };

  stage.root.append(src.el);
  src.el.classList.add('mk-pane-src-top');
  row(stage.root, a.el, b.el);
  if (!stage.preview) {
    stage.root.append(verdict.el);
    note(stage.root, 'Both instances got the same three packs (line breaks, highlighted bold, arrows on links), one in a single call and one in three. The HTML matches exactly.');
    src.onInput(draw);
    draw(PACK_SAMPLE);
  } else {
    typeLoop(stage, [{ text: PACK_SAMPLE }], (t) => {
      src.set(t);
      draw(t);
    });
  }
  return () => stage.dispose();
};

export default mount;
