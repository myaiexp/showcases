// Dynamic Markers recipe: a growing markers array handed to update() every frame
import createGlobe from 'cobe';
import type { Marker } from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { ALL_PLACES } from '../../shared/places.ts';

const CAP = ALL_PLACES.length;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: `Each click (or tick) adds one city; at ${CAP} markers the list starts over.` });

  // Store markers in a ref
  let markers: Marker[] = [{ location: ALL_PLACES[0]!.location, size: 0.03 }];

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
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.2, 0.2, 0.25],
    markers,
  });
  stage.own(globe);

  // Add marker dynamically
  const addMarker = (lat: number, lon: number): void => {
    markers = [...markers, { location: [lat, lon], size: 0.03 }];
  };
  const reset = (): void => {
    markers = [{ location: ALL_PLACES[0]!.location, size: 0.03 }];
  };
  const addNext = (): void => {
    if (markers.length >= CAP) return reset();
    const [lat, lon] = ALL_PLACES[markers.length]!.location;
    addMarker(lat, lon);
  };

  let auto = true;
  stage.every(stage.preview ? 700 : 1000, () => auto && addNext());
  if (stage.bar) {
    button(stage.bar, 'Add marker', addNext);
    button(stage.bar, 'Reset', reset);
    checkbox(stage.bar, 'Add one per second', true, (v) => (auto = v));
  }

  const count = document.createElement('div');
  count.style.cssText = 'position:absolute;left:8px;top:6px;font:12px ui-monospace,monospace;color:var(--fg-1)';
  stage.layer.append(count);

  let phi = 0;
  stage.loop(() => {
    phi += 0.004;
    // Update markers each frame
    globe.update({ phi, markers });
    count.textContent = `markers: ${markers.length}`;
  });

  return stage.dispose;
};

export default mount;
