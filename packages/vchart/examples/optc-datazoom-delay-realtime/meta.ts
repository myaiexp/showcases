// vchart example: DataZoom realTime and delayType
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DataZoom realTime and delayType",
  summary: "With realTime off the chart updates only when the drag ends; delayType throttle or debounce thins out the change events. A readout counts the dataZoomChange events a scripted drag produces.",
  section: "Option: Components",
  tags: ["dataZoom.realTime","delayType","delayTime","dataZoomChange"],
  docs: [
    'repo/docs/assets/option/en/component/data-filter-component-common/data-filter-base-component.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
