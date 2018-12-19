import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import {Constants} from 'expo'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  History: {screen: History},
  AddEntry: {screen: AddEntry},
  Live: {screen: Live},
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({tintColor}) => {
      const {routeName} = navigation.state
      routeName === 'History' ?  <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
      : <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }),
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  },
  swipeEnabled: true,
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  }
})

const TabsContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <TabsContainer />
        </View>
      </Provider>
    )
  }
}