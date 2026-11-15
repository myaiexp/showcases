// d2 example: Link to a board with a dot in its name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Link to a board with a dot in its name",
  summary:
    "A board named 2012.06 is targeted as `layers.\"2012.06\"`, with quotes, because an unquoted dot would split the name into two board levels. The same quoted path works as render's `target`.",
  section: "Linking",
  tags: ["link", "layers", "quotes"],
  docs: [
    "repo/docs/tour/linking.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
