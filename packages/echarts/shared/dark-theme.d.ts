// Types for ECharts' built-in dark theme module, which ships without its own .d.ts in lib/
declare module 'echarts/lib/theme/dark.js' {
  const theme: Record<string, unknown>;
  export default theme;
}
