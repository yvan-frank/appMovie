import React, {useEffect, useState} from 'react';

import {Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {styles, theme} from "../theme";
import {ChevronLeftIcon, HeartIcon} from "react-native-heroicons/solid";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation, useRoute} from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {fetchPersonDetails, fetchPersonMovies, fetchSimilarMovies, image342} from "../api/movieDB";

const {width, height} = Dimensions.get('window')
const ios = Platform.OS === 'ios'
const verticalMargin = ios ? '' : 'my-3'

const PersonScreen = () => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [personMovies, setPersonMovies] = useState([1,2,3,4,5]);
	const [person, setPerson] = useState([]);
	const navigation = useNavigation()
	const [loading, setLoading] = useState(false);

	const {params: item} = useRoute();

	useEffect(() => {
		setLoading(true)
		getPersonDetails(item.id)
		getPersonMovies(item.id)
	}, [item]);

	const getPersonDetails = async (id) => {
		const data = await fetchPersonDetails(id);
		if (data){
			setPerson(data);
			setLoading(false);
		}
	}

	const getPersonMovies = async (id) => {
		const data = await fetchPersonMovies(id);
		if (data){
			setPersonMovies(data.cast);
			setLoading(false);
		}
	}


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
								<Image
									//source={require('../../assets/images/castImage2.png')}
									source={{uri: image342(person?.profile_path)}}
									style={{height: height*0.43, width: width*0.74}}
								/>
							</View>

						</View>
						<View className={'mt-6'}>
							<Text className={'text-neutral-50 text-center text-3xl text-center'}>
								{person?.name}
							</Text>
							<Text className={'text-neutral-500 text-center text-base text-center'}>
								{person?.place_of_birth}
							</Text>
						</View>
						<View className={'mx-3 p-4 rounded-full mt-6 flex-row justify-between items-center bg-neutral-700'}>
							<View className={'border-r-2 border-r-neutral-400 px-2 flex items-center'}>
								<Text className={'text-white font-semibold text-base'}>Gender</Text>
								<Text className={'text-neutral-300 text-sm'}>
									{person?.gender === 1 ? 'Female' : 'Male'}
								</Text>
							</View>
							<View className={'border-r-2 border-r-neutral-400 px-2 flex items-center'}>
								<Text className={'text-white font-semibold text-base'}>Birthday</Text>
								<Text className={'text-neutral-300 text-sm'}>{person?.birthday}</Text>
							</View>
							<View className={'border-r-2 border-r-neutral-400 px-2 flex items-center'}>
								<Text className={'text-white font-semibold text-base'}>Know for</Text>
								<Text className={'text-neutral-300 text-sm'}>{person?.known_for_department}</Text>
							</View>
							<View className={' px-2 flex items-center'}>
								<Text className={'text-white font-semibold text-base'}>Popularity</Text>
								<Text className={'text-neutral-300 text-sm'}>{person?.popularity?.toFixed(2)}%</Text>
							</View>
						</View>
						<View className={'my-6 mx-4 space-y-2'}>
							<Text className={'text-white text-lg'}>Biography</Text>
							<Text className={'text-neutral-400 tracking-wide'}>
								{person?.biography || 'N/A'}
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
