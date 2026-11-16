// leafer-ui example: pick: through path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "pick: through path",
  summary: "pick(point, { through: true }) also returns throughPath: every element under the point from top to bottom, including the ones hidden behind the target. The caption lists them.",
  section: "Element advanced",
  tags: ["pick", "through", "throughPath", "IPickResult"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/pick.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
