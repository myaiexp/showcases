// getTooltip returning {html, style, className}: a styled tooltip from the object
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ColumnLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const BIG = CITIES.filter((c) => c.population >= 9);

/** The same object getTooltip returns, so the card can render it by hand. */
function tooltipFor(c: City): { html: string; style: Record<string, string> } {
  return {
    html: `<div style="font-weight:700">${c.name}</div><div>${c.country}</div><div style="opacity:.8">${c.population} million</div>`,
    style: { backgroundColor: '#1d3a5f', color: '#fff', fontSize: '0.8em', borderRadius: '6px', padding: '8px' },
  };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 28, zoom: ctx.preview ? 0.5 : 1.3, pitch: 35 };

  const layer = (highlighted: number | null) =>
    new ColumnLayer<City>({
      id: 'columns',
      data: BIG,
      getPosition: (d) => d.coordinates,
      getElevation: (d) => d.population * 20_000,
      getFillColor: [90, 170, 255],
      radius: 160_000,
      extruded: true,
      pickable: true,
      autoHighlight: true,
      highlightColor: [255, 210, 90],
      ...(highlighted === null ? {} : { highlightedObjectIndex: highlighted }),
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), layer(null)],
    getTooltip: ({ object }: PickingInfo<City>) => (object ? { ...tooltipFor(object), className: 'city-tip' } : null),
  });

  // No pointer in a card: the tooltip is drawn by hand for each highlighted column.
  let timer = 0;
  let fake: HTMLDivElement | null = null;
  if (ctx.preview) {
    fake = document.createElement('div');
    fake.style.cssText = 'position:absolute;left:8px;bottom:8px;pointer-events:none;z-index:1;font-size:12px';
    stage.box.append(fake);
    let i = 0;
    const show = (): void => {
      const c = BIG[i % BIG.length]!;
      deck.setProps({ layers: [landLayer(), layer(i % BIG.length)] });
      const t = tooltipFor(c);
      fake!.innerHTML = t.html;
      Object.assign(fake!.style, t.style);
      i += 1;
    };
    show();
    timer = window.setInterval(show, 1500);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
