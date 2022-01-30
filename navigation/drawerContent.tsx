import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import Animated from "react-native-reanimated";

import { PreferencesContext } from "../context/preferencesContext";
type Props = DrawerContentComponentProps<DrawerContentOptions>;

export function DrawerContent(props: Props) {
  console.log("PropsNavigation:", props.navigation.navigate);
  const paperTheme = useTheme();
  const { rtl, theme, toggleRTL, toggleTheme } =
    React.useContext(PreferencesContext);

  const translateX = Animated.interpolateNode(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View
        //@ts-ignore
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.surface,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: "https://pbs.twimg.com/profile_images/702602435953561600/FGGBwObG_400x400.jpg",
            }}
            size={50}
          />
          <Title style={styles.title}>Sparrow Bitacora</Title>
          <Caption style={styles.caption}>@sparrowguayana</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                75
              </Paragraph>
              <Caption style={styles.caption}>Siguiendo</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                25
              </Paragraph>
              <Caption style={styles.caption}>Seguidores</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="plus-box-multiple"
                color={color}
                size={size}
              />
            )}
            label="AddActivitie"
            onPress={() => props.navigation.navigate("AddActivitie")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="virus" color={color} size={size} />
            )}
            label="Covid"
            onPress={() => props.navigation.navigate("Covid")}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="GoBack"
            //onPress={() => console.log('Propss',props)}
            onPress={() => props.navigation.goBack()}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Close"
            onPress={() =>
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={theme === "dark"} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={toggleRTL}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={rtl === "right"} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
