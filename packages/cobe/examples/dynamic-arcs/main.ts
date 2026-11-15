// Dynamic Markers recipe applied to arcs: routes added over time from one hub
import createGlobe from 'cobe';
import type { Arc } from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { ALL_PLACES, PLACES } from '../../shared/places.ts';

const hub = PLACES.london;
const SPOKES = ALL_PLACES.filter((p) => p !== hub);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same pattern works for arcs: pass a longer arcs array to update().' });

  let arcs: Arc[] = [];

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 4.8,
    theta: 0.3,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.2, 0.2, 0.25],
    markers: [{ location: hub.location, size: 0.05 }],
    arcs,
    arcColor: [0.3, 0.7, 1],
    arcWidth: 0.5,
    arcHeight: 0.3,
  });
  stage.own(globe);

  const addArc = (): void => {
    if (arcs.length >= SPOKES.length) {
      arcs = [];
      return;
    }
    arcs = [...arcs, { from: hub.location, to: SPOKES[arcs.length]!.location }];
  };

  let auto = true;
  stage.every(stage.preview ? 600 : 900, () => auto && addArc());
  if (stage.bar) {
    button(stage.bar, 'Add arc', addArc);
    button(stage.bar, 'Clear', () => (arcs = []));
    checkbox(stage.bar, 'Add one per tick', true, (v) => (auto = v));
  }

  const count = document.createElement('div');
  count.style.cssText = 'position:absolute;left:8px;top:6px;font:12px ui-monospace,monospace;color:var(--fg-1)';
  stage.layer.append(count);

  let phi = 4.8;
  stage.loop(() => {
    phi += 0.004;
    globe.update({ phi, arcs });
    count.textContent = `arcs from ${hub.name}: ${arcs.length}`;
  });

  return stage.dispose;
};

export default mount;
