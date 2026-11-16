// Plugin: a Selector class extending Group, kept in its own file like a package would be
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { Selector, SelectEvent } from './selector.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag on the empty paper over some squares. The Selector class emits selector.select with the ones touched.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = Math.min(36, (stage.width - 40) / 5 - 10);
  const targets = Array.from({ length: 10 }, (_, i) => new Rect({ x: 24 + (i % 5) * (s + 12), y: stage.height * 0.3 + Math.floor(i / 5) * (s + 14), width: s, height: s, fill: '#32cd79', cornerRadius: 6, hittable: false }));
  leafer.add(targets);
  const say = label(stage, 'drag to select');

  const selector = new Selector(targets).bind(leafer); // the plugin
  leafer.add(selector);
  selector.on(SelectEvent.SELECT, (list: Rect[]) => {
    targets.forEach((t) => (t.fill = list.includes(t) ? '#ff4b4b' : '#32cd79'));
    say(`${SelectEvent.SELECT}: ${list.length} selected`);
  });

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: 14, y: stage.height * 0.22 }, { x: stage.width * 0.55, y: stage.height * 0.55 }, 900);
      await stage.wait(1000);
      await ghost.drag({ x: stage.width - 14, y: stage.height * 0.9 }, { x: stage.width * 0.4, y: stage.height * 0.5 }, 900);
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
