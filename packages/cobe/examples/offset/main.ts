// offset: the globe's pixel offset from the centre, moved in a circle in cards
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: [''], hint: 'The dashed line is the canvas; offset is in CSS pixels from its centre.' });
  const caption = stage.panes[0]!.caption!;
  stage.canvas.style.outline = '1px dashed var(--fg-3)';
  const reach = Math.round(stage.height * 0.1); // the globe fills 80% of the canvas, so 10% each way touches the edge

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
    glowColor: [0.25, 0.25, 0.3],
    markers: [
      { location: [37.78, -122.44], size: 0.04 },
      { location: [51.51, -0.13], size: 0.04 },
      { location: [35.68, 139.65], size: 0.04 },
    ],
    offset: [0, 0], // swept
  });
  stage.own(globe);

  let x = 0;
  let y = 0;
  let phi = 0;
  stage.loop((_dt, t) => {
    if (stage.preview) {
      x = Math.round(reach * Math.cos(t * 0.8));
      y = Math.round(reach * Math.sin(t * 0.8));
    }
    phi += 0.005;
    globe.update({ phi, offset: [x, y] });
    caption.textContent = `offset [${x}, ${y}]`;
  });

  if (stage.bar) {
    const max = Math.round(stage.height * 0.5);
    slider(stage.bar, 'offset x', -max, max, 1, 0, (v) => {
      x = v;
    });
    slider(stage.bar, 'offset y', -max, max, 1, 0, (v) => {
      y = v;
    });
  }

  return stage.dispose;
};

export default mount;
