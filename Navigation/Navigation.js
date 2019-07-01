 import { createStackNavigator, createAppContainer } from "react-navigation";
import SearchByVille from '../Components/SearchByVille'
 import BarDetail from '../Components/BarDetail'

const SearchStackNavtigator = createStackNavigator({
    SearchByVille:{
        screen:SearchByVille,
        navigationOptions:{
            title:"Rechercher"
        }
    },
    BarDetail:{
        screen: BarDetail,
        navigationOptions:{
            title:"Détail"
        }
    }
})


 export default createAppContainer(SearchStackNavtigator)