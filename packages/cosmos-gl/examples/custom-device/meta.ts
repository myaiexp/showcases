// cosmos-gl example: Custom device
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom device',
  summary:
    'The third Graph argument is a luma.gl device you made yourself. graph.destroy() frees the graph but leaves that device alone, so the device stays alive (isLost stays false) and the next graph is built on it. Destroying the device is the page’s job.',
  section: 'Headless & shared device',
  tags: ['new Graph(div, config, devicePromise)', 'destroy'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/docs/host-embedding/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
