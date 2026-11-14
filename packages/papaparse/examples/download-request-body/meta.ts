// Papa Parse example: downloadRequestBody makes the download a POST
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ask the server a question with a POST',
  summary:
    'A normal download is a GET: "give me that file". Add downloadRequestBody and Papa sends a POST with your text as the body, so the server can tailor the CSV, for example one region of a sales report. The server here is a stand-in inside the page.',
  section: 'Parse config',
  tags: ['download', 'downloadRequestBody', 'POST', 'complete'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
