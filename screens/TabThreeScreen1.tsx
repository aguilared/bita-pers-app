import { StyleSheet, FlatList } from "react-native";
import { Subheading, Surface, Divider, List } from "react-native-paper";

import { Text, View } from "../components/Themed";
import HTMLView from "react-native-htmlview";

import axios from "axios";
import dayjs from "dayjs";
import useSWR from "swr";

const convertDate = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};
export default function TabThreeScreen() {
  const operatorEndpoint = "http://192.168.0.101:3000/api/bitacora/events";
  const getData = async () => {
    const response = await axios(operatorEndpoint);
    return response.data;
  };
  const { data, error } = useSWR("operator_key", getData);

  const date = new Date();
  const titulo = "Eventos al: " + convertDate(date);

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
        renderItem={({ item }) => (
          <List.Section
            style={{
              marginTop: 1,
              marginBottom: 1,
              marginLeft: 10,
              marginRight: 5,
            }}
          >
            <Text
              style={styles.title3}
            >{`Evento: ${item.event.description} ID:${item.id}`}</Text>
            <Text style={styles.title1}>{`${convertDate(
              item.event_date
            )}`}</Text>
            <HTMLView value={item.description} stylesheet={styles} />

            <Divider style={{ backgroundColor: "gray" }} />
          </List.Section>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  a: {
    fontWeight: "bold",
    color: "purple",
  },
  div: {
    fontFamily: "monospace",
    marginTop: 1,
    marginBottom: 1,
  },
  p: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 1,
    marginBottom: 1,
    paddingVertical: 5,
    marginLeft: 5,
    fontSize: 19,
    fontWeight: "bold",
  },
  title1: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    fontSize: 17,
  },
  title3: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 5,
    paddingVertical: 5,
    fontSize: 17,
    color: "orange",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
