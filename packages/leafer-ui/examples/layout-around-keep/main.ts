// Layout: keep an element in place while its around changes
import { Leafer, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption, size } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';
import { marker, placeMarker } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: ["around = 'right'", '+ setTransform(saved)'], hint: 'Left: assign around and the star jumps. Right: save localTransform first and setTransform() it after, and the star stays.' });
  const S = size(stage) * 0.5;
  const leafers = stage.panes.map((p) => stage.own(new Leafer({ view: p.view }), p));
  const stars = leafers.map((l) => {
    const s = new Star({ x: stage.width / 2, y: stage.height / 2 - 14, width: S, height: S, fill: '#32cd79', rotation: 30, scale: 1.1 });
    s.around = 'center';
    l.add(s);
    return s;
  });
  const dots = leafers.map((l) => marker(l, 0, 0));
  const notes = leafers.map((l) => caption(stage, l));
  let to: 'center' | 'right' = 'right';
  const move = (): void => {
    to = to === 'center' ? 'right' : 'center';
    stars[0]!.around = to; // the star jumps
    const saved = { ...stars[1]!.localTransform }; // capture the transform, change around, put it back
    stars[1]!.around = to;
    stars[1]!.setTransform(saved);
    stage.after(60, () =>
      stars.forEach((s, i) => {
        placeMarker(dots[i]!, s.x!, s.y!); // around is drawn at x, y
        notes[i]!.text = `around = '${to}'`;
      }),
    );
  };
  move();
  if (stage.bar) button(stage.bar, "around = 'right' / 'center'", move);
  else stage.every(1800, move);

  return stage.dispose;
};

export default mount;
