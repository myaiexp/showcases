// The SVG primitives VChart's pictogram supports, each given a name the data can refer to
export const SHAPES_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <rect name="rect" x="10" y="10" width="110" height="60" fill="#3f7fd0"/>
  <circle name="circle" cx="210" cy="45" r="40" fill="#ef5a4c"/>
  <ellipse name="ellipse" cx="100" cy="150" rx="70" ry="32" fill="#2fb27a"/>
  <line name="line" x1="10" y1="215" x2="200" y2="215" stroke="#e8e8e8" stroke-width="4"/>
  <polyline name="polyline" points="230,230 250,200 270,230 290,200 310,230" fill="none" stroke="#b07be0" stroke-width="4"/>
  <polygon name="polygon" points="320,10 380,10 395,55 350,95 305,55" fill="#f4a54c"/>
  <path name="path" d="M 20 300 Q 100 350 180 300 T 340 300 L 340 340 L 20 340 Z" fill="#c98a5a"/>
  <text name="text" x="20" y="380" font-family="Verdana" font-size="26" fill="#e8e8e8">Hello, SVG!</text>
</svg>`;

export const SHAPE_NAMES = ['rect', 'circle', 'ellipse', 'polygon', 'path'];
