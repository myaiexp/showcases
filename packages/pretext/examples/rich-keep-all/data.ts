// Sample Korean message: body, bold and @mention runs, in a font list that names an installed CJK font
import type { Run } from './paint.ts';

const FAMILY = '"Inter Variable", "Noto Sans CJK KR", "Noto Sans KR", sans-serif';
export const BODY = `400 14px ${FAMILY}`;
const BOLD = `700 14px ${FAMILY}`;
const MENTION = `600 12px ${FAMILY}`;
export const FONTS = [BODY, BOLD, MENTION];
export const LINE_HEIGHT = 22;
export const SAMPLE = '안녕하세요 @민수 오늘 배포한 새로운 기능을 확인해 주세요 레이아웃 계산이 훨씬 빨라졌습니다';

const body = (text: string): Run => ({ text, font: BODY });
const mention = (text: string): Run => ({ text, font: MENTION, cls: 'mention', never: true, pad: { x: 5, border: 0 } });

export const PIECES: Run[] = [
  body('안녕하세요 '),
  mention('@민수'),
  body('님, 오늘 배포한 '),
  { text: '새로운 기능을', font: BOLD },
  body(' 확인해 주세요. 레이아웃계산이훨씬빨라졌습니다. '),
  mention('@지은'),
  body('님도 함께 봐 주세요.'),
];
