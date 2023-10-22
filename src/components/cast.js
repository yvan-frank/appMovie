import React from 'react';

import {ScrollView, Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {image185} from "../api/movieDB";

const Cast = ({cast}) => {
	const personName = 'John Doe';
	const characterName = 'John Wick Dominic Toretto';
	const navigation = useNavigation()
	return (
		<View className='my-3'>
			<Text className='text-white text-lg mx-4 mb-5'>Top Cast </Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{paddingHorizontal: 15}}
			>
				{
					cast && cast.map((person, index) => {
						return(
							<TouchableOpacity
								key={index}
								className={'mr-4 items-center'}
								onPress={() => navigation.navigate('Person', person)}
							>
								<View
									className={'w-20 h-20 rounded-full overflow-hidden items-center border-2 border-white'}
								>
									<Image
										//source={require('../../assets/images/castImage1.png')}
										source={{uri: image185(person.profile_path)}}
										className='rounded-2xl h-24 w-20'
									/>

								</View>
								<Text className='text-white text-xs mt-1'>
									{
										person?.character.length > 14 ? person?.character.slice(0, 14) + '...' : person?.character
									}
								</Text>
								<Text className='text-white text-xs mt-1 text-neutral-400'>
									{
										person?.original_name.length > 14 ? person?.original_name.slice(0, 14) + '...' : person?.original_name
									}
								</Text>
							</TouchableOpacity>
						)
					})
				}
			</ScrollView>
		</View>
	);
};

export default Cast;
