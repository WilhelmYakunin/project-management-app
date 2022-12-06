export interface IBoardData {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IBoardItemProps {
  data: IBoardData;
}
