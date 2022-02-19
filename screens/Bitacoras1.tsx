import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Subheading, Surface, Divider, List } from "react-native-paper";

import { Text, View } from "../components/Themed";
import HTMLView from "react-native-htmlview";

import dayjs from "dayjs";
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigation } from "@react-navigation/native";

const convertDate = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};
export default function Bitacoras() {
  const { bitacoras1, loading } = useContext(GlobalContext);
  const dates: any = new Date();
  const titulo = "Eventos al: " + convertDate(dates);
  const navigation = useNavigation();
  //console.log("Bitacoras", bitacoras1);
  if (loading) {
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
        data={bitacoras1}
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
              onPress={() =>
                navigation.navigate("ModalEvent", {
                  id: item.id,
                  bitacora_id: item.bitacora_id,
                  event_date: item.event_date,
                  tipo_event_id: item.tipo_event_id,
                  events_id: item.events_id,
                  event: item.event.description,
                  tipoevent: item.tipoEvent.description,
                  description: item.description,
                })
              }
            >
              Id: {item.id} Fecha: {`${convertDate(item.event_date)}`}
            </Text>
            <Text
              style={styles.title1}
            >{`Evento: ${item.event.description}`}</Text>
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
    color: "blue",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
