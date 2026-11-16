// Layout: skewX and skewY between -90 and 90
import { Box, Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'skewX tilts the top edge sideways, skewY the left edge up or down.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const rect = new Box({ x: stage.width / 2, y: stage.height / 2 - 26, width: S, height: S, around: 'center' });
  rect.add(new Rect({ width: S, height: S, fill: '#32cd79', cornerRadius: 8 }));
  rect.add(new Text({ x: S * 0.1, y: S * 0.25, width: S * 0.8, text: 'F', fontSize: S * 0.5, fill: '#fff', textAlign: 'center', hittable: false }));
  leafer.add(rect);
  const show = label(stage, '', true);
  const refresh = (): void => show(`skewX ${Math.round(rect.skewX!)}   skewY ${Math.round(rect.skewY!)}`);
  if (stage.bar) {
    slider(stage.bar, 'skewX', -80, 80, 1, 0, (v) => ((rect.skewX = v), refresh()));
    slider(stage.bar, 'skewY', -80, 80, 1, 0, (v) => ((rect.skewY = v), refresh()));
  } else {
    stage.loop((_dt, t) => {
      rect.set({ skewX: Math.sin(t * 1.2) * 45, skewY: Math.sin(t * 0.7 + 1) * 30 });
      refresh();
    });
  }

  return stage.dispose;
};

export default mount;
