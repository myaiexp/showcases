// IconLayer getIcon: {url, width, height} with url a data URL made from SVG
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

function createSVGIcon(n: number): string {
  const label = n < 10 ? n.toString() : '10+';
  return `\
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="#c00" stroke="#fa1" stroke-width="2"/>
  <text x="12" y="12" fill="#fff" text-anchor="middle" alignment-baseline="middle" font-size="8">${label}</text>
</svg>`;
}

// A raw XML string cannot go straight into a data URL: escape it first.
function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 30, zoom: ctx.preview ? 0.6 : 1.4 };
  let shift = 0;

  const layer = () =>
    new IconLayer<City>({
      id: 'badges',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      // The count on each badge: the population, shifted so a button can change them all.
      getIcon: (d) => ({ url: svgToDataUrl(createSVGIcon(Math.round(d.population) + shift)), width: 24, height: 24 }),
      getSize: 26,
      updateTriggers: { getIcon: shift },
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), layer()] });

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      shift = (shift + 3) % 12;
      deck.setProps({ layers: [landLayer(), layer()] });
    }, 2200);
  } else {
    button(controlBar(el), 'Add 3 to every badge', () => {
      shift = (shift + 3) % 12;
      deck.setProps({ layers: [landLayer(), layer()] });
    });
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
