// Geo layers chapter: the TerrainLoader's worker, served from this app, not a CDN
// The worker bundle ships in @loaders.gl/terrain (the version @deck.gl/geo-layers resolves);
// the docs' loadOptions.terrain.workerUrl points the loader at it. Without it the loader
// fetches its worker from unpkg, which a card must never do.
import workerUrl from '@loaders.gl/terrain/terrain-worker.js?url';

/** Pass as `loadOptions` of a TerrainLayer so the mesh decoder never leaves the page. */
export const terrainLoadOptions = { terrain: { workerUrl } };
