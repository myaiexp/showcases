// Monthly rainfall for two seasons, used by the rose and radial bar examples
export interface Month {
  month: string;
  rain: number;
  season: 'dry' | 'wet';
}

const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const rain = [78, 62, 55, 48, 52, 60, 34, 29, 45, 70, 88, 94];

export const months: readonly Month[] = names.map((month, i) => ({ month, rain: rain[i]!, season: [4, 5, 6, 7, 8].includes(i) ? 'dry' : 'wet' }));
