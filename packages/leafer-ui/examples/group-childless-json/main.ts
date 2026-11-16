// Group: childlessJSON keeps children out of JSON
import { Ellipse, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, toggle, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle childlessJSON.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.6;
  const group = new Group({ x: stage.width / 2 - S, y: stage.height / 2 - S / 2 - 10 });
  group.add([new Rect({ width: S, height: S, fill: '#32cd79' }), new Ellipse({ x: S, width: S, height: S, fill: '#FEB027' })]);
  leafer.add(group);
  const note = caption(stage, leafer);
  toggle(stage, 'childlessJSON', false, (v) => {
    group.childlessJSON = v;
    const json = group.toJSON();
    note.text = `toJSON(): ${Object.keys(json).join(', ')}`;
  }, 1800);

  return stage.dispose;
};

export default mount;
