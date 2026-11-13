// Gantt charts where tasks chain with after/until, carry status tags, and mark milestones
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// `after <id>` starts a task when another ends; done/active/crit tags set its look.
const RELEASE_PLAN = `gantt
    title Release plan
    dateFormat YYYY-MM-DD
    section Build
    Design API           :done,   des1, 2025-03-03, 2025-03-07
    Implement parser     :crit, done, impl, after des1, 4d
    Write tests          :crit, active, tests, after impl, 3d
    Docs                 :active, docs, after des1, 5d
    section Ship
    Release candidate    :crit, rc, after tests docs, 2d
    Rollout              :after rc, 3d`;

// Milestones sit at start + duration/2; `until` runs a task up to another one's start.
const MILESTONES = `gantt
    dateFormat HH:mm
    axisFormat %H:%M
    Kick-off            :milestone, m1, 09:00, 2m
    Prepare             :prep, after m1, 40m
    Review              :crit, rev, after prep, 30m
    Buffer              :after prep, until m2
    Go live             :milestone, m2, 10:30, 2m`;

// `vert` draws a vertical marker across the chart without taking a row.
const VERTICAL = `gantt
    dateFormat HH:mm
    axisFormat %H:%M
    Initial vert : vert, v1, 17:30, 2m
    Task A : 3m
    Task B : 8m
    Final vert : vert, v2, 17:58, 4m`;

// Several `after` ids: the start is the latest end among them.
const MULTI_AFTER = `gantt
    apple :a, 2017-07-20, 1w
    banana :crit, b, 2017-07-23, 1d
    cherry :active, c, after b a, 1d
    kiwi   :d, 2017-07-20, until b c`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Release plan', code: RELEASE_PLAN },
      { label: 'Milestones and until', code: MILESTONES },
      { label: 'Vertical markers', code: VERTICAL },
      { label: 'Several after ids', code: MULTI_AFTER },
    ],
  });

export default mount;
