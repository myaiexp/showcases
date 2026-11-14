// crud-methods example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Create, read, update, delete",
  summary:
    "A to-do list on a simulated server, changed with post, get, put, patch and delete. A coloured badge names the method that last changed the list.",
  section: "HTTP methods",
  tags: ["get", "post", "put", "patch", "delete"],
  docs: ["repo/README.md", "repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
