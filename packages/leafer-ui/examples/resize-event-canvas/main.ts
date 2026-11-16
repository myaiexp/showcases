// ResizeEvent: reacting to a canvas that grows and shrinks
import { Leafer, ResizeEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the width: the canvas (grey) is resized with leafer.resize() and the event reports the new size.', paper: 'transparent' });
  const w0 = stage.preview ? 120 : 300;
  const h0 = stage.preview ? 70 : 150;
  const leafer = stage.own(new Leafer({ view: stage.view, width: w0, height: h0, fill: '#444' }));
  const log = logger(stage, stage.preview ? 4 : 8);
  leafer.add(new Rect({ x: 10, y: 10, width: 40, height: 40, fill: GREEN, cornerRadius: 8 }));
  stage.view.style.display = 'flex';
  stage.view.style.alignItems = 'flex-end';

  leafer.on(ResizeEvent.RESIZE, (e: ResizeEvent) => log(`resize ${e.width} x ${e.height}  ${e.bigger ? 'bigger' : 'smaller'}`));
  drive(stage, 'width', [w0, stage.width - 20, 4], w0, (v) => leafer.resize({ width: v, height: h0 + (v - w0) / 4 }), 5);
  return stage.dispose;
};

export default mount;
