// l7 example: new Source(data, options)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "new Source(data, options)",
  summary:
    "A Source parses data once (JSON rows, CSV text or GeoJSON) and can feed several layers; getParserType() and getSourceCfg() report what it was given.",
  section: "Source",
  tags: ["Source","parser","getParserType","getSourceCfg","inited","layer.source"],
  docs: ["repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
