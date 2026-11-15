// A use value that is not var(...) is the doodle code itself
import { simple } from '../../shared/a-kit.ts';

const code = `@grid: 5x5 / 100%;
--lg: linear-gradient(
  @p(±45deg, ±135deg), #fff 50%, #0000 0
);
background:
  @p(--lg) 0 0 / 100% 100%,
  @p(--lg) 0 0 / 50% 50%;`;

export default simple({
  code: '',
  noEditor: true,
  reroll: true,
  attrs: { use: code },
  source: { title: 'The element has no content, only use="', text: `${code}"` },
  say: 'The code is the value of the use attribute',
});
