// maplibre-gl example: Library info
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Library info',
  summary:
    'The library-level functions that report settings shared by every map on the page: version, worker count, the parallel image request limit, RTL plugin status and the worker URL. The request limit can be changed with its setter.',
  section: 'Global functions',
  tags: ['getVersion', 'getWorkerCount', 'getMaxParallelImageRequests', 'getRTLTextPluginStatus', 'getWorkerUrl'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/getVersion.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/getWorkerCount.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/getMaxParallelImageRequests.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/setMaxParallelImageRequests.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/getRTLTextPluginStatus.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/getWorkerUrl.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/isTimeFrozen.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
