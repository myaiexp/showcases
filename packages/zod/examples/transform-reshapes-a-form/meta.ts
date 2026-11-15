// Zod example: Reshape a whole form with transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reshape a whole form with transform',
  summary:
    "A transform can sit on an object schema. After the fields are checked, it receives the clean object and returns a different shape: first and last name become one fullName and the email is lowercased. The output pane marks what was added and dropped.",
  section: 'Transforms and pipes',
  tags: ['transform', 'z.object', 'reshape'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
