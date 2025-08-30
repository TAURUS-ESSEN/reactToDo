import AddTaskModal from "./AddTaskModal";
import AddCategoryModal from "./AddCategoryModal";
import EditTaskModal from "./EditTaskModal";
import ShowCategoriesModal from "./ShowCategoriesModal"

export default function ModalHost({modal, closeModal, tasks, setTasks, categories, setCategories, openModal}) {
    
    switch (modal.type) {
            case 'addTask':
                return <AddTaskModal modal={modal} closeModal={closeModal} tasks={tasks} categories={categories}  setTasks={setTasks} />
            case 'editTask':
                return <EditTaskModal modal={modal} closeModal={closeModal} tasks={tasks} categories={categories}  setTasks={setTasks}/>
            case 'addCategory':
                return <AddCategoryModal modal={modal} closeModal={closeModal} categories={categories} setCategories={setCategories}/>
            case 'showCategories':
                return <ShowCategoriesModal modal={modal} closeModal={closeModal} tasks={tasks} setTasks={setTasks} categories={categories} setCategories={setCategories} openModal={openModal}/>
            default:
                return null;
        }
    
}