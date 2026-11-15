// Six groups of ratings drifting upward, binned into profiles for ridgeline examples
import { groupedObservations } from './marks1-data.ts';
import { boundaries, profiles } from './marks1-profiles.ts';

export const seasons = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];

const observations = groupedObservations(
  {
    S1: [4.2, 0.9, 120],
    S2: [5.1, 1.1, 120],
    S3: [5.9, 1.0, 120],
    S4: [6.8, 1.3, 120],
    S5: [7.4, 0.8, 120],
    S6: [6.4, 1.6, 120],
  },
  27,
);

/** Normalised rating histograms per season, bins of 0.5 over 0..10. */
export const seasonProfiles = profiles(observations, boundaries(0, 10, 0.5));
