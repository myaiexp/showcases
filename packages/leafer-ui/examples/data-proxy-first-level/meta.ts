// leafer-ui example: Data: proxyData first-level only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: proxyData first-level only",
  summary:
    "Only first-level properties of proxyData are reactive: editing proxyData.shadow.x changes nothing, replacing proxyData.shadow with a new object redraws.",
  section: "Data",
  tags: ["proxyData","shadow"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/proxy.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
