import AddTaskModal from "./AddTaskModal";
import AddCategoryModal from "./AddCategoryModal";
import EditTaskModal from "./EditTaskModal";
import ShowCategoriesModal from "./ShowCategoriesModal"
import ShowTagsModal from "./ShowTagsModal"

export default function ModalHost({modal, closeModal, tasks, setTasks, categories, setCategories, setToasts, openModal, tags, setTags}) {
    
    switch (modal.type) {
            case 'addTask':
                return <AddTaskModal modal={modal} closeModal={closeModal} tasks={tasks} categories={categories}  setTasks={setTasks} setToasts={setToasts}/>
            case 'editTask':
                return <EditTaskModal modal={modal} closeModal={closeModal} tasks={tasks} categories={categories}  setTasks={setTasks} setToasts={setToasts}/>
            case 'addCategory':
                return <AddCategoryModal modal={modal} closeModal={closeModal} categories={categories} setCategories={setCategories} setToasts={setToasts}/>
            case 'showCategories':
                return <ShowCategoriesModal modal={modal} closeModal={closeModal} tasks={tasks} setTasks={setTasks} categories={categories} setCategories={setCategories} openModal={openModal} setToasts={setToasts}/>
            case 'showTags':
                return <ShowTagsModal modal={modal} closeModal={closeModal} tasks={tasks} setTasks={setTasks} categories={categories} setCategories={setCategories} openModal={openModal} setToasts={setToasts} tags={tags} setTags={setTags}/>
            default:
                return null;
        }
    
}