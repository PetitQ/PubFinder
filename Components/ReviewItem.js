import React from 'react';
import { StyleSheet, Text,View, TouchableOpacity} from 'react-native';

class ReviewItem extends React.Component{

    render(){
        const review= this.props.review;
        console.log(review)
        return(
            <View style={styles.maincontainer}>

                <View style={styles.left_container}>
                    <Text>{review}</Text>

                </View>
                <View style={styles.right_container}>
                </View>

            </View>

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
    left_container:{
        flex:5,
    },
    right_container:{
        flex:2,
    }
})
export default ReviewItem