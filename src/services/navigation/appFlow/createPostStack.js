import { CreatePost,PreviewPost } from "../../../screens/appFlow";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../../constants";


const CreatePostNavigator = createStackNavigator();

const CreatePostStack = ()=>{
    return(
        <CreatePostNavigator.Navigator initialRouteName={routes.createpost}>
            <CreatePostNavigator.Screen name={routes.createpost} component={CreatePost}/>
            <CreatePostNavigator.Screen name={routes.previewpost} component={PreviewPost}/>
        </CreatePostNavigator.Navigator>
    );
}

export default CreatePostStack;