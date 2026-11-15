// getScreenCoords: pin plain DOM labels to places by projecting them every frame
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import './style.css';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The labels are ordinary divs over the canvas, moved to getScreenCoords each frame.' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(day);
  globe.controls().autoRotate = true;

  const picked = cities.filter((c) => c.pop > (stage.preview ? 18 : 10));
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  stage.container.append(overlay);
  const tags = picked.map((c) => {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.textContent = c.name;
    overlay.append(tag);
    return tag;
  });

  stage.loop(() => {
    // Hide places on the far side: compare each one with the point of view.
    const pov = globe.pointOfView();
    picked.forEach((c, i) => {
      const { x, y } = globe.getScreenCoords(c.lat, c.lng, 0.01);
      const tag = tags[i]!;
      tag.style.transform = `translate(${x}px, ${y}px)`;
      tag.style.opacity = facing(c.lat, c.lng, pov.lat, pov.lng) > 0.15 ? '1' : '0';
    });
  });

  return stage.dispose;
};

/** Cosine of the angle between two places on the sphere: below 0 is the far side. */
function facing(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const r = Math.PI / 180;
  return Math.sin(lat1 * r) * Math.sin(lat2 * r) + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.cos((lng1 - lng2) * r);
}

export default mount;
