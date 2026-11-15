// aframe example: pool: requestEntity and returnEntity from a mixin pool
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "pool: requestEntity and returnEntity from a mixin pool",
  summary: "The scene's pool__enemy component pre-allocates 6 entities from a mixin. requestEntity() hands one out (paused, so play() must be called), returnEntity() gives it back and detaches it from rendering. A button spawns, one returns the oldest, and dynamic: true lets the pool grow past its size; the read-out counts what is out.",
  section: 'Components',
  tags: ["pool", "requestEntity", "returnEntity", "mixin", "size", "dynamic", "a-mixin", "play"],
  docs: ["repo/docs/components/pool.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
