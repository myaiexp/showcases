// upload-progress: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A progress bar for an upload",
  summary:
    ".onUpload() reports how much of the body has left. Not every browser can stream a request body; Firefox cannot, and then the example says so instead of showing a stuck bar.",
  section: 'Addons',
  tags: ["onUpload", "ProgressAddon", "upload"],
  docs: ["repo/README.md", "repo/src/addons/progress.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
