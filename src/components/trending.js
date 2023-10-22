import React from 'react';

import {Dimensions, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Carousel from "react-native-snap-carousel";
import {useNavigation} from "@react-navigation/native";
import {image500} from "../api/movieDB";

let {width, height} = Dimensions.get('window')
const MovieCard = ({item}) => {
	const navigate = useNavigation();
	//console.log('poater path', item.poster_path)
	const handleClick = () => {

		navigate.navigate('MovieDetails', item)
		//console.log('item', item)
	}
	return (
		<TouchableWithoutFeedback onPress={handleClick}>
			<Image
				//source={require('../../assets/images/moviePoster1.png')}
				source={{uri: image500(item.poster_path)}}
				style={{ width: width*0.6, height: height*0.4 }}
				className='rounded-3xl'
			/>
		</TouchableWithoutFeedback>
	)
}
const TrendingMovies = ({data}) => {

	// const handleClick = ({item}) => {
	// 	//navigate.navigate('MovieDetails', item)
	// 	console.log(item)
	// }
	return (
		<View className='mb-8'>
			<Text className='text-white text-xl mx-4 mb-3'>Trending</Text>
			<Carousel
				data={data}
				renderItem={({item}) => <MovieCard item={item}  />}
				firstItem={1}
				inactiveSlideOpacity={0.60}
				sliderWidth={width}
				itemWidth={width*0.62}
				slideStyle={{ display: 'flex', alignItems: 'center'}}
			/>
		</View>
	);
};

export default TrendingMovies;
