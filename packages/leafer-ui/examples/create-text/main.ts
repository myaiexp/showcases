// Basics: a Text element
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, bob, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A one-line Text in the docs\' green.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const text = new Text({
    x: u(30),
    y: u(60),
    fill: GREEN,
    fontSize: stage.preview ? 18 : 30,
    text: 'Welcome to LeaferJS',
  });
  leafer.add(text);

  if (stage.preview) bob(stage, text);

  return stage.dispose;
};

export default mount;
