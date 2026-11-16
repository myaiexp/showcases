// leafer-ui example: Data: proxyData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: proxyData",
  summary:
    "proxyData is reactive data that stays in sync with the element: write the proxy and the element changes, set the element and the proxy follows. A plain Proxy stands in for the docs' Vue override.",
  section: "Data",
  tags: ["proxyData","createProxyData","clearProxyData"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/proxy.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
