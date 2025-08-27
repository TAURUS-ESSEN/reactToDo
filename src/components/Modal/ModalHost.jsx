import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";

export default function ModalHost({modal, closeModal, tasks}) {
    
    switch (modal.type) {
            case 'addTask':
                return <AddTaskModal modal={modal} closeModal={closeModal} tasks={tasks} />
            case 'editTask':
                return <EditTaskModal modal={modal} closeModal={closeModal} tasks={tasks} />
            default:
                return null;
        }
    
}