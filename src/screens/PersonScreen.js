import React, {useState} from 'react';

import {Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {styles, theme} from "../theme";
import {ChevronLeftIcon, HeartIcon} from "react-native-heroicons/solid";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";

const {width, height} = Dimensions.get('window')
const ios = Platform.OS === 'ios'
const verticalMargin = ios ? '' : 'my-3'

const PersonScreen = () => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [personMovies, setPersonMovies] = useState([1,2,3,4,5]);
	const navigation = useNavigation()
	const [loading, setLoading] = useState(false);

	return (
		<ScrollView className={'flex-1 bg-neutral-900'}>
			{/*	Back button*/}
			<View className='w-full'>
				<SafeAreaView className={` z-20 w-full flex-row justify-between items-center px-4 ${verticalMargin}`}>
					<TouchableOpacity
						style={styles.background}
						className='rounded-xl p-1'
						onPress={() => navigation.goBack() }
					>
						<ChevronLeftIcon size='28' color='white' strokeWidth={2.5}/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
						<HeartIcon size='35' color={ isFavorite ? 'red' : 'white'} />
					</TouchableOpacity>
				</SafeAreaView>

			</View>
			{/*	Person details*/}
			{
				loading ? (
					<Loading />
				): (
					<View>
						<View className='flex-row justify-center'
						      style={{
							      shadowColor: 'red',
							      shadowRadius: 40,
							      shadowOffset: {width: 20, height: 15},
							      shadowOpacity: 0.5
						      }}
						>
							<View className={'items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-300'}>
								<Image source={require('../../assets/images/castImage2.png')}
								       style={{height: height*0.43, width: width*0.74}}
								/>
							</View>

						</View>
						<View className={'mt-6'}>
							<Text className={'text-neutral-50 text-center text-3xl text-center'}>
								Keanu Reeves
							</Text>
							<Text className={'text-neutral-500 text-center text-base text-center'}>
								London, United Kingdom
							</Text>
						</View>
						<View className={'mx-3 p-4 rounded-full mt-6 flex-row justify-between items-center bg-neutral-700'}>
							<View className={'border-r-2 border-r-neutral-400 px-2 flex items-center'}>
								<Text className={'text-white font-semibold text-base'}>Gender</Text>
								<Text className={'text-neutral-300 text-sm'}>Male</Text>
							</View>
							<View className={'border-r-2 border-r-neutral-400 px-2 flex items-center'}>
								<Text className={'text-white font-semibold text-base'}>Birthday</Text>
								<Text className={'text-neutral-300 text-sm'}>1964.09.02</Text>
							</View>
							<View className={'border-r-2 border-r-neutral-400 px-2 flex items-center'}>
								<Text className={'text-white font-semibold text-base'}>Know for</Text>
								<Text className={'text-neutral-300 text-sm'}>Acting</Text>
							</View>
							<View className={' px-2 flex items-center'}>
								<Text className={'text-white font-semibold text-base'}>Popularity</Text>
								<Text className={'text-neutral-300 text-sm'}>64.23</Text>
							</View>
						</View>
						<View className={'my-6 mx-4 space-y-2'}>
							<Text className={'text-white text-lg'}>Biography</Text>
							<Text className={'text-neutral-400 tracking-wide'}>
								An American actor, director, screenwriter, and producer.
								Keanu was born in Hawaii and raised in Maui.
								He was born in Hawaii and raised in Maui. He was born in Hawaii and raised in Maui.
							</Text>
						</View>
						{/*	Movies*/}
						<MovieList data={personMovies} title={'Movies'} hideSeeAll={true} />
					</View>
				)
			}
		</ScrollView>
	);
};

export default PersonScreen;
