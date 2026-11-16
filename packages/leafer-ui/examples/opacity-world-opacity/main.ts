// Appearance: worldOpacity multiplies down the tree, 0 when hidden
import { Leafer, Group, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, toggle, size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move the slider and untick visible: the child's worldOpacity follows." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = size(stage) * 0.7;
  const group = new Group({ x: (stage.width - s) / 2, y: (stage.height - s) / 2 - 10 });
  const child = new Rect({ width: s, height: s, fill: '#32cd79', cornerRadius: s * 0.15, opacity: 0.5 });
  group.add(child);
  leafer.add(group);

  const say = label(stage, '', true);
  const show = (): void =>
    say(
      'group.opacity ' + Number(group.opacity).toFixed(2) + ' x child.opacity ' + child.opacity +
        '\nchild.worldOpacity ' + child.worldOpacity.toFixed(3),
    );
  drive(stage, 'group.opacity', [0, 1, 0.05], 1, (v) => {
    group.opacity = v;
    show();
  });
  toggle(stage, 'child.visible', true, (v) => {
    child.visible = v;
    show();
  }, 3000);

  return stage.dispose;
};

export default mount;
