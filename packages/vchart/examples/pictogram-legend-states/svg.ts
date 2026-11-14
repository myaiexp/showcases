// A parking lot as SVG: twelve named bays in two rows
export const BAYS = Array.from({ length: 12 }, (_, i) => `Bay ${i + 1}`);

export const LOT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220">
  <rect x="5" y="5" width="470" height="210" rx="10" fill="none" stroke="#8a8f9c" stroke-width="2"/>
  <line x1="20" y1="110" x2="460" y2="110" stroke="#4a4f5c" stroke-width="3" stroke-dasharray="14 10"/>
  ${BAYS.map((name, i) => {
    const col = i % 6;
    const top = i < 6;
    return `<rect name="${name}" x="${24 + col * 72}" y="${top ? 22 : 128}" width="60" height="80" rx="4" fill="#2a2f3c" stroke="#8a8f9c" stroke-width="1.5"/>`;
  }).join('\n  ')}
</svg>`;
