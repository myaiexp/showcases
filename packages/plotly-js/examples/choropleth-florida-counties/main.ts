// Two GeoJSON fill layers colour Florida's counties red and blue on a tile map
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { json } from '../../shared/data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const [red, blue, land] = await Promise.all([
    json<object>('florida-red-data.json'),
    json<object>('florida-blue-data.json'),
    landLayers({ detail: '50m' }),
  ]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 560 });
  const fills = (showRed: boolean, showBlue: boolean): Record<string, unknown>[] => [
    ...land,
    ...(showRed ? [{ sourcetype: 'geojson', source: red, type: 'fill', color: 'rgba(163,22,19,0.8)' }] : []),
    ...(showBlue ? [{ sourcetype: 'geojson', source: blue, type: 'fill', color: 'rgba(60,40,170,0.8)' }] : []),
  ];

  await Plotly.newPlot(
    stage.div,
    // a lone far-away point gives the subplot a trace without drawing anything in Florida
    [{ type: 'scattermap', lat: [46], lon: [-74] }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Florida counties' },
      // the docs' style is 'light'; a blank style and land layers stand in
      map: { center: { lat: 28, lon: -84 }, style: darkMapStyle(), zoom: stage.preview ? 4 : 5.4, layers: fills(true, true) as never },
      margin: stage.preview ? { t: 0, b: 0, l: 0, r: 0 } : { t: 40, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const set = (r: boolean, b: boolean): Promise<void> => relayout(stage.div, { 'map.layers': fills(r, b) });
  if (stage.bar) {
    let r = true;
    let b = true;
    toggle(stage.bar, 'red counties', true, (v) => void set((r = v), b));
    toggle(stage.bar, 'blue counties', true, (v) => void set(r, (b = v)));
  }
  if (stage.preview) stage.every(1200, (i) => void set(i % 3 !== 1, i % 3 !== 2));

  return () => stage.dispose();
};

export default mount;
