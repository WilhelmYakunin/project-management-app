// import { IBoardData } from '../../features/boards-item/interfaces';

// export interface ISpecifiedBoardProps {
//   boardData: IBoardData;
// }

import { IColumnData } from '../../features/columns-item/interfaces';

export interface IColumnsListState {
  isLoaded: boolean;
  data: IColumnData[];
  error: null | string;
}
