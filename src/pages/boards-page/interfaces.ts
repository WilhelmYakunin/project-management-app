import { IBoardData } from '../../features/boards-item/interfaces';

export interface IBoardsListState {
  isLoaded: boolean;
  data: IBoardData[];
  error: null | string;
}
