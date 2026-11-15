// embedding-atlas example: list layout chartsOrder and chartVisibility
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "List layout order and visibility",
  summary:
    "chartsOrder on a list layout lists chart ids in the order they stack, and chartVisibility hides single charts by id. The variants reverse the order, then hide the topic count plot, without removing it from the layout.",
  section: "State & Layouts",
  tags: ['layouts', 'type: list', 'chartsOrder', 'chartVisibility', 'chartIds'],
  docs: [
    'repo/packages/viewer/src/layouts/list/types.ts',
    'repo/packages/viewer/src/layouts/layout_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
