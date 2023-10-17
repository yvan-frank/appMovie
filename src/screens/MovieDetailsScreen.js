import React, {useEffect, useState} from 'react';

import {Dimensions, Platform, ScrollView, Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ChevronLeftIcon, HeartIcon} from "react-native-heroicons/solid";
import {styles, theme} from "../theme";
import { LinearGradient } from 'expo-linear-gradient';
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";


let {width, height} = Dimensions.get('window')
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : 'mt-5'
const MovieDetailsScreen = () => {
	const {params: item} = useRoute();

	const [isFavorite, setIsFavorite] = useState(false);
	const [cast, setCast] = useState([1,2,3,4,5]);
	const [similarMovie, setSimilarMovie] = useState([1,2,3,4,5]);

	const [loading, setLoading] = useState(false);

	const navigation = useNavigation()

	useEffect(() => {
		// call the movie API
	}, [item]);


	return (
		<ScrollView
			contentContainerStyle={{paddingBottom: 20}}
			className='flex-1 bg-neutral-900'
		>
			{/*	Back button*/}
			<View className='w-full'>
				<SafeAreaView className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}>
					<TouchableOpacity
						style={styles.background}
						className='rounded-xl p-1'
						onPress={() => navigation.goBack() }
					>
						<ChevronLeftIcon size='28' color='white' strokeWidth={2.5}/>
					</TouchableOpacity>
					<TouchableOpacity >
						<HeartIcon size='35' color={ isFavorite ? theme.background : 'white'} />
					</TouchableOpacity>
				</SafeAreaView>
				{
					loading ? (
						<Loading />
					):(
						<View>
							<Image
								source={require('../../assets/images/moviePoster2.png')}
								style={{width, height: height*0.55}}
							/>
							<LinearGradient
								colors={['transparent','rgba(23,23,23,0.8)', 'rgb(23,23,23)']}
								style={{width, height: height*0.40}}
								start={{x: 0.5, y: 0}}
								end={{x: 0.5, y: 1}}
								className='absolute bottom-0'
							/>
						</View>
					)
				}
			</View>
			{/*movie Details */}
			<View style={{marginTop: -(height*0.09)}} className='space-y-3'>
				{/*Title*/}
				<Text className='text-white text-center text-3xl font-bold tracking-wider'>
					Furious Furious FuriousFurious Furious
				</Text>
				{/*Release date */}
				<Text className='text-neutral-400 text-center text-base font-semibold'>
					Released - 2020 - 170 min
				</Text>
				{/*Genres */}
				<View className='flex-row justify-center space-x-2 mx-2'>
					<Text className='text-neutral-400 text-center text-base font-semibold'>
						Action . Adventure  Thriller
					</Text>
				</View>
				{/*Descriptions */}
				<Text className='text-neutral-400 text-base mx-4'>
					When a mysterious woman seduces Dom into the world of terrorism and a betrayal of those closest to him, the crew face trials that will test them as never before.
				</Text>
			</View>
			{/*	cast*/}
			<Cast cast={cast} />
			{/*similar movies*/}
			<MovieList title='Similar movies' data={similarMovie} hideSeeAll={true} />
		</ScrollView>
	);
};

export default MovieDetailsScreen;
