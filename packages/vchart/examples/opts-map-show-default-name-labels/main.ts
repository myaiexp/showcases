// map.showDefaultName: label the regions that nameMap and the data do not cover
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { SOUTH_AMERICA, registerWorldMaps } from '../../shared/world.ts';

const DATA = [{ name: 'BR', value: 80 }, { name: 'AR', value: 55 }, { name: 'CL', value: 35 }];
const NAME_MAP = { Brazil: 'BR', Argentina: 'AR', Chile: 'CL' };

const mount: Mount = (el, ctx) => {
  registerWorldMaps();
  return mountLive<{ show: boolean }>(el, ctx, {
    initial: { show: true },
    mode: 'rebuild',
    previewMs: 1800,
    chart: { height: 460 },
    step: (s) => ({ show: !s.show }),
    build: (s, preview) =>
      ({
        type: 'map',
        map: SOUTH_AMERICA,
        nameField: 'name',
        valueField: 'value',
        nameMap: NAME_MAP,
        showDefaultName: s.show,
        data: [{ id: 'values', values: DATA }],
        color: { type: 'linear', range: ['#3b4a8f', '#f4c95d', '#ef5a4c'] },
        area: { style: { fill: { scale: 'color', field: 'value', changeDomain: 'replace' }, stroke: '#0f172a' } },
        defaultFillColor: 'rgba(255,255,255,0.12)',
        label: { visible: true, style: { fill: '#f8fafc', fontSize: preview ? 8 : 12 } },
        legends: { visible: false },
      }) as never,
    controls: (bar, live) => {
      select(bar, 'showDefaultName', ['true', 'false'], (v) => live.set({ show: v === 'true' }));
    },
  });
};

export default mount;
