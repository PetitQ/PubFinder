import React from 'react';
import { StyleSheet, Text,View, TouchableOpacity,Image} from 'react-native';

class BarItem extends React.Component{


    displayFavoriteImage() {
        if (this.props.isBarFavorite) {
            return (
                <Image
                    style={styles.favorite_image}
                    source={require('../Helpers/Image/ic_favorite.png')}
                />
            )
        }
    }

    displayDistance(item){
        if(this.props.isPosition){
            return(
                <Text style={styles.distance}>{Math.round(item.distance)}m</Text>
            )
        }
    }


    render(){
        const index= this.props.index;
        const bar= this.props.bar;
        const displayDetailForBar = this.props.displayDetailForBar;

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
                    {this.displayFavoriteImage()}
                    {this.displayDistance(bar)}
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
    distance:{
        textAlign: 'right'
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
        marginLeft:5
    },
    right_container:{
        flex:2,
        marginRight:5,
        alignItems: 'flex-end'
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5,
    }
})
export default BarItem