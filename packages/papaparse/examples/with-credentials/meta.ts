// Papa Parse example: withCredentials sends cookies along with the download
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Send cookies to another site',
  summary:
    'A file on another website is downloaded without your cookies by default, so a members-only file says no. Set withCredentials: true and the browser sends the cookies (your login) along, and the same file now arrives. The server here is a stand-in inside the page.',
  section: 'Parse config',
  tags: ['download', 'withCredentials', 'XMLHttpRequest', 'error'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
