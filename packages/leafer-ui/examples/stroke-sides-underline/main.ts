// Stroke sides: a bottom border only
import { Leafer, Rect, Text } from 'leafer-ui';
import '@leafer-in/stroke-sides';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The tab with the thick bottom stroke is the active one.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const k = stage.preview ? 0.7 : 1;
  const names = ['Inbox', 'Sent', 'Drafts'];
  const tabW = 90 * k;
  const x0 = (stage.width - tabW * names.length) / 2;
  const y = stage.height / 2 - 30 * k;
  const tabs = names.map((name, i) => {
    const tab = new Rect({ x: x0 + i * tabW, y, width: tabW, height: 40 * k, fill: '#fff', stroke: '#32cd79', strokeWidth: [0, 0, 1, 0] });
    leafer.add(tab);
    leafer.add(new Text({ x: x0 + i * tabW, y: y + 11 * k, width: tabW, text: name, fontSize: 16 * k, textAlign: 'center', fill: '#333', hittable: false }));
    return tab;
  });

  let active = 0;
  const show = (i: number): void => {
    active = i;
    tabs.forEach((tab, j) => (tab.strokeWidth = [0, 0, j === active ? 4 : 1, 0]));
  };
  tabs.forEach((tab, i) => tab.on('tap', () => show(i)));
  show(0);

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      for (const i of [1, 2, 0]) {
        await stage.wait(900);
        await ghost.tap(x0 + i * tabW + tabW / 2, y + 20 * k);
      }
    });
  }

  return stage.dispose;
};

export default mount;
