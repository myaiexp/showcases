// Perspective example: a custom virtual server over a JavaScript array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom virtual server',
  summary:
    'A VirtualServerHandler answers the viewer from a plain array: tableMakeView applies the filter and sort, viewGetData pushes only the visible window into the slice, and getFeatures declares sort and filter only, so the settings panel offers nothing else. Every handler call is logged.',
  section: 'Virtual Servers',
  tags: ['VirtualServerHandler', 'createMessageHandler', 'getFeatures', 'viewGetData', 'tableMakeView', 'open_table'],
  docs: [
    'repo/docs/md/how_to/javascript/virtual_server/custom.md',
    'repo/docs/md/how_to/javascript/virtual_server.md',
    'repo/docs/md/explanation/virtual_servers.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
