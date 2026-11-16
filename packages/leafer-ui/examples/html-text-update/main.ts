// HTMLText: change text
import { Leafer } from 'leafer-ui';
import { HTMLText } from '@leafer-in/html'; // the HTML text plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycle } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Type HTML into the box (inline styles only)." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fs = stage.preview ? 18 : 30; // the docs' 30 px, smaller in a card

  const text = new HTMLText({
    x: stage.preview ? 16 : 60,
    y: stage.height / 2 - fs,
    text: '<b>bold</b> and <i>italic</i>',
  });
  leafer.add(text);
  const lines = [
    '<b>bold</b> and <i>italic</i>',
    `<span style="color:#ff4c4c;font-size:${fs}px">big red</span> <u>underlined</u>`,
    `<span style="background:#FFE04B;padding:2px 6px">marked</span> text`,
  ];
  if (stage.bar) {
    const input = document.createElement('input');
    input.value = lines[0]!;
    input.style.cssText = 'min-width:360px';
    input.addEventListener('input', () => (text.text = input.value));
    stage.bar.append(input);
  } else cycle(stage, lines, (v) => (text.text = v), 2000);

  return stage.dispose;
};

export default mount;
