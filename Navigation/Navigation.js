import {createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
import SearchByVille from '../Components/SearchByVille'
import BarDetail from '../Components/BarDetail'
import Favorites from '../Components/Favorites'
import Map from '../Components/Map'
import React from 'react'
import {StyleSheet, Image} from 'react-native';

const SearchStackNavtigator = createStackNavigator({
    SearchByVille: {
        screen: SearchByVille,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    BarDetail: {
        screen: BarDetail,
        navigationOptions: {
            title: "Détail"
        }
    }
})

const FavoriteStackNavtigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: "Favoris"
        }
    },
    BarDetail: {
        screen: BarDetail,
        navigationOptions: {
            title: "Détail"
        }
    }
})

const MapStackNavtigator = createStackNavigator({
    Map: {
        screen: Map,
        navigationOptions: {
            title: "Carte des bars"
        }
    },
    BarDetail: {
        screen: BarDetail,
        navigationOptions: {
            title: "Détail"
        }
    }
})

const PubTabNavigator = createBottomTabNavigator(
    {
        Search: {
            screen: SearchStackNavtigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Helpers/Image/loupe.png')}
                        style={styles.icon}/>
                }
            }
        },
        Map: {
            screen: MapStackNavtigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Helpers/Image/map-location.png')}
                        style={styles.icon}/>
                }
            }
        },
        Favorites: {
            screen: FavoriteStackNavtigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Helpers/Image/hearth.png')}
                        style={styles.icon}/>
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})


export default createAppContainer(PubTabNavigator)
