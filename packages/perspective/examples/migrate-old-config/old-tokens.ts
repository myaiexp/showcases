// Viewer tokens in older shapes, per migrate.md and save_restore.md
export const OLD_TOKENS: Record<string, Record<string, unknown>> = {
  // save_restore.md § Datetime formats: before 5.7.0 a date_format used a "disabled"
  // value and a format: "custom" marker, which restore() now rejects.
  '5.6 date_format': {
    version: '5.6.0',
    plugin: 'Datagrid',
    columns: ['Order Date', 'Sales'],
    columns_config: { 'Order Date': { date_format: { format: 'custom', month: 'long', day: 'numeric', year: 'disabled' } } },
  },
  // Information with no current representation is dropped and reported as a "Dropped"
  // notice (migrate.md). In 5.9.1 a viewer token's row_pivot / column_pivot keys go this
  // way, though migrate.md names row_pivot as a 2.x alias in engine ViewConfigs.
  '2.10 unknown keys': {
    version: '2.10.0',
    plugin: 'Datagrid',
    row_pivot: ['Region'],
    column_pivot: ['Category'],
    columns: ['Sales'],
  },
  // migrate.md: `expressions` must now be a map of names to expressions.
  '2.10 expression list': {
    version: '2.10.0',
    plugin: 'Y Bar',
    group_by: ['Region'],
    columns: ['Margin'],
    expressions: ['//Margin\n"Profit" / "Sales"'],
  },
};
