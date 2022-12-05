import { MemoExoticComponent } from 'react';
import ConformationModal from './conformationModal/conformationModal'
import CreatingModal from './creatingModal/createTask'
import CreateColumnModal from './creatColumnModal/createColumn'
import CreateBoardModal from './createBoardModal/createBoard';
import UpdateTask from './updateTaskModal/updateTask'
import UpdateColumnModal from './updateColumnModal/updateColumn'
import UpdateBoardModal from './updateBoardModal/updateBoard';

const modals: any = {
  conformationModal: ConformationModal,
  creatingModal: CreatingModal,
  creatColumnModal: CreateColumnModal,
  createBoard: CreateBoardModal,
  updateTask: UpdateTask,
  updateColumn: UpdateColumnModal,
  updateBoard: UpdateBoardModal,
};

const modal = (modalName: string) :  MemoExoticComponent<() => JSX.Element> => modals[modalName]

export default modal