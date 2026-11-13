// fill-pattern with canvas images from map.addImage, chosen by an expression
import { Map } from 'maplibre-gl';
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';
import { patterns, renderPattern } from './patterns.ts';
import { select } from '../../shared/controls.ts';

// Each rule is a fill-pattern value: an expression that yields an image name per country.
const rules: Record<string, ExpressionSpecification | string> = {
  'match on id % 3': ['match', ['%', ['id'], 3], 0, 'stripes', 1, 'dots', 'checks'],
  'case on name length': [
    'case',
    ['>', ['length', ['get', 'name']], 9], 'stripes',
    ['>', ['length', ['get', 'name']], 5], 'dots',
    'checks',
  ],
  'one pattern: stripes': 'stripes',
};

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 25],
    zoom: preview ? 0.9 : 1.5,
    interactive: !preview,
  });

  map.on('load', () => {
    // addImage takes ImageData directly; the id is then usable as a pattern name.
    for (const p of patterns) map.addImage(p.id, renderPattern(p));
    map.addLayer(
      {
        id: 'patterned',
        type: 'fill',
        source: 'countries',
        paint: { 'fill-pattern': rules['match on id % 3'] ?? 'stripes' },
      },
      'borders',
    );
  });

  let frame = 0;
  if (preview) {
    const drift = (): void => {
      map.setCenter([map.getCenter().lng + 0.12, 25]);
      frame = requestAnimationFrame(drift);
    };
    map.once('load', drift);
  } else {
    const bar = controlBar(el);
    const out = readout(el, 'fill-pattern: match on id % 3');
    select(bar, 'fill-pattern', Object.keys(rules), (name) => {
      map.setPaintProperty('patterned', 'fill-pattern', rules[name]);
      out.textContent = `fill-pattern: ${name}`;
    });
    select(bar, 'view', ['world', 'Europe'], (v) =>
      map.flyTo(v === 'Europe' ? { center: [15, 52], zoom: 3.5 } : { center: [10, 25], zoom: 1.5 }),
    );
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
