import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";

export default function ModalHost({modal, closeModal, tasks, setTasks}) {
    
    switch (modal.type) {
            case 'addTask':
                return <AddTaskModal modal={modal} closeModal={closeModal} tasks={tasks} setTasks={setTasks} />
            case 'editTask':
                return <EditTaskModal modal={modal} closeModal={closeModal} tasks={tasks}  setTasks={setTasks}/>
            default:
                return null;
        }
    
}