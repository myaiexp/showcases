// HTMLText: fonts, sizes and line breaks
import { Leafer } from 'leafer-ui';
import { HTMLText } from '@leafer-in/html'; // the HTML text plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Each fragment has its own inline style." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fs = stage.preview ? 18 : 30; // the docs' 30 px, smaller in a card

  const text = new HTMLText({
    x: stage.preview ? 16 : 60,
    y: stage.height / 2 - fs,
    text: `<div style="font:bold ${fs}px Georgia,serif;color:#836DFF">Serif title</div><div style="font:${fs * 0.6}px monospace;color:#555">monospace<br/>second line</div>`,
  });
  leafer.add(text);

  return stage.dispose;
};

export default mount;
