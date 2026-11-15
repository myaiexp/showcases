// A symbol shape can be an SVG path in a -1 to 1 box, taken from a data field
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440, height: 170, padding: 5,
    signals: [{ name: 'grow', value: 1, bind: { input: 'range', min: 0.3, max: 1.6, step: 0.05 } }],
    data: [{
      name: 'table',
      values: [
        { k: 'heart', v: 90, color: '#e07fb0', shape: 'M0,.9C-1.3,-.1 -.7,-1 0,-.45C.7,-1 1.3,-.1 0,.9Z' },
        { k: 'bolt', v: 40, color: '#f59e0b', shape: 'M.2,-1L-.6,.15H-.05L-.25,1L.6,-.2H.05Z' },
        { k: 'plus', v: 65, color: '#4fa3e0', shape: 'M-.3,-1H.3V-.3H1V.3H.3V1H-.3V.3H-1V-.3H-.3Z' },
        { k: 'moon', v: 25, color: '#c9b3ff', shape: 'M.2,-1A1,1 0 1,0 .2,1A.75,.75 0 1,1 .2,-1Z' },
        { k: 'house', v: 75, color: '#7fd18b', shape: 'M-.9,.9V-.1L0,-.95L.9,-.1V.9Z' },
      ],
    }],
    scales: [
      { name: 'x', type: 'point', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.6 },
      { name: 'area', type: 'sqrt', domain: [0, 100], range: [0, 9000] },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }],
    marks: [{
      type: 'symbol',
      from: { data: 'table' },
      encode: {
        enter: { fillOpacity: { value: 0.85 }, stroke: { value: '#fff' }, strokeWidth: { value: 1 } },
        update: {
          x: { scale: 'x', field: 'k' }, y: { signal: 'height / 2' },
          shape: { field: 'shape' }, fill: { field: 'color' },
          size: { signal: "scale('area', datum.v) * grow" },
        },
        hover: { fillOpacity: { value: 1 } },
      },
    }],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'grow', [1, 0.4, 1.5, 0.7], 1200);
  return () => stage.dispose();
};

export default mount;
