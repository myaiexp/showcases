// HTMLText: built-in HTML entities
import { Leafer } from 'leafer-ui';
import { HTMLText } from '@leafer-in/html'; // the HTML text plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The entities in the markup are decoded before the SVG is built." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fs = stage.preview ? 18 : 30; // the docs' 30 px, smaller in a card

  const text = new HTMLText({
    x: stage.preview ? 16 : 60,
    y: stage.height / 2 - fs,
    text: `<span style="font-size:${fs * 0.7}px">&copy; 2026 &middot; 5 &times; 3 &minus; 1 &plusmn; 0.5 &rarr; &euro;14 &frac12; &alpha;&beta;&gamma; &deg; &infinity;</span>`,
  });
  leafer.add(text);

  return stage.dispose;
};

export default mount;
