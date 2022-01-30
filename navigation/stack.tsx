import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Appbar, Avatar, useTheme, Title } from "react-native-paper";

import { AddActivitie } from "../src/components/admin/addActivitie";
import { BottomTabs } from "./bottomTabs";
import { DetailedActivitie } from "./components/detailedActivitie";
import { DetailActivitie } from "./detailActivitie";
import { StackNavigatorParamlist } from "./types";

const Stack = createStackNavigator<StackNavigatorParamlist>();
type Props = {
  // route: RouteProp<StackNavigatorParamlist, 'FeedList'>;
  route: RouteProp<StackNavigatorParamlist, "ActivitiesList">;
};
export const StackNavigator = (props: Props) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="FeedList"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Appbar.Header
              theme={{ colors: { primary: theme.colors.surface } }}
            >
              {previous ? (
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  color={theme.colors.primary}
                />
              ) : (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => {
                    (
                      navigation as any as DrawerNavigationProp<object>
                    ).openDrawer();
                  }}
                >
                  <Avatar.Image
                    size={40}
                    source={{
                      uri: "https://pbs.twimg.com/profile_images/702602435953561600/FGGBwObG_400x400.jpg",
                    }}
                  />
                </TouchableOpacity>
              )}
              <Appbar.Content
                title={
                  title === "Feed" ? (
                    <MaterialCommunityIcons
                      style={{ marginRight: 10 }}
                      name="twitter"
                      size={40}
                      color={theme.colors.primary}
                    />
                  ) : (
                    <Title style={styles.title}>
                      Sparrow Bitacora - {title}
                    </Title>
                  )
                }
                titleStyle={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: theme.colors.primary,
                }}
              />
            </Appbar.Header>
          );
        },
      }}
    >
      <Stack.Screen
        name="ActivitiesList"
        component={BottomTabs}
        options={({ route }) => {
          //console.log('!@# options', { route });
          const routeName =
            getFocusedRouteNameFromRoute(props.route) ?? "ActivitiesList";
          return { headerTitle: routeName };
        }}
      />
      <Stack.Screen
        name="DetailActivitie"
        component={DetailActivitie}
        options={{ headerTitle: "Activitie" }}
      />
      <Stack.Screen
        name="DetailedActivitie"
        component={DetailedActivitie}
        options={{ headerTitle: "Activitie Detail" }}
      />
      <Stack.Screen
        name="AddActivitie"
        component={AddActivitie}
        options={{ headerTitle: "Add Activitie" }}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
});
