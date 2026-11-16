// Layout: scaleFixed with a number sets where shrinking begins
import { Leafer, Rect, Text } from 'leafer-ui';
import '@leafer-in/scale-fixed'; // the scale-fixed plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'scaleFixed: 0.5 stays full size until the view shrinks below 0.5, then follows it; false always scales.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.3;
  const cy = stage.height / 2 - 30;
  const cols = stage.width / 3;
  const forms: [string, false | number | 'zoom-in', string][] = [
    ['false', false, '#FEB027'],
    ['0.5', 0.5, '#FFE04B'],
    ["'zoom-in'", 'zoom-in', '#4B8BFF'],
  ];
  const rects = forms.map(([name, fixed, fill], i) => {
    const cx = cols * i + cols / 2;
    const r = new Rect({ scaleFixed: fixed, x: cx, y: cy, width: S, height: S, fill, around: 'center', cornerRadius: 8 });
    leafer.add(r);
    leafer.add(new Text({ x: cols * i, y: cy + S / 2 + 6, width: cols, text: name, fontSize: stage.preview ? 10 : 13, fill: '#666', textAlign: 'center', hittable: false }));
    return r;
  });
  const show = label(stage, '', true);
  drive(stage, 'leafer.scale', [0.2, 1.8, 0.05], 1, (k) => {
    leafer.set({ scale: k, x: (1 - k) * stage.width / 2, y: (1 - k) * cy });
    show(`leafer.scale ${k.toFixed(2)}   drawn scale: ${rects.map((r) => r.worldTransform.scaleX!.toFixed(2)).join(' / ')}`);
  }, 7);

  return stage.dispose;
};

export default mount;
