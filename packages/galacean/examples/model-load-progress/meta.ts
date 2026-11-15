// galacean example: Model: loading progress
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: loading progress",
  summary:
    "Three generated models load as one batch; onProgress reports the batch total and each file's own progress, driving a bar under the stage.",
  section: "Model",
  tags: ['onProgress','ResourceManager','load'],
  docs: [
    'repo/docs/en/graphics/model/use.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
