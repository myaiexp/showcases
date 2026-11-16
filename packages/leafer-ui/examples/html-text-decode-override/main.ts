// HTMLText: override decodeText
import { Leafer } from 'leafer-ui';
import { HTMLText } from '@leafer-in/html'; // the HTML text plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Entities outside the built-in list now decode too." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fs = stage.preview ? 18 : 30; // the docs' 30 px, smaller in a card
  const original = HTMLText.prototype.decodeText;
  HTMLText.prototype.decodeText = function (text: string): string {
    if (!text.includes('&')) return text;
    const area = document.createElement('textarea'); // the browser knows every entity
    area.innerHTML = text;
    return area.value;
  };
  stage.onDispose(() => (HTMLText.prototype.decodeText = original)); // page-wide: put it back
  const text = new HTMLText({
    x: stage.preview ? 16 : 60,
    y: stage.height / 2 - fs,
    text: `<span style="font-size:${fs}px">&Delta;t &le; 5 &check; &hearts; &ohm;</span>`,
  });
  leafer.add(text);

  return stage.dispose;
};

export default mount;
