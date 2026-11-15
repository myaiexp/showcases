// Types for the plotly.js dist files examples import directly (geo assets, locales)
declare module 'plotly.js/dist/plotly-geo-assets.js' {
  const assets: { topojson: Record<string, unknown>; version: string };
  export default assets;
}

declare module 'plotly.js/lib/locales/*.js' {
  /** A locale module for Plotly.register or config.locales: name, dictionary, format. */
  const locale: { moduleType: 'locale'; name: string; dictionary: Record<string, string>; format: Record<string, unknown> };
  export default locale;
}
