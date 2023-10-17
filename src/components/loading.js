import React from 'react';

import {Dimensions, Text, View} from 'react-native';
import * as Progress from 'react-native-progress'
import {theme} from "../theme";

const {width, height} = Dimensions.get('window')
const Loading = () => {
	return (
		<View
			style={{height, width}}
			className={'absolute flex-row justify-center items-center'}
		>
			<Progress.CircleSnail size={160} color={theme.background} thickness={12} />
		</View>
	);
};

export default Loading;
