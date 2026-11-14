// echarts example: Instance lifecycle: init, getInstanceByDom, dispose
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Instance lifecycle: init, getInstanceByDom, dispose',
  summary:
    'Walk one container through the life of an instance with buttons: init, setOption, clear, dispose and init again. The status line asks echarts.getInstanceByDom and isDisposed what they report after each step.',
  section: 'Get Started',
  tags: ['echarts.init', 'getInstanceByDom', 'dispose', 'isDisposed', 'clear', 'setOption'],
  docs: ['repo/en/api/echarts.md', 'repo/en/api/echarts-instance.md', 'repo/contents/en/get-started.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
