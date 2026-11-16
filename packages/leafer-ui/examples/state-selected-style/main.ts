// Interaction: toggling selected so selectedStyle shows
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import '@leafer-in/state';
import '@leafer-in/animate';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click the rect to select and deselect it." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.8;
  const p = mid(stage, S);
  const rect = new Rect({
    ...p,
    width: S,
    height: S,
    fill: 'rgba(50,205,121, 0.7)',
    cornerRadius: 30,
    transition: 0.2,
    selectedStyle: { fill: 'rgba(50,205,121, 1)', stroke: '#1d2b53', strokeWidth: 6 },
  });
  leafer.add(rect);
  const say = label(stage, 'selected = false', true);
  rect.on(PointerEvent.TAP, () => {
    rect.selected = !rect.selected;
    say('selected = ' + rect.selected);
  });
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await stage.wait(700);
      await ghost.tap(p.x + S / 2, p.y + S / 2);
      await stage.wait(1300);
      await ghost.tap(p.x + S / 2, p.y + S / 2);
      await stage.wait(1000);
    });
  }

  return stage.dispose;
};

export default mount;
