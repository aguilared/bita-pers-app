import axios from "axios";
import dayjs from "dayjs";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Subheading, Surface, Divider, List } from "react-native-paper";
import useSWR from "swr";

const convertDate = (date) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};

export default function Activities(navigation) {
  const operatorEndpoint = "http://192.168.0.106:1337/api/v1/activities";
  const getData = async () => {
    const response = await axios(operatorEndpoint);
    return response.data;
  };
  const { data, error } = useSWR("operator_key", getData);

  const date = new Date();
  const titulo = "Actividades al: " + convertDate(date);
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
              titleNumberOfLines={3}
              title={`${convertDate(item.date)} ${item.description}`}
              description={`Cliente: ${item.client_description} `}
              descriptionStyle={{ color: "orange" }}
              onPress={() =>
                navigation.navigate("ModalActivities", {
                  id: item.id,
                  fecha_actividad: item.date,
                  user_id: item.user_id,
                  client_id: item.client_id,
                  sistemaclient: item.sistemaclient,
                  client_description: item.client_description,
                  activitie_id: item.activitie_id,
                  description: item.description,
                  otherParam: "Activitie Detail",
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
