// Rich label content: live visitor counts and trend arrows anchored to markers
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PLACES, seeded } from '../../shared/places.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Labels are ordinary DOM: these update their numbers every second.' });
  const random = seeded(7);

  const sites = [PLACES.sf, PLACES.london, PLACES.tokyo, PLACES.saopaulo, PLACES.mumbai].map((p) => ({
    id: stage.id(p.key),
    name: p.name,
    location: p.location,
    visitors: 200 + Math.round(random() * 800),
    trend: 0,
  }));

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.3, 0.9, 0.5],
    glowColor: [0.25, 0.3, 0.3],
    markers: sites.map((s) => ({ location: s.location, size: 0.04, id: s.id })),
  });
  stage.own(globe);

  // Labels can contain any HTML content.
  const labels = sites.map((s) => {
    const label = document.createElement('div');
    label.className = 'analytics-label';
    label.style.setProperty('position-anchor', `--cobe-${s.id}`);
    label.style.opacity = `var(--cobe-visible-${s.id}, 0)`;
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = s.name;
    const count = document.createElement('span');
    count.className = 'count';
    const trend = document.createElement('span');
    label.append(name, count, trend);
    stage.layer.append(label);
    return { site: s, count, trend };
  });

  const render = (): void => {
    for (const { site, count, trend } of labels) {
      count.textContent = site.visitors.toLocaleString('en');
      trend.className = site.trend >= 0 ? 'up' : 'down';
      trend.textContent = `${site.trend >= 0 ? '↑' : '↓'} ${Math.abs(site.trend)}%`;
    }
  };
  render();
  stage.every(1000, () => {
    for (const s of sites) {
      const before = s.visitors;
      s.visitors = Math.max(50, Math.round(s.visitors * (0.9 + random() * 0.2)));
      s.trend = Math.round(((s.visitors - before) / before) * 100);
    }
    render();
  });

  let phi = 0;
  stage.loop(() => {
    phi += 0.004;
    globe.update({ phi });
  });

  return stage.dispose;
};

export default mount;
