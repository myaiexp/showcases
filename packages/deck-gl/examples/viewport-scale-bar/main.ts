// getDistanceScales(): metres per pixel at the view centre, as a scale bar
import { Deck, WebMercatorViewport } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** The largest 1-2-5 distance in metres that fits within `maxMetres`. */
function niceLength(maxMetres: number): number {
  const pow = 10 ** Math.floor(Math.log10(maxMetres));
  for (const m of [5, 2, 1]) if (m * pow <= maxMetres) return m * pow;
  return pow;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const bar = document.createElement('div');
  bar.style.cssText = 'position:absolute;left:12px;bottom:12px;pointer-events:none;color:#e8eef8;font:12px/1.4 monospace;text-shadow:0 0 3px #000;';
  const line = document.createElement('div');
  line.style.cssText = 'height:6px;border:2px solid #e8eef8;border-top:none;margin-top:2px;';
  const text = document.createElement('div');
  bar.append(text, line);
  stage.box.append(bar);

  const update = (): void => {
    const viewport = deck.getViewports()[0];
    if (!(viewport instanceof WebMercatorViewport)) return;
    // metersPerUnit is metres per common-space unit; one unit spans `scale` pixels (2 ** zoom).
    const metersPerPixel = viewport.getDistanceScales().metersPerUnit[0]! / viewport.scale;
    const metres = niceLength(metersPerPixel * (ctx.preview ? 90 : 150));
    line.style.width = `${metres / metersPerPixel}px`;
    text.textContent = metres >= 1000 ? `${metres / 1000} km` : `${metres} m`;
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: { longitude: 10, latitude: 50, zoom: 4 },
    controller: !ctx.preview,
    onAfterRender: update,
    layers: [landLayer()],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { longitude: 10, latitude: 50, zoom: 4.5 + Math.sin(t * 0.6) * 1.8 } }))
    : () => {};
  return () => {
    stop();
    bar.remove();
    stage.release(deck);
  };
};

export default mount;
