// WebMercatorViewport.fitBounds(): a camera that frames a group of cities, then flown to
import { Deck, FlyToInterpolator, WebMercatorViewport } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, slider } from '../../shared/controls.ts';
import { CITIES, type City, type LngLat } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const GROUPS: Record<string, readonly string[]> = {
  Europe: ['London', 'Paris', 'Madrid', 'Berlin', 'Helsinki', 'Istanbul', 'Moscow'],
  'The Americas': ['New York', 'Los Angeles', 'Mexico City', 'Bogotá', 'São Paulo', 'Buenos Aires', 'Toronto'],
  'Asia-Pacific': ['Tokyo', 'Seoul', 'Singapore', 'Jakarta', 'Sydney', 'Auckland', 'Manila'],
};

type Bounds = [LngLat, LngLat];
function boundsOf(names: readonly string[]): Bounds {
  const pts = CITIES.filter((c) => names.includes(c.name)).map((c) => c.coordinates);
  const lngs = pts.map((p) => p[0]);
  const lats = pts.map((p) => p[1]);
  return [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let group = 'Europe';
  let padding = ctx.preview ? 20 : 60;

  const frame = (name: string): MapViewState => {
    // A standalone viewport only needs a size; fitBounds returns one centred and zoomed to fit.
    const { longitude, latitude, zoom } = new WebMercatorViewport({
      width: stage.box.clientWidth,
      height: stage.box.clientHeight,
    }).fitBounds(boundsOf(GROUPS[name]!), { padding, maxZoom: 8 });
    return { longitude, latitude, zoom };
  };
  const layers = () => {
    const [[w, s], [e, n]] = boundsOf(GROUPS[group]!);
    return [
      landLayer(),
      new PathLayer<{ path: LngLat[] }>({ id: 'box', data: [{ path: [[w, s], [e, s], [e, n], [w, n], [w, s]] }], getPath: (d) => d.path, getColor: [255, 190, 90], getWidth: 2, widthUnits: 'pixels' }),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        radiusUnits: 'pixels',
        getRadius: (d) => (GROUPS[group]!.includes(d.name) ? 6 : 3),
        getFillColor: (d) => (GROUPS[group]!.includes(d.name) ? [255, 170, 70] : [110, 130, 160]),
        updateTriggers: { getRadius: group, getFillColor: group },
      }),
    ];
  };

  const deck = new Deck({ device: stage.device, initialViewState: { longitude: 10, latitude: 25, zoom: 1.5 }, controller: !ctx.preview, layers: layers() });
  const go = (name: string): void => {
    group = name;
    deck.setProps({
      layers: layers(),
      initialViewState: { ...frame(name), transitionInterpolator: new FlyToInterpolator({ speed: 1.6 }), transitionDuration: 'auto' },
    });
  };
  go(group);

  let timer = 0;
  if (ctx.preview) {
    const names = Object.keys(GROUPS);
    let i = 0;
    timer = window.setInterval(() => go(names[++i % names.length]!), 3500);
  } else {
    const bar = controlBar(el);
    for (const name of Object.keys(GROUPS)) button(bar, name, () => go(name));
    slider(bar, 'padding (px)', 0, 150, 5, padding, (v) => { padding = v; go(group); });
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
