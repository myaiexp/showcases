// on-download: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Watch the download from the request side",
  summary:
    ".onDownload() is set on the client before .get(), and reports the same progress. Every call the callback gets is listed: one at the start, then one per piece.",
  section: 'Addons',
  tags: ["onDownload", "ProgressAddon"],
  docs: ["repo/src/addons/progress.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
