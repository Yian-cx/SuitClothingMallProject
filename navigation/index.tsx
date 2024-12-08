import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProfilePage from '../pages/profile';
import SettingsPage from '../pages/settings';
import OrdersPage from '../pages/orders';
import ShoppingCartPage from '../pages/shopping-cart';
import BrowsingHistoryPage from '../pages/browsing-history';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={ProfilePage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Shop"
      component={OrdersPage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cart-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Create"
      component={ProfilePage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add-circle-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Messages"
      component={ProfilePage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="chatbubble-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfilePage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Settings" component={SettingsPage} />
      <Stack.Screen name="Orders" component={OrdersPage} />
      <Stack.Screen name="ShoppingCart" component={ShoppingCartPage} />
      <Stack.Screen name="BrowsingHistory" component={BrowsingHistoryPage} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;

