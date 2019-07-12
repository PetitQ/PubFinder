import React from 'react';
import { StyleSheet, Text,View, TouchableOpacity, Image} from 'react-native';

class ReviewItem extends React.Component{

    render(){
        const review= this.props.review;
        return(
            <View style={styles.user_container}>
                <View style={styles.top_left_container}>
                    <Image
                        source={{uri : review.user.image_url}}
                        style={{ width: 50, height: 50 }}
                    />
                    <Text>{review.user.name}</Text>
                    <View style={styles.top_right_rating}>
                        <Text> Note : {review.rating} / 5 </Text>
                    </View>
                </View>
                <View style={styles.maincontainer}>

                    <View style={styles.left_container}>
                        <Text>{review.text}</Text>
                    </View>
                    <View style={styles.right_container}>
                    </View>
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
    },
    top_left_container:{
        flexDirection:'row',
        flex: 2,
        alignItems:'center',
        borderBottomColor:'#727272',
        borderBottomWidth:0.5,
        backgroundColor: '#f5f5f5'
    }
})
export default ReviewItem