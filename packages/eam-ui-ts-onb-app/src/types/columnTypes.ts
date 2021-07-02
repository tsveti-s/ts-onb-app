export interface ColumnType {
  columnName: string;
  columnLabel: string;
  columnType: string;
  visible: boolean;
  groupIndex?: string;
  format?: string;
  cssClass?: string;
  alignment?: string;
}
