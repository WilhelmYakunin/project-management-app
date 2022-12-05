import { ITaskData } from '../tasks-item/interfaces';

export interface ITasksListProps {
  boardId: string;
  columnId: string;
  dataList: ITaskData[];
}
