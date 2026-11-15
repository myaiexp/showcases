// Puts plotly.js's bundled topojson in window.PlotlyGeoAssets, so geo maps never fetch
type GeoAssets = { topojson: Record<string, unknown> };
declare global {
  interface Window {
    PlotlyGeoAssets?: GeoAssets;
  }
}

let loading: Promise<void> | null = null;

/**
 * Geo subplots (scattergeo, choropleth) look their topojson up in window.PlotlyGeoAssets
 * and fetch it from config.topojsonURL (cdn.plot.ly) only when it is missing. plotly.js
 * ships every file in dist/plotly-geo-assets.js; this loads that bundle once per page.
 * Await it before Plotly.newPlot.
 */
export function loadGeoAssets(): Promise<void> {
  loading ??= (async () => {
    const before = (window as { Plotly?: unknown }).Plotly;
    const { default: assets } = await import('plotly.js/dist/plotly-geo-assets.js');
    // The bundle's wrapper assigns itself to window.Plotly; put the real one back.
    (window as { Plotly?: unknown }).Plotly = before;
    const store = (window.PlotlyGeoAssets ??= { topojson: {} });
    Object.assign(store.topojson, assets.topojson);
  })();
  return loading;
}
