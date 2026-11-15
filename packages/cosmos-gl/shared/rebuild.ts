// A shared device and graph hand-over for examples that rebuild their graph
import { Graph, type GraphConfig } from '@cosmos.gl/graph';
import type { Device } from '@luma.gl/core';
import type { Stage } from './stage.ts';

export interface Rebuilder {
  /** The one device every graph of the example is built on. */
  readonly device: Promise<Device>;
  /** Destroys the previous graph, remembers `graph` as the current one and returns it. */
  adopt(graph: Graph): Graph;
  /** Same as adopt(new Graph(stage.div, config, device)). */
  build(config: GraphConfig): Graph;
  readonly current: Graph | undefined;
}

/**
 * One device for the whole example: Graph.destroy() leaves a device it did not make alone,
 * so a rebuilt graph reuses it, and the stage frees it once at the end.
 */
export function rebuilder(stage: Stage): Rebuilder {
  const device = stage.device();
  let current: Graph | undefined;
  stage.onDispose(() => current?.destroy());
  const self: Rebuilder = {
    device,
    adopt(graph) {
      current?.destroy();
      current = graph;
      return graph;
    },
    build(config) {
      return self.adopt(new Graph(stage.div, config, device));
    },
    get current() {
      return current;
    },
  };
  return self;
}
