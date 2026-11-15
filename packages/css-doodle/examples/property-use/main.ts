// @use inserts rules stored in custom properties on the element
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @use: var(--rule-aa), var(--rule-bb);
    background-color: #e6437d;
  `,
  attrs: {"style":"--rule-aa: (\n  @grid: 5 / 100%;\n  clip-path: circle(100% at 0 0);\n);\n--rule-bb: (\n  background-image: radial-gradient(#fff 50%, #0000 0);\n  background-position: -25% -25%;\n  background-size: @r(40%, 80%) @lr;\n  background-repeat: no-repeat;\n);"},
  reroll: true,
  source: { title: "The element carries", text: `
    --rule-aa: ( @grid: 5 / 100%; clip-path: circle(100% at 0 0); );
    --rule-bb: ( background-image: radial-gradient(#fff 50%, #0000 0); … );
  ` },
});
