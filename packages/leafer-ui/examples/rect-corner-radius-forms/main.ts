// Rect: the four cornerRadius forms
import { Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compare how many numbers each form takes and which corners they fill.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const forms: [string, number | number[]][] = [
    ['20', 20],
    ['[40, 10]', [40, 10]],
    ['[40, 10, 20]', [40, 10, 20]],
    ['[40, 10, 20, 0]', [40, 10, 20, 0]],
  ];
  const w = stage.preview ? 52 : 130;
  const gap = (stage.width - forms.length * w) / (forms.length + 1);
  const rects = forms.map(([label, cornerRadius], i) => {
    const rect = new Rect({ x: gap + i * (w + gap), y: stage.height / 2 - w / 2 - 10, width: w, height: w, fill: '#32cd79', cornerRadius });
    leafer.add(rect);
    leafer.add(new Text({ x: rect.x! - 10, y: rect.y! + w + 10, width: w + 20, text: label, fontSize: stage.preview ? 9 : 13, textAlign: 'center', fill: '#555' }));
    return rect;
  });
  stage.loop((_dt, t) => rects.forEach((r, i) => (r.rotation = Math.sin(t * 1.5 + i) * 6)));

  return stage.dispose;
};

export default mount;
