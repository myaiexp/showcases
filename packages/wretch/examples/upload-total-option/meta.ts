// upload-total-option: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tell the progress bar how big the upload is",
  summary:
    "ProgressAddon({ getUploadTotal }) supplies the total size of the upload instead of the addon measuring it. Three runs: measured, told about right, and told far too small.",
  section: 'Addons',
  tags: ["getUploadTotal", "ProgressAddon", "onUpload"],
  docs: ["repo/src/addons/progress.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
