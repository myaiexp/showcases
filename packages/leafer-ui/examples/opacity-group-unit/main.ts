// Appearance: Group opacity applies to the children as one unit
import { Leafer, Group, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { stripes } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide opacity: the left Group fades as one picture, the right pair fades child by child and the overlap shows.", panes: ["group.opacity","child.opacity"] });
  const [a, b] = stage.panes;
  const left = stage.own(new Leafer({ view: a!.view }), a);
  const right = stage.own(new Leafer({ view: b!.view }), b);
  stripes(left, a!);
  stripes(right, b!);
  const s = Math.min(a!.width * 0.5, a!.height * 0.5);
  const x = (a!.width - s * 1.5) / 2;
  const y = (a!.height - s * 1.5) / 2;
  const pair = (): Rect[] => [
    Rect.one({ fill: '#FF4B4B' }, x, y, s, s),
    Rect.one({ fill: '#32cd79' }, x + s * 0.5, y + s * 0.5, s, s),
  ];

  const group = new Group({ children: pair() }); // children draw first, then the Group fades
  const loose = pair();
  left.add(group);
  right.add(loose);

  drive(stage, 'opacity', [0, 1, 0.05], 0.5, (v) => {
    group.opacity = v;
    for (const r of loose) r.opacity = v;
  });

  return stage.dispose;
};

export default mount;
