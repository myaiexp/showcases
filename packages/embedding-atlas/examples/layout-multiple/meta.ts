// embedding-atlas example: layouts with layoutOrder and currentLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Several layouts, current layout",
  summary:
    "initialState holds two layouts: a dashboard and a list. layoutOrder sets the tab order and currentLayout which one opens first. The variants open each; in the full view the tabs in the top bar switch between them.",
  section: "State & Layouts",
  tags: ['layouts', 'layoutOrder', 'currentLayout', 'type: dashboard', 'type: list'],
  docs: [
    'repo/packages/viewer/src/api.ts',
    'repo/packages/viewer/src/layouts/layout_types.ts',
    'repo/packages/viewer/src/layouts/dashboard/types.ts',
    'repo/packages/viewer/src/layouts/list/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
