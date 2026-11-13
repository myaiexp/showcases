// Initializes recast-navigation-js once per page for the navigation V2 examples
import * as RecastCore from '@recast-navigation/core';
import * as RecastGenerators from '@recast-navigation/generators';

let ready: Promise<void> | undefined;

/**
 * The `instance` the docs' ES6 setup passes to `CreateNavigationPluginAsync`, after
 * `RecastCore.init()` has loaded the WebAssembly build (its default build embeds the
 * .wasm, so there is no file to locate). Init runs once; every example builds its own
 * plugin, navmesh and crowd on top and disposes them itself.
 */
export async function recastInstance(): Promise<typeof RecastCore & typeof RecastGenerators> {
  ready ??= RecastCore.init();
  await ready;
  return { ...RecastCore, ...RecastGenerators };
}
