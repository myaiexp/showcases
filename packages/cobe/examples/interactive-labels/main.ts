// Interactive labels: clickable buttons anchored to markers, with details
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PLACES } from '../../shared/places.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a city label to open its details.' });

  const cities = [PLACES.nyc, PLACES.london, PLACES.singapore, PLACES.sydney, PLACES.capetown].map((p) => ({
    id: stage.id(p.key),
    name: p.name,
    location: p.location,
  }));

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.25,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.45, 0.6],
    glowColor: [0.3, 0.25, 0.3],
    markers: cities.map((c) => ({ location: c.location, size: 0.04, id: c.id })),
  });
  stage.own(globe);

  let selected: string | null = null;
  const buttons = cities.map((c) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'city-label';
    button.style.setProperty('position-anchor', `--cobe-${c.id}`);
    button.style.opacity = `var(--cobe-visible-${c.id}, 0)`;
    const name = document.createElement('span');
    name.textContent = c.name;
    const detail = document.createElement('span');
    detail.className = 'detail';
    const [lat, lon] = c.location;
    detail.textContent = `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'} ${Math.abs(lon).toFixed(2)}°${lon >= 0 ? 'E' : 'W'}`;
    button.append(name, detail);
    button.addEventListener('click', () => select(selected === c.id ? null : c.id));
    stage.layer.append(button);
    return { id: c.id, button };
  });

  function select(id: string | null): void {
    selected = id;
    for (const b of buttons) b.button.classList.toggle('selected', b.id === id);
  }

  // Card: no pointer, so the selection moves on its own.
  if (stage.preview) {
    let i = 0;
    stage.every(1800, () => select(cities[i++ % cities.length]!.id));
  }

  let phi = 0;
  stage.loop(() => {
    phi += 0.003;
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
