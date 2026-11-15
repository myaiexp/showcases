// The tutorial data set: popularity of four music genres in three kinds
import type { Data } from 'vizzu';

/** docs/assets/data/music_data.js from the Vizzu docs, as the tutorial loads it. */
export const musicData: Data.TableBySeries = {
  series: [
    {
      name: 'Genres',
      type: 'dimension',
      values: ['Pop', 'Rock', 'Jazz', 'Metal', 'Pop', 'Rock', 'Jazz', 'Metal', 'Pop', 'Rock', 'Jazz', 'Metal'],
    },
    {
      name: 'Kinds',
      type: 'dimension',
      values: [
        'Hard', 'Hard', 'Hard', 'Hard',
        'Smooth', 'Experimental', 'Smooth', 'Smooth',
        'Experimental', 'Experimental', 'Experimental', 'Experimental',
      ],
    },
    { name: 'Popularity', type: 'measure', values: [114, 96, 78, 52, 56, 36, 174, 121, 127, 83, 94, 58] },
  ],
};
