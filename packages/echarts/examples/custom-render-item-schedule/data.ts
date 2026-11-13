// Machine schedule rows: [machineIndex, startHour, endHour, jobName]
export const MACHINES = ['Press', 'Lathe', 'Mill', 'Drill', 'Paint', 'Pack'];

export type Job = [number, number, number, string];

export function schedule(): Job[] {
  const jobs: Job[] = [];
  let n = 1;
  MACHINES.forEach((_, m) => {
    let t = Math.random() * 2;
    while (t < 22) {
      const length = 1 + Math.random() * 3;
      jobs.push([m, round(t), round(Math.min(24, t + length)), `J${n++}`]);
      t += length + 0.3 + Math.random() * 1.5;
    }
  });
  return jobs;
}

const round = (h: number): number => Math.round(h * 10) / 10;
