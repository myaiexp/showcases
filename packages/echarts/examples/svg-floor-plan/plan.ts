// Office floor plan SVG: named rooms ECharts can style and select, plus unnamed walls

// Only elements with a `name` become regions. The two restroom rects share one named <g>,
// so they highlight together and get a single label.
export const FLOOR_PLAN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360">
  <rect x="0" y="0" width="600" height="360" fill="#1d2230" />
  <rect name="Lobby" x="20" y="250" width="160" height="90" fill="#33415c" />
  <rect name="Open office" x="20" y="20" width="280" height="210" fill="#2e4a62" />
  <rect name="Meeting A" x="320" y="20" width="120" height="100" fill="#3d5170" />
  <rect name="Meeting B" x="460" y="20" width="120" height="100" fill="#3d5170" />
  <path name="Kitchen" d="M320 140 H580 V230 H450 L420 200 H320 Z" fill="#4a5a3c" />
  <g name="Restrooms">
    <rect x="200" y="250" width="45" height="90" fill="#4b3f5c" />
    <rect x="255" y="250" width="45" height="90" fill="#4b3f5c" />
  </g>
  <rect name="Server room" x="320" y="250" width="110" height="90" fill="#5c3b3b" />
  <rect name="Storage" x="450" y="250" width="130" height="90" fill="#3f3f3f" />
  <path d="M10 10 H590 V350 H10 Z" fill="none" stroke="#8a93a8" stroke-width="4" />
</svg>`;

export const ROOMS = ['Lobby', 'Open office', 'Meeting A', 'Meeting B', 'Kitchen', 'Restrooms', 'Server room', 'Storage'];

/** Sensors in the SVG's own coordinates: [x, y, reading]. */
export const SENSORS: [number, number, number][] = [
  [90, 90, 21], [220, 160, 23], [380, 70, 25], [520, 70, 22], [500, 185, 24], [375, 295, 31], [100, 295, 20],
];
