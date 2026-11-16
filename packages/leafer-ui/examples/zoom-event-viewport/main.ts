// ZoomEvent: listening to zoom on a custom-type leafer and applying it by hand
import { LeafHelper, Leafer, Rect, ZoomEvent } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hold Ctrl and turn the wheel over the canvas (or press the buttons). The leafer type is "custom", so zooming is up to the listener.' });
  const leafer = stage.own(new Leafer({ view: stage.view, type: 'custom' }));
  const log = logger(stage, 4);
  leafer.add(new Rect({ x: stage.width * 0.3, y: stage.height * 0.3, width: 80, height: 60, fill: '#32cd79', cornerRadius: 8 }));
  leafer.add(new Rect({ x: stage.width * 0.55, y: stage.height * 0.5, width: 50, height: 50, fill: '#4B8BFF', cornerRadius: 25 }));

  leafer.on(ZoomEvent.START, () => log('zoom.start'));
  leafer.on(ZoomEvent.ZOOM, (e: ZoomEvent) => {
    LeafHelper.zoomOfWorld(leafer, { x: e.x, y: e.y }, e.scale); // zoom around the event point
    log(`zoom  scale ${e.scale.toFixed(3)}  total ${e.totalScale.toFixed(3)}`);
  });
  leafer.on(ZoomEvent.END, () => log('zoom.end'));

  const zoom = async (scale: number, steps = 5): Promise<void> => {
    const { interaction } = leafer;
    const p = { x: stage.width / 2, y: stage.height / 2 };
    for (let i = 0; i < steps; i++) {
      interaction?.zoom({ ...p, scale: 1 + (scale - 1) / steps });
      await stage.wait(60);
    }
  };
  if (stage.bar) {
    button(stage.bar, 'zoom in', () => void zoom(1.5));
    button(stage.bar, 'zoom out', () => void zoom(0.67));
  } else {
    script(stage, async () => {
      await stage.wait(600);
      await zoom(1.6);
      await stage.wait(1000);
      await zoom(0.625);
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
