import React, {useState} from 'react';

import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {styles} from "../theme";
import TrendingMovies from "../components/trending";
import MovieList from "../components/movieList";
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";

const ios = Platform.OS === 'ios';
const HomeScreen = () => {
	const [trending, setTrending] = useState([1,2,3]);
	const [upcoming, setUpcoming] = useState([1,2,3]);
	const [topRated, setTopRated] = useState([1,2,3]);
	const [loading, setLoading] = useState(false);

	const navigation = useNavigation()
	return (
		<View className='flex-1 bg-neutral-800'>
			{/*Search bar and logo*/}
			<SafeAreaView className={ios ? '-mb-2 mx-4' : 'mb-3 mx-4'}>
				<StatusBar style='light' />
				<View className={'flex-row justify-between items-center'}>
					<Bars3CenterLeftIcon size={'30'} color={'white'} strokeWidth={2} />
					<Text className={'text-3xl text-white font-bold'}>
						<Text style={styles.text}>M</Text>ovies
					</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate('Search')}
					>
						<MagnifyingGlassIcon size={'30'} color={'white'} strokeWidth={2} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
			{
				loading ? (
					<Loading />
				):(
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{paddingBottom: 10}}
					>
						<TrendingMovies data={trending} />
						{/*Upcoming movie*/}
						<MovieList title='Upcoming' data={upcoming} />
						{/*Top-rated movie*/}
						<MovieList title='Top rated movie' data={topRated} />

					</ScrollView>
				)
			}
		</View>
	);
};

export default HomeScreen;
