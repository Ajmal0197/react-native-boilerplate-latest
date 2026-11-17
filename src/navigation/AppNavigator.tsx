import type { MainTabParamList } from './types';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useUnistyles } from 'react-native-unistyles';
import { HomeIcon, BellIcon, SettingsIcon } from '@assets/svgs';
import { HomeScreen } from '@features/home';
import { NotificationsScreen } from '@features/notifications';
import { SettingsScreen } from '@features/settings';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderHomeIcon = ({ color, size }: { color: string; size: number }) => (
  <HomeIcon color={color} size={size} />
);

const renderBellIcon = ({ color, size }: { color: string; size: number }) => (
  <BellIcon color={color} size={size} />
);

const renderSettingsIcon = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <SettingsIcon color={color} size={size} />;

export const AppNavigator = () => {
  const { theme } = useUnistyles();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: renderBellIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: renderSettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};
