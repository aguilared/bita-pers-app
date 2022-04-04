import axios from "axios";
import dayjs from "dayjs";
import React, { useState, useEffect, useContext } from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { Subheading, Surface, Divider, List } from "react-native-paper";
import HTMLView from "react-native-htmlview";
import { useNavigation } from "@react-navigation/native";
import useSWR from "swr";

const convertDate = (date) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};

export default function Activities() {
  const operatorEndpoint = "http://192.168.0.101:1337/api/v1/activities";
  const getData = async () => {
    const response = await axios(operatorEndpoint);
    return response.data;
  };
  const { data, error } = useSWR("operator_key", getData);
  const date = new Date();
  const titulo = "Actividades alll: " + convertDate(date);
  const navigation = useNavigation();

  function keyExtractor(item, index) {
    return item.id.toString();
  }
  if (!data) {
    return <ActivityIndicator size="large" color="#e91e63" />;
  }

  return (
    <Surface style={styles.container}>
      <Subheading style={styles.title}>{titulo}</Subheading>
      <Divider style={{ backgroundColor: "gray" }} />
      <FlatList
        style={{
          marginBottom: 1,
          marginTop: 1,
          marginLeft: 1,
        }}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <List.Section style={{ marginTop: 1, marginBottom: 1 }}>
            <List.Item
              titleNumberOfLines={10}
              title={`${convertDate(item.event_date)} ${item.description}`}
              description={`Evento: ${item.event.description} ID:${item.id}`}
              descriptionStyle={{ color: "orange" }}
              onPress={() =>
                navigation.navigate("ModalActivities", {
                  id: item.id,
                  event_date: item.event_date,
                  event: item.event.description,
                  description: item.description,
                })
              }
            />
            <Divider style={{ backgroundColor: "gray" }} />
          </List.Section>
        )}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  handle: {
    marginRight: 3,
    lineHeight: 12,
  },
  content: {
    marginTop: 25,
    fontSize: 20,
    lineHeight: 30,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
    marginLeft: 5,
    fontSize: 19,
    fontWeight: "bold",
  },
  list: {
    marginTop: 1,
    marginBottom: 1,
    paddingVertical: 5,
    marginLeft: 5,
    fontSize: 19,
    fontWeight: "bold",
  },
});
