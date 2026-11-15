// @var(--lg) stays a var() inside a stored rule
import { show } from '../../shared/c-kit.ts';

export default show({
    attrs: {"use":"var(--rule)","style":"--rule: (\n  @grid: 5 / 100% _1px;\n  --lg: linear-gradient(\n    @p(±45deg, ±135deg), #000 50%, #0000 0\n  );\n  background:\n    @var(--lg) 0 0 / 100% 100%,\n    @var(--lg) 0 0 / 50% 50%;\n);"},
    reroll: true,
    say: "use=\"var(--rule)\": the rule is the custom property's value",
});
