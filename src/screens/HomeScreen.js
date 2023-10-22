import React, {useEffect, useState} from 'react';

import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {styles} from "../theme";
import TrendingMovies from "../components/trending";
import MovieList from "../components/movieList";
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from "../api/movieDB";

const ios = Platform.OS === 'ios';
const HomeScreen = () => {
	const [trending, setTrending] = useState([]);
	const [upcoming, setUpcoming] = useState([]);
	const [topRated, setTopRated] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getTrendingMovies()
		getUpcomingMovies()
		getTopRatedMovies()
	}, []);

	const getTrendingMovies = async () => {
	    const data = await fetchTrendingMovies();
		//console.log('Got trending movies', data);
		if (data && data.results) {
			setTrending(data.results);
			setLoading(false);
		}
	}

	const getUpcomingMovies = async () => {
	    const data = await fetchUpcomingMovies();
		//console.log('Got upcoming movies', data);
		if (data && data.results) {
			setUpcoming(data.results);
			//setLoading(false);
		}
	}

	const getTopRatedMovies = async () => {
	    const data = await fetchTopRatedMovies();
		//console.log('Got top rated movies', data);
		if (data && data.results) {
			setTopRated(data.results);
			//setLoading(false);
		}
	}


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
						<MovieList title='Top rated' data={topRated} />

					</ScrollView>
				)
			}
		</View>
	);
};

export default HomeScreen;
