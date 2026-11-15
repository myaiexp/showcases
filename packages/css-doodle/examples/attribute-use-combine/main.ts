// use lists two stored rules; the element's own code is merged in after them
import { simple } from '../../shared/a-kit.ts';

const grid = '(\n  @grid: 8x8 / 100%;\n)';
const pattern = `(
  --lg: linear-gradient(
    @p(±45deg, ±135deg), #fff 50%, #0000 0
  );
  background:
    @p(--lg) 0 0 / 100% 100%,
    @p(--lg) 0 0 / 50% 50%;
)`;

export default simple({
  code: ':doodle {\n  outline: 4px solid #e6437d;\n}',
  reroll: true,
  attrs: { use: 'var(--rule-grid), var(--rule-pattern)', style: `--rule-grid: ${grid}; --rule-pattern: ${pattern};` },
  source: { title: 'use="var(--rule-grid), var(--rule-pattern)" with', text: `--rule-grid: ${grid};\n--rule-pattern: ${pattern};` },
  say: 'Two stored rules plus the code in the editor',
});
