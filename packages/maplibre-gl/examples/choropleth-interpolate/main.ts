// Choropleth: fill-color from an interpolate expression over a score
import { Map } from 'maplibre-gl';
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';
import { select } from '../../shared/controls.ts';
import { MAX, scored } from './scores.ts';

const stops: [number, string][] = [[0, '#12355b'], [25, '#2a7ab0'], [50, '#7fc8a9'], [75, '#f2d16b'], [100, '#e4572e']];
const flat = stops.flat();

// The interpolation type is the second element: linear, exponential or a colour-space variant.
const ramps: Record<string, ExpressionSpecification> = {
  'interpolate linear': ['interpolate', ['linear'], ['get', 'score'], ...flat],
  'interpolate exponential 2': ['interpolate', ['exponential', 2], ['get', 'score'], ...flat],
  'interpolate-lab': ['interpolate-lab', ['linear'], ['get', 'score'], ...flat],
  'interpolate-hcl': ['interpolate-hcl', ['linear'], ['get', 'score'], ...flat],
};

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 25],
    zoom: preview ? 0.9 : 1.5,
    interactive: !preview,
  });
  const names = Object.keys(ramps);
  const apply = (name: string): void => {
    const ramp = ramps[name];
    if (ramp) map.setPaintProperty('scored', 'fill-color', ramp);
  };

  map.on('load', () => {
    map.addSource('scored', { type: 'geojson', data: scored() });
    map.addLayer(
      { id: 'scored', type: 'fill', source: 'scored', paint: { 'fill-color': ramps[names[0] ?? ''] ?? '#000' } },
      'borders',
    );
  });

  let timer = 0;
  let frame = 0;
  if (preview) {
    let i = 0;
    const drift = (): void => {
      map.setCenter([map.getCenter().lng + 0.12, 25]);
      frame = requestAnimationFrame(drift);
    };
    map.once('load', () => {
      timer = window.setInterval(() => apply(names[++i % names.length] ?? ''), 1800);
      drift();
    });
  } else {
    const bar = controlBar(el);
    const out = readout(el, 'score is a synthetic value (seeded random, 0 to 100); it is not real data.');
    select(bar, 'expression', names, (n) => {
      apply(n);
      out.textContent = `${n} over ["get", "score"]; synthetic data`;
    });
    // Legend: a CSS gradient built from the same stops as the expression.
    const legend = document.createElement('div');
    legend.style.cssText = 'width:min(360px,90%);margin:12px auto 0;font-size:12px;color:var(--fg-2)';
    const gradient = document.createElement('div');
    gradient.style.cssText = `height:12px;border-radius:6px;background:linear-gradient(to right,${stops
      .map(([v, c]) => `${c} ${(v / MAX) * 100}%`)
      .join(',')})`;
    const labels = document.createElement('div');
    labels.style.cssText = 'display:flex;justify-content:space-between;margin-top:2px';
    for (const [v] of stops) labels.append(Object.assign(document.createElement('span'), { textContent: String(v) }));
    const title = document.createElement('div');
    title.textContent = 'score (synthetic)';
    title.style.textAlign = 'center';
    legend.append(title, gradient, labels);
    el.append(legend);
  }

  return () => {
    clearInterval(timer);
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
