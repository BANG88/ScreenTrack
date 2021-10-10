import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigationContainerRef} from '@react-navigation/native';
function HomeScreen({navigation}) {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Details')}
			/>
		</View>
	);
}
function DetailsScreen({navigation}) {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>Details Screen</Text>
			<Button
				title="Go to Details... again"
				onPress={() => navigation.push('Details1')}
			/>
			<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
			<Button title="Go back" onPress={() => navigation.goBack()} />
			<Button
				title="Go back to first screen in stack"
				onPress={() => navigation.popToTop()}
			/>
		</View>
	);
}
function DetailsScreen1({navigation}) {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>Details Screen 1</Text>
			<Button
				title="Go to Details... again"
				onPress={() => navigation.push('Details')}
			/>
			<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
			<Button title="Go back" onPress={() => navigation.goBack()} />
			<Button
				title="Go back to first screen in stack"
				onPress={() => navigation.popToTop()}
			/>
		</View>
	);
}

const Stack = createNativeStackNavigator();

function App() {
	const navigationRef = useNavigationContainerRef();
	const routeNameRef = React.useRef();

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				routeNameRef.current = navigationRef.getCurrentRoute().name;
			}}
			onStateChange={async () => {
				const previousRouteName = routeNameRef.current;
				const currentRouteName = navigationRef.getCurrentRoute().name;

				if (previousRouteName !== currentRouteName) {
					// The line below uses the expo-firebase-analytics tracker
					// https://docs.expo.io/versions/latest/sdk/firebase-analytics/
					// Change this line to use another Mobile analytics SDK
					// await Analytics.setCurrentScreen(currentRouteName);
					console.log('SCRENNT: ', currentRouteName);
				}

				// Save the current route name for later comparison
				routeNameRef.current = currentRouteName;
			}}>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Details" component={DetailsScreen} />
								<Stack.Screen name="Details1" component={DetailsScreen1} />

			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
