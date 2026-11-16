// Rect: a picture with fills layered above it
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the overlay opacity.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({
    ...mid(stage, S * 1.3, S), width: S * 1.3, height: S, cornerRadius: 20, stroke: '#1d2b53', strokeWidth: 4,
    fill: [{ type: 'image', url: photo(), mode: 'stretch' }, { type: 'solid', color: 'rgba(255,75,75,0.4)' }],
  });
  leafer.add(rect);
  drive(stage, 'opacity', [0, 1, 0.05], 0.4, (v) => (rect.fill = [{ type: 'image', url: photo(), mode: 'stretch' }, { type: 'solid', color: `rgba(255,75,75,${v})` }]), 4);

  return stage.dispose;
};

export default mount;
