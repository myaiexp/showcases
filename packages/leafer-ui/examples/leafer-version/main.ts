// Basics: printing the leafer-ui version
import { Leafer, Text, version } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, bob, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The text is drawn from the exported version constant.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  const text = new Text({
    x: u(30),
    y: u(70),
    fontSize: stage.preview ? 20 : 40,
    fill: GREEN,
    text: `leafer-ui ${version}`,
  });
  leafer.add(text);

  if (stage.preview) bob(stage, text);

  return stage.dispose;
};

export default mount;
