// zephyr3d example: Lifetime: DRef, DWeakRef and deferred dispose
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lifetime: DRef, DWeakRef and deferred dispose',
  summary:
    'A Disposable subclass owns a texture through its own DRef and releases it in onDispose. A strong DRef holds the current swatch; set() swaps in a new one and the old one is disposed on the next frame, which the log shows, while a DWeakRef to it turns null.',
  section: 'Advanced Topics',
  tags: ['DRef', 'DWeakRef', 'Disposable', 'onDispose', 'createTexture2D'],
  docs: ['repo/apps/doc/web/en/lifetime.md', 'repo/apps/doc/web/en/texture.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
