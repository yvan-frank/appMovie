import React, {useState} from 'react';

import {Dimensions, ScrollView, Text, TextInput, TouchableOpacity,
	TouchableWithoutFeedback, View, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {XMarkIcon} from "react-native-heroicons/outline";
import Loading from "../components/loading";
let {width, height} = Dimensions.get('window')

const SearchScreen = () => {
	const [results, setResults] = useState([1,2,3,4,5]);
	const navigation = useNavigation()
	const movieName = 'Fast And Furious Fast And Furious'

	const [loading, setLoading] = useState(false);

	return (
		<SafeAreaView className={'bg-neutral-800 flex-1'}>
			<View className={'mx-4 bg-white mt-8 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'}>
				<TextInput
					placeholder={'Search movies'}
					placeholderTextColor={'gray'}
					className={'pb-1 pl-2 flex-1 text-base font-semibold text-white tracking-wider'}
				/>
				<TouchableOpacity
					className={'rounded-full p-2 m-1 bg-neutral-500'}
				>
					<XMarkIcon size={'25'} color={'white'} />
				</TouchableOpacity>
			</View>
			{/*	results*/}
			{
				loading ? (
					<Loading />
				):
					results.length>0 ? (
						<ScrollView
							contentContainerStyle={{paddingHorizontal: 15}}
							showsVerticalScrollIndicator={false}
							className={'space-y-2'}
						>
							<Text className={'text-white ml-1 font-semibold'}>Results ({results.length})</Text>
							<View className={'flex-row justify-between flex-wrap'}>
								{
									results.map((item, index) => {
										return(
											<TouchableWithoutFeedback
												key={index}
												onPress={() => navigation.push('MovieDetails', item)}
											>
												<View className={'space-y-2 mb-4'}>
													<Image className={'rounded-3xl'}
													       source={require('../../assets/images/moviePoster2.png')}
													       style={{width: width*0.44, height: height*0.3}}
													/>
													<Text className={'text-neutral-300 ml-1 '}>
														{
															movieName.length > 20 ? movieName.slice(0, 20) + '...' : movieName
														}
													</Text>
												</View>
											</TouchableWithoutFeedback>
										)
									})
								}
							</View>
						</ScrollView>
					):(
						<View className={'flex-row justify-center'}>
							<Image
								source={require('../../assets/images/movieTime.png')}
								className={'h-96 w-96'}
							/>
						</View>
					)


			}


		</SafeAreaView>
	);
};

export default SearchScreen;
