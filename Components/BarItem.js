import React from 'react';
import { StyleSheet, Text,View, TouchableOpacity} from 'react-native';

class BarItem extends React.Component{

    render(){
        const index= this.props.index;
        const bar= this.props.bar;
        const displayDetailForBar = this.props.displayDetailForBar;
        //const AfficheDistance = this.props.AfficheDistance;
        //const meter = AfficheDistance(bar.coordinates.longitude,bar.coordinates.latitude)
        //console.log(meter)

        return(
            <TouchableOpacity onPress={()=>
                displayDetailForBar(bar.id)
            }
                              style={styles.maincontainer}>

                <View style={styles.left_container}>
                    <Text style={styles.title}>{index}. {bar.name}</Text>
                    <Text>Note : {bar.rating}/5 ({bar.review_count} avis)</Text>
                    <Text>{bar.categories.map(function(categ){return categ.title;}).join(", ")}</Text>
                    <Text style={styles.address}>{bar.location.address1}, {bar.location.city}</Text>
                </View>
                <View style={styles.right_container}>

                </View>

            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        flex:1,
        flexDirection:'row',
        borderTopColor:'#727272',
        borderTopWidth:0.5,
        marginTop:10,
        marginBottom:10
    },
    image:{
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 10
    },
    address:{
        color:'#727272'
    },
    left_container:{
        flex:5,
    },
    right_container:{
        flex:2,
    }
})
export default BarItem