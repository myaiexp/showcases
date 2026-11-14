// Users, events and links for the sequenceAnalysis examples, plus a typed spec builder
import VChart from '@visactor/vchart';
import { registerSequenceAnalysis } from '@visactor/vchart-extension';
import type { ISpec } from './chart.ts';

// Since VChart 2.2 sequenceAnalysis comes from the extension; it registers its own dot and link series.
registerSequenceAnalysis({ VChart });

const DAY = 24 * 3600 * 1000;
export const T0 = Date.UTC(2026, 0, 1);

export const USERS = ['Alice', 'Bob', 'Carol'];
export const STEPS = ['step_1', 'step_2', 'step_3'];
const MEDIA = ['IP', 'Device', 'Account'];
const ACTIONS = ['visit', 'login', 'purchase'];

/** A round avatar drawn as an SVG data URL: the chart's image labels need a URL or data URL. */
export function avatar(name: string, hue: number): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><circle cx="24" cy="24" r="24" fill="hsl(${hue},65%,50%)"/>` +
    `<text x="24" y="31" font-size="22" font-family="sans-serif" fill="#fff" text-anchor="middle">${name.slice(0, 1)}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const USER_IMAGES: Record<string, string> = Object.fromEntries(USERS.map((u, i) => [u, avatar(u, 210 + i * 60)]));

interface Dot {
  node_name: string;
  step: string;
  medium_type: string;
  action_type: string;
  time_stamp: number;
  action_count: number;
}

/** Each user does one event per step; the medium and the action rotate so the three modes all have something to show. */
export function eventData(shift = 0): { user_id: string; user_image: string; dots: Dot[] }[] {
  return USERS.map((user, u) => ({
    user_id: user,
    user_image: USER_IMAGES[user] as string,
    dots: STEPS.map((step, s): Dot => ({
      node_name: `${user.toLowerCase()}_${s + 1}`,
      step,
      medium_type: MEDIA[(u + s) % 3] as string,
      action_type: ACTIONS[(u + s * 2) % 3] as string,
      time_stamp: T0 + (s * 3 + u + shift) * DAY,
      action_count: 1 + ((u + s + shift) % 3),
    })),
  }));
}

/** Links in time mode: an event leads to the next user's event. */
export function actionData(withImages: boolean): { from: string; to: string; user_id?: string; user_image?: string }[] {
  return [
    ['alice_1', 'bob_1', 'Alice'],
    ['bob_1', 'carol_2', 'Bob'],
    ['alice_2', 'carol_2', 'Alice'],
    ['carol_2', 'bob_3', 'Carol'],
  ].map(([from, to, user]) => ({
    from: from as string,
    to: to as string,
    ...(withImages ? { user_id: user as string, user_image: USER_IMAGES[user as string] as string } : {}),
  }));
}

/** Links in step mode, grouped by pattern_type. */
export function patternData(extend?: 'left' | 'right'): { from: string; to: string; pattern_type: string; isExtend?: string }[] {
  return [
    { from: 'alice_1', to: 'bob_2', pattern_type: 'shared' },
    { from: 'bob_1', to: 'carol_2', pattern_type: 'shared' },
    { from: 'carol_1', to: 'alice_2', pattern_type: 'repeat' },
    { from: 'alice_2', to: 'bob_3', pattern_type: 'repeat' },
  ].map((link) => (extend ? { ...link, isExtend: extend } : link));
}

export const STEP_MEDIUM = {
  step_1: { medium_type: 'IP', count: 0 },
  step_2: { medium_type: 'Device', count: 2 },
  step_3: { medium_type: 'Account', count: 1 },
};

export const PALETTE = ['#5470c6', '#26a69a', '#f6bd16', '#e8684a'];

export interface AnalysisOptions {
  mode: 'time' | 'step';
  mediumConnection?: boolean;
  actionTarget?: boolean;
  shift?: number;
  /** Step mode, straight links: extend each link's end into its band (patternData.isExtend). */
  extend?: 'left' | 'right';
  height: number;
  /** Mutates the generated common-chart spec (the guide's customTransformSpec). */
  tweak?: (converted: Record<string, unknown>) => void;
}

/** The complete extension spec; keep it, since updateSpec needs the whole thing (the guide's "Updates" section). */
export function analysisSpec(o: AnalysisOptions): ISpec {
  return {
    type: 'sequenceAnalysis',
    mode: o.mode,
    mediumConnection: o.mediumConnection ?? false,
    actionTarget: o.actionTarget ?? false,
    height: o.height,
    animation: false,
    eventData: eventData(o.shift ?? 0),
    actionData: o.mode === 'time' ? actionData(o.actionTarget ?? false) : [],
    patternData: o.mode === 'step' ? patternData(o.extend) : [],
    userImageMap: USER_IMAGES,
    stepMediumMap: o.mode === 'step' && !o.mediumConnection ? STEP_MEDIUM : {},
    customTransformSpec(converted: Record<string, unknown>) {
      converted['color'] = PALETTE;
      (converted['scrollBar'] as { start: number; end: number }[] | undefined)?.forEach((bar) => {
        bar.start = 0;
        bar.end = 1;
      });
      o.tweak?.(converted);
    },
  } as unknown as ISpec;
}
