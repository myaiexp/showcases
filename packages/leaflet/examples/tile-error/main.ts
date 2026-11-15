// errorTileUrl and the tileerror event, with a server that is down and a zoom the server lacks
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { coordsLabel } from '../../shared/tile-urls.ts';

type Source = 'up' | 'down' | 'deep';
const SOURCES: Record<Source, { label: string; url: string; zoom: number }> = {
  up: { label: 'tiles.example (works)', url: 'https://tiles.example/light/{z}/{x}/{y}.png', zoom: 4 },
  down: { label: 'down.tiles.example (every request fails)', url: 'https://down.tiles.example/light/{z}/{x}/{y}.png', zoom: 4 },
  deep: { label: 'zoom 19 (the server stops at 18)', url: 'https://tiles.example/light/{z}/{x}/{y}.png', zoom: 19 },
};

/** A 256px stand-in tile drawn on a canvas, used as errorTileUrl. */
function placeholder(): string {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  if (!g) return '';
  g.fillStyle = '#2a1d1d';
  g.fillRect(0, 0, 256, 256);
  g.strokeStyle = '#a44';
  g.lineWidth = 2;
  for (let i = -256; i < 256; i += 24) {
    g.beginPath();
    g.moveTo(i, 256);
    g.lineTo(i + 256, 0);
    g.stroke();
  }
  g.fillStyle = '#f5a3a3';
  g.font = '16px sans-serif';
  g.textAlign = 'center';
  g.fillText('tile failed to load', 128, 132);
  return c.toDataURL('image/png');
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A failed tile fires tileerror either way. errorTileUrl only decides what takes its place.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [52, 5], zoom: 4, maxZoom: 20 }));
  const errorTile = placeholder();
  const log = stage.log('tileerror events', 8);

  let layer: LocalTileLayer | undefined;
  let source: Source = 'up';
  let useErrorTile = false;
  let errors = 0;
  const build = (): void => {
    layer?.remove();
    errors = 0;
    const { url, zoom } = SOURCES[source];
    // errorTileUrl: '' (the default) leaves a failed tile empty.
    layer = new LocalTileLayer(url, { maxZoom: 20, errorTileUrl: useErrorTile ? errorTile : '', attribution: LAND_ATTRIBUTION });
    layer.on('tileerror', (e) => {
      errors++;
      log(`tileerror ${coordsLabel(e.coords)} (${errors} so far)`);
    });
    layer.addTo(map);
    map.setView(map.getCenter(), zoom, { animate: false });
    if (!stage.preview) stage.say(`${SOURCES[source].label}, errorTileUrl ${useErrorTile ? 'set' : 'empty'}`);
  };
  build();

  stage.select('server', Object.entries(SOURCES).map(([value, s]) => ({ value: value as Source, label: s.label })), 'up', (v) => ((source = v), build()));
  stage.toggle('errorTileUrl', false, (on) => ((useErrorTile = on), build()));

  if (stage.preview) {
    const steps: [Source, boolean, string][] = [
      ['up', false, 'tiles.example: every tile loads'],
      ['down', false, 'down.tiles.example, errorTileUrl empty: blank tiles'],
      ['down', true, 'errorTileUrl set: the stand-in tile shows'],
      ['deep', true, 'zoom 19: the server has no tiles that deep'],
    ];
    stage.cycle(
      steps.map(([s, e, say]) => ({
        run: () => {
          source = s;
          useErrorTile = e;
          build();
          stage.say(say);
        },
      })),
      2600,
    );
  }
  return () => stage.dispose();
};

export default mount;
