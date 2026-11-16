// HTMLText: addUnicodeEntity with one entity
import { Leafer } from 'leafer-ui';
import { HTMLText } from '@leafer-in/html'; // the HTML text plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The heart comes from a name the plugin did not know." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fs = stage.preview ? 18 : 30; // the docs' 30 px, smaller in a card
  HTMLText.addUnicodeEntity('hearts', '\u2665'); // &hearts; => ♥ (page-wide, harmless to keep)
  const text = new HTMLText({
    x: stage.preview ? 16 : 60,
    y: stage.height / 2 - fs,
    text: `<span style="font-size:${fs}px;color:#ff4c4c">I &hearts; LeaferJS</span>`,
  });
  leafer.add(text);

  return stage.dispose;
};

export default mount;
