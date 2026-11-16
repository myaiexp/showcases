// Layout: scaleFixed 'zoom-in' keeps an element from growing with the view
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/scale-fixed'; // the scale-fixed plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The right rect has scaleFixed: 'zoom-in': it ignores zooming in but still shrinks when you zoom out." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.45;
  const cy = stage.height / 2 - 24;
  leafer.add(new Rect({ x: stage.width / 2 - S * 1.2, y: cy - S / 2, width: S, height: S, fill: '#FEB027', cornerRadius: [S * 0.2, 0, 0, S * 0.2] }));
  leafer.add(new Rect({ scaleFixed: 'zoom-in', x: stage.width / 2 + S * 0.2, y: cy - S / 2, width: S, height: S, fill: '#FFE04B', cornerRadius: [0, S * 0.2, S * 0.2, 0], around: 'center' }));
  const show = label(stage, '', true);
  const cx = stage.width / 2, cyy = cy;
  drive(stage, 'leafer.scale', [0.4, 2.2, 0.05], 1, (k) => {
    leafer.set({ scale: k, x: (1 - k) * cx, y: (1 - k) * cyy }); // zoom about the middle of the pane
    show(`leafer.scale = ${k.toFixed(2)}`);
  }, 6);

  return stage.dispose;
};

export default mount;
