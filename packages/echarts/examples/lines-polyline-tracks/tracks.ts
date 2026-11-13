// Hand-placed waypoints for five Baltic Sea ferry tracks, as [lng, lat] lists
export interface Track {
  name: string;
  color: string;
  coords: [number, number][];
}

export const TRACKS: Track[] = [
  {
    name: 'Helsinki to Stockholm',
    color: '#f2b94c',
    coords: [[24.95, 60.17], [24.0, 59.95], [22.0, 59.7], [20.5, 59.6], [19.5, 59.7], [18.9, 59.5], [18.07, 59.33]],
  },
  { name: 'Helsinki to Tallinn', color: '#5aa3d6', coords: [[24.95, 60.17], [24.85, 59.8], [24.75, 59.44]] },
  {
    name: 'Tallinn to Gdansk',
    color: '#6cc28b',
    coords: [[24.75, 59.44], [23.5, 58.6], [23.0, 57.6], [24.1, 56.95], [21.0, 56.6], [19.5, 55.5], [18.65, 54.35]],
  },
  {
    name: 'Stockholm to Copenhagen',
    color: '#c97fb6',
    coords: [[18.07, 59.33], [18.4, 58.3], [17.0, 57.0], [16.2, 56.2], [14.8, 55.4], [12.57, 55.68]],
  },
  { name: 'Gdansk to Copenhagen', color: '#d47474', coords: [[18.65, 54.35], [16.0, 55.0], [14.2, 55.1], [12.57, 55.68]] },
];
