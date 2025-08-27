import AddTaskModal from "./AddTaskModal";
import AddCategoryModal from "./AddCategoryModal";
import EditTaskModal from "./EditTaskModal";

export default function ModalHost({modal, closeModal, tasks, setTasks, categories, setCategories}) {
    
    switch (modal.type) {
            case 'addTask':
                return <AddTaskModal modal={modal} closeModal={closeModal} tasks={tasks} categories={categories}  setTasks={setTasks} />
            case 'editTask':
                return <EditTaskModal modal={modal} closeModal={closeModal} tasks={tasks} categories={categories}  setTasks={setTasks}/>
            case 'addCategory':
                return <AddCategoryModal modal={modal} closeModal={closeModal} categories={categories} setCategories={setCategories}/>
            default:
                return null;
        }
    
}