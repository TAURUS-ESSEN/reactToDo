// import AddTaskModal from "./AddTaskModal";
import AddCategoryModal from "./AddCategoryModal";
// import EditTaskModal from "./EditTaskModal";
import ShowCategoriesModal from "./ShowCategoriesModal"
import TaskModal from './TaskModal'
import ShowTagsModal from "../Tags/ShowTagsModal"
import { useAppContext } from "../../context/AppContext";

export default function ModalHost() {
    const {modal} = useAppContext()
    
    switch (modal.type) {
            // case 'addTask':
            //     return <AddTaskModal/>
            case 'taskModal':
                return <TaskModal/>    
            // case 'editTask':
            //     return <EditTaskModal/>
            case 'addCategory':
                return <AddCategoryModal/>
            case 'showCategories':
                return <ShowCategoriesModal/>
            case 'showTags':
                return <ShowTagsModal/>
            default:
                return null;
        }
    
}