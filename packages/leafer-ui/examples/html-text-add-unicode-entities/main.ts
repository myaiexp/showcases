// HTMLText: addUnicodeEntity with an object
import { Leafer } from 'leafer-ui';
import { HTMLText } from '@leafer-in/html'; // the HTML text plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Four names added in one call." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fs = stage.preview ? 18 : 30; // the docs' 30 px, smaller in a card
  HTMLText.addUnicodeEntity({
    spades: '\u2660',
    clubs: '\u2663',
    diams: '\u2666',
    phone: '\u260E',
  });
  const text = new HTMLText({
    x: stage.preview ? 16 : 60,
    y: stage.height / 2 - fs,
    text: `<span style="font-size:${fs}px">&spades; &clubs; <span style="color:#ff4c4c">&diams; &phone;</span></span>`,
  });
  leafer.add(text);

  return stage.dispose;
};

export default mount;
