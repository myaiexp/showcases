// Interaction: which of five state styles wins when all apply
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/state';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Tick selected, focus and disabled, and hover or press the rect." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.8;
  const p = mid(stage, S);
  const rect = new Rect({
    ...p,
    width: S,
    height: S,
    fill: '#cfcabd',
    cornerRadius: 30,
    selectedStyle: { fill: '#FEB027' },
    focusStyle: { fill: '#2b8cff' },
    hoverStyle: { fill: '#32cd79' },
    pressStyle: { fill: '#FF4B4B' },
    disabledStyle: { fill: '#555555' },
  });
  leafer.add(rect);
  const say = label(stage, '', true);
  const names: Record<string, string> = { '#cfcabd': 'none', '#feb027': 'selectedStyle', '#2b8cff': 'focusStyle', '#32cd79': 'hoverStyle', '#ff4b4b': 'pressStyle', '#555555': 'disabledStyle' };
  stage.loop(() => say('fill shows: ' + (names[String(rect.fill).toLowerCase()] ?? String(rect.fill))));
  const setFocus = (on: boolean): void => rect.focus(on);
  if (stage.bar) {
    checkbox(stage.bar, 'selected', false, (v) => (rect.selected = v));
    checkbox(stage.bar, 'focus()', false, setFocus);
    checkbox(stage.bar, 'disabled', false, (v) => (rect.disabled = v));
  } else {
    const ghost = stage.ghost(leafer);
    const c = { x: p.x + S / 2, y: p.y + S / 2 };
    script(stage, async () => {
      ghost.leave();
      rect.selected = false;
      setFocus(false);
      rect.disabled = false;
      await stage.wait(900);
      rect.selected = true;
      await stage.wait(900);
      setFocus(true);
      await stage.wait(900);
      await ghost.glide(c.x, c.y, 400);
      await stage.wait(900);
      ghost.down();
      await stage.wait(900);
      ghost.up();
      rect.disabled = true;
      await stage.wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
