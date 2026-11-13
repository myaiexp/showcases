// The defaults the config-defaults example toggles, with narrowing options
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export interface DefaultSlot {
  label: string;
  kind: 'column' | 'plugin';
  defaults: { [key: string]: Json };
  options: { plugin?: string; type?: 'integer' | 'float' | 'string' | 'boolean' | 'date' | 'datetime' };
}

export const DEFAULTS: DefaultSlot[] = [
  {
    label: 'float columns in EUR (Datagrid)',
    kind: 'column',
    defaults: { number_format: { style: 'currency', currency: 'EUR' } },
    options: { plugin: 'Datagrid', type: 'float' },
  },
  {
    label: 'date columns long',
    kind: 'column',
    defaults: { date_format: { dateStyle: 'long' } },
    options: { type: 'date' },
  },
  {
    label: 'zebra rows (Datagrid)',
    kind: 'plugin',
    defaults: { zebra_rows: 2, zebra_color: '#1f2a36' },
    options: { plugin: 'Datagrid' },
  },
];
