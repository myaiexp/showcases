// l7 example: source.setData(data, option)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "source.setData(data, option)",
  summary:
    "Calling setData on the Source replaces its rows and, with an option, its parser; the layers on it redraw by themselves.",
  section: "Source",
  tags: ["Source","setData","parser","update"],
  docs: ["repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
