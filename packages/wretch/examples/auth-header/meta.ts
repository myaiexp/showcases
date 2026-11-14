// auth-header example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Log in with .auth()",
  summary:
    ".auth() sets the Authorization header. Without it the server says 401 and the app asks you to log in; with the right token the private data arrives.",
  section: "Helper methods",
  tags: ["auth", "unauthorized", "headers"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
