// One page-wide queue for scripted drags: Leaflet's Draggable allows one drag per page
let lane: Promise<unknown> = Promise.resolve();

/**
 * Runs `job` after every scripted drag queued before it, from any card (map drags in
 * gestures.ts and marker drags in marker-input.ts share it). A failed job doesn't block the rest.
 */
export function inDragLane(job: () => Promise<void>): Promise<void> {
  const run = lane.then(job);
  lane = run.catch(() => undefined);
  return run;
}
