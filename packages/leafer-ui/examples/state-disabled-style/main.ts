// Interaction: disabledStyle wins over hoverStyle while disabled
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/state';
import '@leafer-in/animate';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';
import { tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover the rect, then tick disabled: the hover style goes away." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.8;
  const p = mid(stage, S);
  const rect = new Rect({
    ...p,
    width: S,
    height: S,
    fill: 'rgba(50,205,121, 1)',
    cornerRadius: 30,
    transition: 0.2,
    hoverStyle: { fill: '#FF4B4B' },
    disabledStyle: { fill: 'rgba(50,205,121, 0.35)' },
  });
  leafer.add(rect);
  const say = label(stage, '', true);
  const apply = (on: boolean): void => {
    rect.disabled = on;
    say('disabled = ' + on + (on ? '  (hover is ignored)' : ''));
  };
  apply(false);
  if (stage.bar) checkbox(stage.bar, 'disabled', false, apply);
  else {
    const ghost = stage.ghost(leafer);
    void ghost.glide(p.x + S / 2, p.y + S / 2, 500);
    tour(stage, [false, true], async (on) => {
      apply(on);
      await stage.wait(1600);
    });
  }

  return stage.dispose;
};

export default mount;
