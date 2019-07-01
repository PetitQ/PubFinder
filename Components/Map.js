import React from 'react';
import { StyleSheet, Text,View, TouchableOpacity} from 'react-native';

class Map extends React.Component{ 

    render(){

        return(
            <View style={styles.container}>
                <Text> YOYOYO </Text>
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

export default Map
