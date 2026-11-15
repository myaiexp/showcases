// d2 example: Model-view with imports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model-view with imports",
  summary:
    "models.d2 declares postgres, the IT guy and the VPN once; each view spreads it in with `...@models` and adds only its own connections. The two variants are the docs' access view and SSH view.",
  section: "Imports",
  tags: ["import", "spread", "models", "views"],
  docs: [
    "repo/docs/tour/model-view.md",
    "repo/docs/tour/imports-use-cases.md",
    "repo/static/d2/models.d2",
    "repo/static/d2/imports-mv-access-view.d2",
    "repo/static/d2/imports-mv-ssh-view.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
