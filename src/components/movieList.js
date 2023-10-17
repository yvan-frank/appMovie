import React from 'react';

import {Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from "../theme";
import {useNavigation} from "@react-navigation/native";

let {width, height} = Dimensions.get('window')

const MovieList = ({title, data, hideSeeAll}) => {
	const navigation = useNavigation()
	let movieName = "Fast And Furious Fast And Furious"
	return (
		<View className='mb-8 space-y-4'>
			<View className='mx-4 flex-row justify-between items-center'>
				<Text className={'text-white text-xl'}>{title}</Text>
				{
					!hideSeeAll && (
						<TouchableOpacity>
							<Text style={styles.text}>See all</Text>
						</TouchableOpacity>
					)
				}
			</View>
			{/*	movie row*/}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{paddingHorizontal: 15}}
			>
				{
					data.map((item, index) => {
						return(
							<TouchableWithoutFeedback
								key={index}
								onPress={() => navigation.push('MovieDetails', item)}
							>
								<View className='space-y-3 mr-4'>
									<Image
										source={ require('../../assets/images/moviePoster2.png')}
										className='rounded-3xl'
										style={{width: width*0.33, height: height*0.22}}
									/>
									<Text className={'text-neutral-300 ml-1'}>
									{movieName.length > 14 ? movieName.slice(0, 14) + '...' : movieName}
									</Text>
								</View>

							</TouchableWithoutFeedback>
						)
					})
				}
			</ScrollView>
		</View>
	);
};

export default MovieList;
