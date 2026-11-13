// Gantt task lengths: unit suffixes ms s m h d w M y, decimals, and an invalid token
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Milliseconds with the SSS date token; ticks every 100 ms.
const MILLIS = `gantt
    title Milliseconds (ms)
    dateFormat HH:mm:ss.SSS
    axisFormat %S.%L
    tickInterval 100millisecond
    section Request
    DNS         :a1, 00:00:00.000, 120ms
    Connect     :a2, after a1, 250ms
    Wait        :a3, after a2, 400ms
    Download    :a4, after a3, 180ms`;

// Seconds and minutes, with a decimal: 1.5m is ninety seconds.
const SECONDS = `gantt
    title Seconds (s) and minutes (m)
    dateFormat HH:mm:ss
    axisFormat %H:%M:%S
    section Build
    Checkout   :b1, 10:00:00, 30s
    Compile    :b2, after b1, 2m
    Test       :b3, after b2, 1.5m
    Package    :b4, after b3, 45s`;

// Hours, days and weeks, including decimals (1.5d is 36 hours).
const HOURS_DAYS = `gantt
    title Hours (h), days (d), weeks (w)
    dateFormat YYYY-MM-DD HH:mm
    axisFormat %d %b
    section Project
    Kick-off    :c1, 2025-03-03 09:00, 4h
    Spec        :c2, after c1, 1.5d
    Build       :c3, after c2, 1w
    Polish      :c4, after c3, 3.5d
    Ship        :c5, after c4, 0.5w`;

// Months (capital M) and years (y), the largest units.
const MONTHS_YEARS = `gantt
    title Months (M) and years (y)
    dateFormat YYYY-MM-DD
    axisFormat %b %Y
    section Programme
    Research    :d1, 2025-01-01, 3M
    Pilot       :d2, after d1, 1M
    Rollout     :d3, after d2, 0.5y
    Support     :d4, after d3, 1y`;

// An invalid token such as 3dX is ignored and the task gets zero length, so it is a bare tick next to a real one.
const INVALID = `gantt
    title An invalid duration
    dateFormat YYYY-MM-DD
    axisFormat %d %b
    section Check
    Valid 3d    :e1, 2025-03-03, 3d
    Invalid 3dX :e2, 2025-03-03, 3dX
    Next        :e3, 2025-03-07, 2d`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'ms', code: MILLIS },
      { label: 's and m', code: SECONDS },
      { label: 'h, d and w', code: HOURS_DAYS },
      { label: 'M and y', code: MONTHS_YEARS },
      { label: 'Invalid token', code: INVALID },
    ],
  });

export default mount;
