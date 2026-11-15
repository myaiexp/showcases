// l7 example: MouseLocation and locationChange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MouseLocation and locationChange",
  summary:
    "The control prints the longitude and latitude under the cursor; locationChange fires on every move and getLocation() reads the last raw position.",
  section: "Component",
  tags: ["MouseLocation","locationChange","getLocation"],
  docs: ["repo/site/docs/api/component/mouse_location.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
