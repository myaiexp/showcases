// Builds the lane rows (label + track + moving dot) and the playhead for the time-position demo
export interface Lane {
  position: number | string;
  note: string;
  dot: HTMLElement;
}

const div = (cls: string, text?: string): HTMLElement => {
  const node = document.createElement('div');
  node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
};

export const POSITIONS: ReadonlyArray<{ position: number | string; note: string }> = [
  { position: 100, note: 'absolute: exactly 100ms' },
  { position: '+=100', note: 'addition: 100ms after the last element' },
  { position: '-=300', note: 'subtraction: 300ms before the last element end' },
  { position: '<', note: 'previous end position' },
  { position: '<<', note: 'previous start position' },
  { position: '<<+=250', note: 'combined: 250ms after the previous start' },
];

export const buildLanes = (host: HTMLElement): { lanes: Lane[]; playhead: HTMLElement } => {
  const lanes: Lane[] = [];
  const board = div('board');
  const tracks = div('tracks');
  for (const { position, note } of POSITIONS) {
    const row = div('lane');
    row.title = note;
    const label = div('lane-label', typeof position === 'number' ? String(position) : `'${position}'`);
    const track = div('track');
    const dot = div('dot');
    track.append(dot);
    row.append(label, track);
    tracks.append(row);
    lanes.push({ position, note, dot });
  }
  const playhead = div('playhead');
  tracks.append(playhead);
  board.append(tracks);
  host.append(board);
  return { lanes, playhead };
};
