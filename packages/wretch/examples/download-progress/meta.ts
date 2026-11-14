// download-progress: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A progress bar for a download",
  summary:
    ".progress() reports how many bytes have arrived. A big file comes down in twelve slow pieces and the bar fills with each one.",
  section: 'Addons',
  tags: ["progress", "ProgressAddon", "download"],
  docs: ["repo/README.md", "repo/src/addons/progress.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
