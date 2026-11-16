// Interaction: simulated zoom events on a viewport Leafer
import { Leafer, Rect, ZoomEvent, type IZoomEvent } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN, label } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The script zooms about the rect's corner; wheel with ctrl to zoom too." });
  const leafer = stage.own(new Leafer({ view: stage.view, type: 'viewport', zoom: { min: 0.2, max: 8 } }));
  const S = size(stage) * 0.7;
  const rect = new Rect({ x: Math.round(stage.width * 0.25), y: Math.round(stage.height * 0.2), width: S, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const say = label(stage, '', true);
  let last = 0;
  rect.on(ZoomEvent.ZOOM, (e: ZoomEvent) => (last = e.scale as number));
  stage.loop(() => say('layer scale ' + (leafer.scaleX ?? 1).toFixed(2) + '   last ZoomEvent.scale ' + last.toFixed(2)));
  const interaction = leafer.interaction!;
  const origin = { x: rect.x!, y: rect.y! };
  const run = async (): Promise<void> => {
    for (const scale of [1.25, 1.25, 1.25, 0.8, 0.8, 0.8]) {
      interaction.zoom({ ...origin, scale } as IZoomEvent);
      await stage.wait(450);
    }
  };
  if (stage.bar) button(stage.bar, 'zoom in then out', () => void run().catch(() => undefined));
  else {
    script(stage, async () => {
      await stage.wait(500);
      await run();
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
