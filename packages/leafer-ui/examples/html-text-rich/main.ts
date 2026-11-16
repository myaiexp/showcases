// HTMLText: render rich text
import { Leafer } from 'leafer-ui';
import { HTMLText } from '@leafer-in/html'; // the HTML text plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Inline HTML only: styles are set with style attributes." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fs = stage.preview ? 18 : 30; // the docs' 30 px, smaller in a card

  const text = new HTMLText({
    x: stage.preview ? 16 : 60,
    y: stage.height / 2 - fs,
    text: `<i style="color: red; font-weight: bold;">Welcome</i> to <i style="color: #32cd79; font-size: ${fs}px">LeaferJS</i>`,
  });
  leafer.add(text);

  return stage.dispose;
};

export default mount;
