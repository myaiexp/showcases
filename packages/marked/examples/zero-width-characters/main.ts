// A hidden character before "#" stops a heading; the docs' replace() removes it
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane, textPane } from '../../shared/panes.ts';
import { button } from '../../shared/controls.ts';
import { typeLoop } from '../../shared/typing.ts';

const BOM = '﻿';
const NOTE = `${BOM}# Trip notes\n\nPack **light**.`;
const SHORT = `${BOM}# Trip\nPack **light**`;

/** Spells out characters a reader cannot see, such as the byte order mark. */
const SPELL: Record<string, string> = {
  '﻿': '⟦U+FEFF⟧',
  '​': '⟦U+200B⟧',
  '‌': '⟦U+200C⟧',
  '‍': '⟦U+200D⟧',
  '‎': '⟦U+200E⟧',
  '‏': '⟦U+200F⟧',
};
const visible = (text: string): string => text.replace(/[​-‏﻿]/g, (c) => SPELL[c] ?? c);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the button to add or remove the invisible character' });
  const marked = new Marked();

  const src = sourcePane(stage, stage.preview ? '' : NOTE);
  const spelled = textPane(stage, 'The same text, hidden characters shown');
  const raw = docPane(stage, 'marked.parse(text)');
  const fixed = docPane(stage, 'after replace(...)');

  const draw = (text: string): void => {
    spelled.show(visible(text));
    raw.show(marked.parse(text, { async: false }));
    // The docs' fix: drop one zero-width character from the very start of the file.
    fixed.show(marked.parse(text.replace(/^[​‌‍‎‏﻿]/, ''), { async: false }));
  };

  if (stage.preview) {
    row(stage.root, spelled.el);
    row(stage.root, raw.el, fixed.el);
    typeLoop(stage, [{ text: SHORT }], draw);
  } else {
    row(stage.root, src.el, spelled.el);
    row(stage.root, raw.el, fixed.el);
    note(stage.root, 'The first line looks the same in both, but in the left page the hidden character means "# Trip notes" is not a heading. replace() strips it, so the right page is correct.');
    src.onInput(draw);
    button(stage.bar!, 'Toggle the invisible character', () => {
      const t = src.value();
      src.set(t.startsWith(BOM) ? t.slice(1) : BOM + t);
      draw(src.value());
    });
    draw(NOTE);
  }
  return () => stage.dispose();
};

export default mount;
