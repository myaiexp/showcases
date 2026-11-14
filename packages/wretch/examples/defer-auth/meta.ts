// defer-auth example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Add auth at the last moment",
  summary:
    ".defer() runs a function just before each request is sent. Here it adds the login to requests for /user and leaves other requests alone; the two requests show side by side.",
  section: "Helper methods",
  tags: ["defer", "auth", "options"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
