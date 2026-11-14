// registerMap with a TopoJSON topology and its `object` name, drawn as a South America map
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { SOUTH_AMERICA, countryValues, registerWorldMaps } from '../../shared/world.ts';

const COUNTRIES = ['Peru', 'Chile', 'Brazil', 'Bolivia', 'Argentina', 'Paraguay', 'Venezuela', 'Colombia'];

const mount: Mount = (el, ctx) => {
  // registerWorldMaps ran: VChart.registerMap(SOUTH_AMERICA, topology, { type: 'topojson', object: 'south-america' })
  registerWorldMaps();
  const spec = {
    type: 'map',
    map: SOUTH_AMERICA,
    nameField: 'name',
    valueField: 'value',
    // seriesField gives each country its own colour from the default discrete palette.
    seriesField: 'name',
    data: [{ id: 'map', values: countryValues(COUNTRIES, 4, 2000) }],
    // Countries without a row in the data keep the default fill.
    defaultFillColor: 'rgba(255,255,255,0.12)',
    label: { visible: !ctx.preview, style: { fontSize: 11 } },
    legends: { visible: false },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 460 });

  let seed = 4;
  let released = false;
  const stop = every(2200, () => {
    if (!released) void vchart.updateData('map', countryValues(COUNTRIES, ++seed, 2000));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
