import * as React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator'
import MyDonations from '../screens/MyDonations'
import SettingScreen from '../screens/SettingScreen'
import SideBarMenu from './SideBarMenu'
export const AppDrawerNavigator = createDrawerNavigator({
  Home:{screen:AppTabNavigator},
  MyDonations:{screen:MyDonations},
  Setting:{screen:SettingScreen},

},
{
contentComponent:SideBarMenu 
},
{
initialRouteName:'Home'
})