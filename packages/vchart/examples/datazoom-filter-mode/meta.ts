// vchart example: DataZoom filterMode: filter and axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DataZoom filterMode: filter and axis',
  summary:
    'A DataZoom slider over a rising bar series. filterMode \'filter\' removes data outside the window, so the value axis rescales; \'axis\' only moves the axis window and keeps the full range. A readout shows the dataZoomChange event.',
  section: 'Concepts: Components',
  tags: ['dataZoom', 'filterMode', 'dataZoomChange', 'setStartAndEnd'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Datazoom.md',
    'repo/docs/assets/option/en/component/data-zoom.md',
    'repo/docs/assets/option/en/component/data-filter-component-common/data-filter-base-component.md',
    'repo/docs/assets/api/en/API/event.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
