import AddCategoryModal from "./AddCategoryModal";
import ShowCategoriesModal from "./ShowCategoriesModal"
import TaskModal from './TaskModal'
import ShowTagsModal from "../Tags/ShowTagsModal"
import { useAppContext } from "../../context/AppContext";

export default function ModalHost() {
    const {modal} = useAppContext()
    
    switch (modal.type) {
            case 'taskModal':
                return <TaskModal/>    
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