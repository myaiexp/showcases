// form-data-recursive-option: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Choose which nested keys flatten",
  summary:
    "recursive can be a list of key names to leave alone. In 3.0.9 those keys are not dropped as the README says: they are sent as [object Object]. The example shows what really arrives.",
  section: 'Addons',
  tags: ["formData", "recursive"],
  docs: ["repo/README.md", "repo/src/addons/formData.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
