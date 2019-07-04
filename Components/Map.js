import React from 'react';
import {StyleSheet, Text, View, WebView, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import {PROVIDER_DEFAULT} from 'react-native-maps';
import {getBarByVille} from "../API/YelpAPI";

const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = 0.04;

const initialRegion = {
    latitude: 44.8333,
    longitude: -0.5667,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
}

class theMap extends React.Component {
    map = null;

    state = {
        region: {
            latitude: 44.8333,
            longitude: -0.5667,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        },
        ready: true,
        filteredMarkers: [],
        bars: [],
        markers: []
    };

    setRegion(region) {
        if (this.state.ready) {
            setTimeout(() => this.map.animateToRegion(region), 10);
        }
        //this.setState({ region });
    }

    componentDidMount() {
        console.log('Component did mount');
        this.getCurrentPosition();
        this.getPubs(this.state.region.latitude, this.state.region.longitude);
    }

    getPubs(lat, long) {
        getBarByVille(lat, long).then(responseJson => {
            if (this.state.bars.length > 100) {
                this.setState({
                    bars: []
                })
            }
            var lesbars = [...this.state.bars, ...responseJson.businesses];
            var i =0;
            var elements = lesbars.map(function (e) {
                i++;
                return {
                    id: i,
                    barId: e.id,
                    latitude: e.coordinates.latitude,
                    longitude: e.coordinates.longitude,
                    name: e.name,
                }
            });
            this.setState({
                bars: [...this.state.bars, ...responseJson.businesses],
                isLoading: false,
                markers: elements
            })
            console.log(this.state.markers);
        })
    }

    getCurrentPosition() {
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    };
                    this.setRegion(region);
                },
                (error) => {
                    switch (error.code) {
                        case 1:
                            if (Platform.OS === "ios") {
                                Alert.alert("", "Veuillez activer la géolocalisation");
                            } else {
                                Alert.alert("", "Veuillez activer la géolocalisation");
                            }
                            break;
                        default:
                            Alert.alert("", "Impossible de détecter votre localisation");
                    }
                }
            );
        } catch (e) {
            alert(e.message || "");
        }
    };

    onMapReady = (e) => {
        if (!this.state.ready) {
            this.setState({ready: true});
        }
    };

    onRegionChange = (region) => {
    };

    onRegionChangeComplete = (region) => {
        this.getPubs(region.latitude, region.longitude);
    };

    markerClick = (idBar) => {
        this.props.navigation.navigate('BarDetail', {idBar: idBar})
    }

    render() {

        const {region} = this.state;

        return (
            <MapView
                provider={PROVIDER_DEFAULT}
                showsUserLocation
                ref={map => {
                    this.map = map
                }}
                initialRegion={initialRegion}
                onMapReady={this.onMapReady}
                showsMyLocationButton={false}
                onRegionChange={this.onRegionChange}
                onRegionChangeComplete={this.onRegionChangeComplete}
                style={styles.map}
                textStyle={{color: '#bc8b00'}}
                containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}>

                {this.state.markers.map(marker => {
                    var j = 0;
                    if (marker.latitude != null && marker.longitude != null) {
                        j++;
                        return (
                            <MapView.Marker
                                key={marker.id}
                                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                                title={marker.name}
                                description={"Voir les détails du bar"}
                                onCalloutPress={() => this.markerClick(marker.barId)}
                            />
                        );
                    }
                })}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10
    },
    map: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    wait: {
        position: 'absolute',
        top: 30,
        bottom: 0,
        right: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row"
    },
    picker: {
        width: 200,
        backgroundColor: '#FFF0E0',
        borderColor: 'black',
        borderWidth: 1,
    },
    icon: {
        height: 40,
        width: 40
    }
});

export default theMap
