// Event functions: pinchDistance and pinchAngle turn a two-finger touch into scale and rotation
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360,
    height: 220,
    padding: 8,
    signals: [
      // Two fingers on a touch screen set both signals through pinchDistance and pinchAngle; the sliders do the same by hand.
      {
        name: 'dist',
        value: 120,
        bind: { input: 'range', min: 40, max: 300, step: 1 },
        on: [{ events: 'touchmove![event.touches.length > 1]', update: 'round(clamp(pinchDistance(event), 40, 300))' }],
      },
      {
        name: 'angle',
        value: 20,
        bind: { input: 'range', min: -180, max: 180, step: 1 },
        on: [{ events: 'touchmove![event.touches.length > 1]', update: 'round(pinchAngle(event) * 180 / PI)' }],
      },
    ],
    marks: [
      {
        type: 'rect',
        encode: {
          update: {
            x: { signal: 'width / 2 - dist / 2' },
            y: { signal: 'height / 2 - dist / 2' },
            width: { signal: 'dist' },
            height: { signal: 'dist' },
            angle: { signal: 'angle' },
            cornerRadius: { value: 8 },
            fill: { value: 'steelblue' },
            fillOpacity: { value: 0.8 },
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { signal: 'width / 2 - 80 * cos(angle * PI / 180)' },
            y: { signal: 'height / 2 - 80 * sin(angle * PI / 180)' },
            x2: { signal: 'width / 2 + 80 * cos(angle * PI / 180)' },
            y2: { signal: 'height / 2 + 80 * sin(angle * PI / 180)' },
            stroke: { value: 'orange' },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 0 },
            y: { value: -2 },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            text: { signal: "'distance ' + dist + ' px, angle ' + angle + ' deg'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { dist: 120, angle: 20 },
      { dist: 200, angle: -40 },
      { dist: 70, angle: 90 },
      { dist: 260, angle: 150 },
    ],
    1100,
  );
  return () => stage.dispose();
};

export default mount;
