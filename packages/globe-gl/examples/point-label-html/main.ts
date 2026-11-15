// pointLabel: tooltips as plain text, an HTML string or an HTML element
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import './style.css';

const KINDS = ['HTML string', 'HTML element', 'plain text'] as const;

/** An element built per hover: a name, a population bar and a figure. */
function card(c: City): HTMLElement {
  const box = document.createElement('div');
  box.className = 'tip';
  const name = document.createElement('b');
  name.textContent = c.name;
  const bar = document.createElement('div');
  bar.className = 'bar';
  bar.style.width = `${Math.min(100, (c.pop / 37) * 100)}%`;
  box.append(name, bar, `${c.pop} million`);
  return box;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a column. The label accessor can return text, an HTML string or an element.' });
  const dark = await texture('dark');

  const labels = {
    'HTML string': (d: object) => `<div class="tip"><b>${(d as City).name}</b><br>${(d as City).pop} million</div>`,
    'HTML element': (d: object) => card(d as City),
    'plain text': (d: object) => `${(d as City).name} (${(d as City).pop} M)`,
  };
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pointsData(cities)
    .pointRadius(0.7)
    .pointColor(() => '#7bdff2')
    .pointLabel(labels['HTML element']);
  globe.pointOfView({ lat: 30, lng: 80, altitude: 2.2 });

  if (stage.bar) select(stage.bar, 'pointLabel returns', KINDS, (k) => globe.pointLabel(labels[k]), 'HTML element');
  else {
    const ghost = stage.ghost(globe);
    const tour = ['Delhi', 'Shanghai', 'Tokyo', 'Bangkok', 'Mumbai'].map((n) => cities.find((c) => c.name === n)!);
    let i = 0;
    stage.every(1500, () => {
      const c = tour[i++ % tour.length]!;
      ghost.at(c.lat, c.lng, 0.1);
    });
  }

  return stage.dispose;
};

export default mount;
