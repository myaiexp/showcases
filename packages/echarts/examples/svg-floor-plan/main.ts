// An SVG floor plan as a geo base map: named rooms selectable, sensors placed on it
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every } from '../../shared/chart.ts';
import { FLOOR_PLAN, ROOMS, SENSORS } from './plan.ts';

// registerMap takes a raw SVG string as well as GeoJSON.
echarts.registerMap('office_floor', { svg: FLOOR_PLAN });

const ROOM_COLORS = ['#2e4a62', '#33415c', '#3d5170', '#40566e', '#4a5a3c', '#4b3f5c'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const status = document.createElement('span');
  status.textContent = 'Click rooms to select them; drag or scroll to pan and zoom.';
  bar?.append(status);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  chart.setOption({
    tooltip: {},
    geo: {
      map: 'office_floor',
      // roam enables zoom and pan on the base map.
      roam: !ctx.preview,
      // The bounding rect is fitted, aspect kept, into a square centred at layoutCenter.
      layoutCenter: ['50%', '50%'],
      layoutSize: '95%',
      selectedMode: 'multiple',
      // Hovering one room blurs the rest.
      // For named elements areaColor is the fill; it replaces the fill written in the SVG.
      emphasis: { focus: 'self', itemStyle: { areaColor: '#6b8fd6' }, label: { show: true, color: '#fff' } },
      select: { itemStyle: { areaColor: '#d68a3c' }, label: { show: true, color: '#fff' } },
      blur: { itemStyle: { opacity: 0.4 } },
      tooltip: { show: true, formatter: '{a}' },
      // Per-region overrides, by the element's name in the SVG.
      regions: [
        ...ROOMS.filter((n) => n !== 'Server room').map((name, i) => ({ name, itemStyle: { areaColor: ROOM_COLORS[i % ROOM_COLORS.length] } })),
        {
          name: 'Server room',
          itemStyle: { areaColor: '#5c3b3b', borderColor: '#ff6b6b', borderWidth: 2 },
          tooltip: { formatter: 'Server room: keycard only' },
        },
      ],
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        // Values are in the SVG file's own units, not longitude and latitude.
        data: SENSORS,
        symbolSize: (v: number[]) => (v[2]! - 15) * 1.6,
        itemStyle: { color: '#ffd166' },
        tooltip: { formatter: (p: { value: number[] }) => `Sensor: ${p.value[2]} °C` },
      },
    ],
  });

  if (ctx.preview) {
    // geoToggleSelect by region name, one room at a time.
    let i = 0;
    const stop = every(900, () => {
      chart.dispatchAction({ type: 'geoToggleSelect', geoIndex: 0, name: ROOMS[i % ROOMS.length] });
      i++;
    });
    return () => {
      stop();
      dispose();
    };
  }

  // geoselectchanged reports every selected region name.
  chart.on('geoselectchanged', (event) => {
    const e = event as { allSelected: { name: string[] }[] };
    const names = e.allSelected[0]?.name ?? [];
    status.textContent = names.length ? `Selected: ${names.join(', ')}` : 'Nothing selected';
  });

  return dispose;
};

export default mount;
