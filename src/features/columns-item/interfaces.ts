export interface IColumnData {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface IColumnItemProps {
  data: IColumnData;
}
