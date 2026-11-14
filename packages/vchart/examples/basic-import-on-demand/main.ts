// Import on demand: the core VChart class plus the register functions the chart needs
import type { Mount } from '@/types.ts';
import {
  VChart,
  registerBarChart,
  registerCartesianCrossHair,
  registerDomTooltipHandler,
  registerTooltip,
} from '@visactor/vchart';
import { createChart, every, readout } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

// The register functions from How_to_Import_VChart.md. Registering again is harmless here,
// because the gallery's shared setup imports the whole package.
const REGISTERS = [registerBarChart, registerTooltip, registerDomTooltipHandler, registerCartesianCrossHair];
VChart.useRegisters(REGISTERS);

const rand = seeded(11);
const CATEGORIES = ['North', 'South', 'East', 'West', 'Centre'];
const values = (): { region: string; revenue: number }[] =>
  CATEGORIES.map((region) => ({ region, revenue: Math.round(20 + rand() * 60) }));

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'sales', values: values() }],
    xField: 'region',
    yField: 'revenue',
    crosshair: { xField: { visible: true } },
  });
  let alive = true;
  const stop = every(2000, () => {
    if (alive) void vchart.updateData('sales', values());
  });
  if (!ctx.preview) {
    readout(el).textContent = `VChart.useRegisters([${REGISTERS.map((fn) => fn.name).join(', ')}])`;
  }

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
