// Replays an example by destroying the previous host and mounting a new one
import type { Stage } from './stage.ts';

/** Returns a function that mounts a fresh host each call; the last one is destroyed on dispose. */
export function replayer(stage: Stage, create: () => { destroy(): void }): () => void {
  let host: { destroy(): void } | undefined;
  stage.onDispose(() => host?.destroy());
  return () => {
    if (stage.disposed) return;
    host?.destroy();
    host = create();
  };
}
