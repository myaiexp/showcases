// Ishikawa fishbone diagrams: an indented outline of causes becomes a fish skeleton
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// The first line is the problem (the head); each indented group is a cause category on the spine.
const PHOTO = `ishikawa-beta
    Blurry Photo
    Process
        Out of focus
        Shutter speed too slow
        Protective film not removed
        Beautification filter applied
    User
        Shaky hands
    Equipment
        LENS
            Inappropriate lens
            Damaged lens
            Dirty lens
        SENSOR
            Damaged sensor
            Dirty sensor
    Environment
        Subject moved too quickly
        Too dark`;

// Same shape, a different problem: deeper indentation makes sub-causes.
const OUTAGE = `ishikawa-beta
    Checkout Outage
    People
        On-call unreachable
        Runbook outdated
    Process
        Unreviewed deploy
        No canary stage
    Technology
        DATABASE
            Connection pool exhausted
            Slow migration lock
        CACHE
            Cold start after restart
    Environment
        Traffic spike`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Blurry photo', code: PHOTO },
      { label: 'Checkout outage', code: OUTAGE },
    ],
    interval: 5000,
  });

export default mount;
