// use="var(--rule)" loads the whole doodle code from a custom property
import { simple } from '../../shared/a-kit.ts';

const rule = `(
  @grid: 5x5 / 100%;
  --lg: linear-gradient(
    @p(±45deg, ±135deg), #fff 50%, #0000 0
  );
  background:
    @p(--lg) 0 0 / 100% 100%,
    @p(--lg) 0 0 / 50% 50%;
)`;

export default simple({
  code: '',
  noEditor: true,
  reroll: true,
  attrs: { use: 'var(--rule)', style: `--rule: ${rule};` },
  source: { title: 'The element has use="var(--rule)" and its style holds', text: `--rule: ${rule};` },
  say: 'The code is not in the element: it is the value of --rule',
});
