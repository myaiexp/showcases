// Sample texts and locales for the set-locale example
export const LOCALES = ['en', 'zh', 'ja', 'ko'] as const;

export interface Sample {
  label: string;
  text: string;
  /** A starting width where this browser breaks the text differently, if it does anywhere. */
  width: number;
}

// The CHANGELOG names curly quotes (`他说“OK”然后`) and small kana as locale-sensitive break rules.
export const SAMPLES: Sample[] = [
  {
    label: 'Chinese, curly quotes',
    width: 62,
    text: '他说“OK”然后离开了，我说“好的”，她说“没问题”，大家都说“再见”，然后“一起”回家。他说“OK”然后离开了。',
  },
  {
    label: 'Japanese, small kana and ー',
    width: 160,
    text: 'ちょっと待ってください。ゃゅょっぁぃぅぇぉ、ラーメンとコーヒーをください。約3ヶ月のきゅうりょう、ちゃんとしゅっぱつ。',
  },
  {
    label: 'Korean with quotes',
    width: 74,
    text: '그는 “OK”라고 말하고 떠났다. “안녕하세요”라고 인사한 뒤 “괜찮아요”라고 대답했다. 서울(한국)에서 만났다.',
  },
];
