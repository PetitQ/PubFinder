import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import BarItem from "./BarItem";
import {connect} from "react-redux";

class Favorites extends React.Component{

    displayDetailForBar = (idBar) => {
        this.props.navigation.navigate('BarDetail', {idBar:idBar})
    }


    render(){

        return(
            <View style={styles.container}>
                <FlatList
                    key="flatList"
                    data={this.props.favoritesBar}
                    keyExtractor = {(item, index) => (`${item}--${index}`)}
                    renderItem={({item}) => <BarItem
                        bar={item}
                        index={this.props.favoritesBar.indexOf(item)+1}
                        displayDetailForBar={this.displayDetailForBar}
                        isBarFavorite={true}
                        //AfficheDistance ={this.AfficheDistance}
                    />}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const mapStateToProps = state => {
    return {
        favoritesBar: state.favoritesBar
    }
}
export default connect(mapStateToProps)(Favorites)