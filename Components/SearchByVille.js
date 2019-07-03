import React from 'react';
import {ActivityIndicator, FlatList, Picker, StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {getBarByVille} from '../API/YelpAPI';
import BarItem from './BarItem.js';
import { connect } from 'react-redux'

class SearchByVille extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bars:[],
            isLoading: false,
            selectedvalue:{ ville: "Bordeaux", coords: "44.836151/-0.580816" }
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
        //console.log(this.state.bars)
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

   /* degrees_to_radians(degrees)
    {
        var pi = Math.PI;
        return degrees * (pi/180);
    }



    CalculDistance(latitude1, longitude1, latitude2, longitude2){
        var earth_radius = 6378137;
        var rlo1 = this.degrees_to_radians(longitude1);
        var rla1 = this.degrees_to_radians(latitude1);
        var rlo2 = this.degrees_to_radians(longitude2);
        var rla2 = this.degrees_to_radians(latitude2);
        var dlo = (rlo2 - rlo1) / 2;
        var dla = (rla2 - rla1) / 2;
        var a = (Math.sin(dla) * Math.sin(dla)) + Math.cos(rla1) * Math.cos(rla2) * (Math.sin(dlo) * Math.sin(dlo));
        var d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var meter = (earth_radius * d);

        return (meter/1000);

    }

    AfficheDistance(longitude2, latitude2){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var meter = this.CalculDistance(position.coords.latitude,position.coords.longitude,longitude2,latitude2)
                return(meter)
            },
            (error) => console.log('error:' + error.message ),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        )

    }*/

    reloadBars(latitude, longitude){
        this.setState({
            bars: [],
            isLoading: true
        })
        getBarByVille(latitude, longitude).then(responseJson => {
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
                            this.reloadBars(coords[0],coords[1]);
                        }}>
                        {serviceItems}
                    </Picker>
                    <TouchableOpacity onPress={()=>
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                this.reloadBars(position.coords.latitude,position.coords.longitude)
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
                        isBarFavorite={(this.props.favoritesBar.findIndex(bar => bar.id === item.id) !== -1) ? true : false}
                        //AfficheDistance ={this.AfficheDistance}
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
        flexDirection:"row"
    },
    picker: {
        width: 200,
        backgroundColor: '#FFF0E0',
        borderColor: 'black',
        borderWidth: 1,
    },
    icon:{
        height:40,
        width:40
    }
});

const mapStateToProps = state => {
    return {
        favoritesBar: state.favoritesBar
    }
}
export default connect(mapStateToProps)(SearchByVille)
