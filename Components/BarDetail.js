import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, FlatList,TouchableOpacity} from 'react-native';
import BarItem from "./BarItem";
import {getBarDetail, getBarReview} from '../API/YelpAPI';
import FlexImage from 'react-native-flex-image';
import { Rating } from 'react-native-ratings';
import Carousel from 'react-native-snap-carousel'
import ReviewItem from './ReviewItem.js';
import { connect } from 'react-redux'

class BarDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bar:undefined,
            review:undefined,
            isLoading: true,
        }
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

    renderItem ({item, index}) {
        return (
            <View>
                <Image style={styles.banniere} source={{uri: item}} />
            </View>
        );
    }

    toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.bar }
        this.props.dispatch(action)
    }

    displayBanniere(){
        /*if(this.state.bar.image_url != ""){
            return(
                <FlexImage style={styles.banniere} source={{uri: this.state.bar.image_url}} />
            )
        }*/
        if(this.state.bar.image_url != ""){
            var photos = [ ...this.state.bar.photos, ...[this.state.bar.image_url]]
            return(
                <Carousel
                    data={photos}
                    renderItem={this.renderItem}
                    sliderWidth={400}
                    itemWidth={400}
                />
            )
        }
    }

    displayFavoriteImage() {
        var sourceImage = require('../Helpers/Image/ic_favorite_border.png')
        if (this.props.favoritesBar.findIndex(item => item.id === this.state.bar.id) !== -1) {
            sourceImage = require('../Helpers/Image/ic_favorite.png')
        }
        return (
            <Image
                style={styles.favorite_image}
                source={sourceImage}
            />
        )
    }

    displayIsOuvert(){
        if(this.state.bar.is_closed == false){
            return(
                <Text style={styles.ouvert}>Ouvert</Text>
            )
        }else{
            return(
                <Text style={styles.ferme}>Fermé</Text>
            )
        }
    }

    displayReview(){
        if(this.state.review != undefined){
            if(this.state.review.reviews != []){
                console.log('------------------------')
                console.log(this.state.review.reviews[0])
                console.log('------------------------')
                return(
                    <FlatList
                        key="flatList"
                        data={this.state.review.reviews}
                        keyExtractor = {(item, index) => (`${item}--${index}`)}
                        renderItem={({item}) => <ReviewItem
                            review={item}
                        />}/>
                )
            }else{
                return(<Text>Aucun commentaire trouvé</Text>)
            }
        }
    }

    displayBar() {
        if (this.state.bar != undefined) {

            return (
                <ScrollView style={styles.scrollview_container}>
                    {this.displayBanniere()}
                    <View style={styles.content}>
                        <Text style={styles.title}>{this.state.bar.name}</Text>
                        <Rating
                            imageSize={30}
                            ratingCount={5}
                            startingValue={this.state.bar.rating}
                            readonly={true}
                        />
                        <Text style={styles.rateCount}>{this.state.bar.review_count} avis</Text>
                        <Text>{this.state.bar.categories.map(function(categ){return categ.title;}).join(", ")}</Text>
                        <TouchableOpacity
                            style={styles.favorite_container}
                            onPress={() => this.toggleFavorite()}>
                            {this.displayFavoriteImage()}
                        </TouchableOpacity>
                        {this.displayReview()}
                        {this.displayIsOuvert()}
                    </View>
                </ScrollView>
            )
        }
    }

    componentDidMount(){

        getBarDetail(this.props.navigation.state.params.idBar).then(responseJson => {
            this.setState({
                bar: responseJson,
                isLoading: false
            })
        })

        getBarReview(this.props.navigation.state.params.idBar).then(responseJson => {
            this.setState({
                review: responseJson,
                isLoading: false
            })
        })

    }


    render() {
        return(
            <View style={styles.maincontainer}>
                {this.displayBar()}
                {this.displayLoading()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    maincontainer: {
        flex:1
    },
    favorite_container: {
        alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
    },
    banniere:{
        flex:3,
        height:200
    },
    favorite_image: {
        width: 40,
        height: 40
    },
    content:{
        flex:5,

    },
    title:{
        margin:10,
        fontSize:20,
        fontWeight:'bold',
        textAlign:"center"
    },
    rateCount:{
        textAlign:"center"
    },
    ouvert:{
        color:"green"
    },
    ferme:{
        color:"red"
    },

})


const mapStateToProps = (state) => {
    return {
        favoritesBar: state.favoritesBar
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BarDetail)
