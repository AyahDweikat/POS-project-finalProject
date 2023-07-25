export interface Column {
  id: string;
  label: string;
  type: "image" | "text";
}

export interface TableProps<T extends object> {
  data: T[];
  columns: Column[];
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}
