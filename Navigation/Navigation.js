import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import SearchByVille from '../Components/SearchByVille'
import BarDetail from '../Components/BarDetail'
import Map from '../Components/Map'

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

const PubTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNavtigator
    },
    Map: {
        screen: Map
    }
})


export default createAppContainer(PubTabNavigator)