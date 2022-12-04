import { MemoExoticComponent } from 'react';
import ConformationModal from './conformationModal/conformationModal'
import CreatingModal from './creatingModal/createTask'
import UpdateTask from './updateTaskModal/updateTask';

const modals: any = {
  conformationModal: ConformationModal,
  creatingModal: CreatingModal,
  updateTask: UpdateTask,
};

const modal = (modalName: string) :  MemoExoticComponent<() => JSX.Element> => modals[modalName]

export default modal