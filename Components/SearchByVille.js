import React from 'react';
import {ActivityIndicator, FlatList, Picker, StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {getBarByVille} from '../API/YelpAPI';
import BarItem from './BarItem.js';
import { connect } from 'react-redux'
import Text from "react-native-web/src/exports/Text";

class SearchByVille extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bars:[],
            isLoading: false,
            selectedvalue:{ ville: "Bordeaux", coords: "44.836151/-0.580816" },
            isPosition:false
        }
        this.villes = [
            { ville: "Bordeaux", coords: "44.836151/-0.580816" },
            { ville: "Rennes", coords: "48.117266/-1.6777926" },
            { ville: "Marseille", coords: "43.29695/5.38107"},
            { ville: "New york ", coords: "40.730610/-73.935242"}
        ]

    }

    displayLoading(){
        if(this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }



    componentDidMount(){
        this.setState({
            isLoading: true
        })
        const coords = this.state.selectedvalue.coords.split("/");
        getBarByVille(coords[0],coords[1]).then(responseJson => {
            this.setState({
                bars: [ ...this.state.bars, ...responseJson.businesses],
                isLoading: false
            })
        })
    }



    reloadBars(latitude, longitude, IsPosition){
        if(IsPosition){
            this.setState({
                bars: [],
                isLoading: true,
                isPosition:true
            })
        }else{
            this.setState({
                bars: [],
                isLoading: true,
                isPosition: false
            })
        }

        getBarByVille(latitude, longitude).then(responseJson => {
            console.log(responseJson)
            this.setState({
                bars: responseJson.businesses,
                isLoading: false
            })
        })
    }

    displayDetailForBar = (idBar) => {
        this.props.navigation.navigate('BarDetail', {idBar:idBar})
    }


    render() {

        let serviceItems = this.villes.map( (s, i) => {
            return <Picker.Item key={i} value={s.coords} label={s.ville} />
        });

        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <Picker
                        style={[styles.picker]}
                        itemStyle={{height: 74}}
                        selectedValue={this.state.selectedvalue}
                        style={{height: 50, width: 100}}
                        onValueChange={(itemValue) =>{
                            this.setState({selectedvalue: itemValue})
                            const coords = itemValue.split("/");
                            this.reloadBars(coords[0],coords[1], false);
                        }}>
                        {serviceItems}
                    </Picker>
                    <TouchableOpacity onPress={()=>
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                this.reloadBars(position.coords.latitude,position.coords.longitude, true)
                            },
                            (error) => console.log('error:' + error.message ),
                            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                        )
                    }>
                        <Image
                            source={require('../Helpers/Image/location-pointer.png')}
                            style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    key="flatList"
                    data={this.state.bars}
                    extraData={this.props.favoritesBar}
                    keyExtractor = {(item, index) => (`${item}--${index}`)}
                    renderItem={({item}) => <BarItem
                        bar={item}
                        index={this.state.bars.indexOf(item)+1}
                        displayDetailForBar={this.displayDetailForBar}
                        isPosition = {this.state.isPosition}
                        isBarFavorite={(this.props.favoritesBar.findIndex(bar => bar.id === item.id) !== -1) ? true : false}
                    />}/>
                {this.displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        flexDirection:"row",

    },
    picker: {
        width: 200,
        backgroundColor: '#FFF0E0',
        borderColor: 'black',
        borderWidth: 1,
    },
    icon:{
        height:30,
        width:30,
        marginTop:5
    }
});

const mapStateToProps = state => {
    return {
        favoritesBar: state.favoritesBar
    }
}
export default connect(mapStateToProps)(SearchByVille)
