// Writing an addon: value functions registered with CSSDoodle.use()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Writing a value addon',
  summary:
    'CSSDoodle.use(name, { value }) adds @name() to every doodle on the page. value(args, api) gets the evaluated arguments and the cell (i, x, y, the counts, and random(), the doodle\'s seeded stream) and returns CSS text. This registers the guide\'s @stripes under a unique name, plus a hue ramp by column that reads x, X and random.',
  section: 'Addons',
  tags: ['CSSDoodle.use()', 'value', 'addons', 'custom functions'],
  docs: ['pages/css-doodle-com/addons.md', 'pages/github-com/css-doodle/addons/blob/v1-1-0/README-md.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
