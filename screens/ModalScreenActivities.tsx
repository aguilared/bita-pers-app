import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Subheading, Surface, Divider, List } from "react-native-paper";

import { Text, View } from "../components/Themed";
import HTMLView from "react-native-htmlview";

import axios from "axios";
import dayjs from "dayjs";
import useSWR from "swr";

type Props = {
  id: number;
  event_date: string;
  event: string;
  description: string;
};

const convertDate = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};
export default function ModalScreenActivities(propss: Props) {
  //console.log("Props", propss);
  const clonedObj = { ...propss.route.params };
  const event = { ...clonedObj, ...propss };
  console.log("PropsMerge", event);

  const operatorEndpoint = "http://192.168.0.106:3000/api/bitacora/events";
  const getData = async () => {
    const response = await axios(operatorEndpoint);
    return response.data;
  };
  const { data, error } = useSWR("operator_key", getData);

  const date = new Date();
  const titulo = "Evento Id: " + event.id;
  if (!data) {
    return <ActivityIndicator size="large" color="#e91e63" />;
  }
  return (
    <Surface style={styles.container}>
      <Subheading style={styles.title}>{titulo}</Subheading>
      <Divider style={{ backgroundColor: "gray" }} />
      <Subheading style={styles.label}>
        Fecha: {convertDate(event.event_date)}
      </Subheading>
      <Subheading style={styles.label}>Event: {event.event}</Subheading>
      <HTMLView value={event.description} stylesheet={styless} />
      <Divider style={{ backgroundColor: "gray" }} />
    </Surface>
  );
}
const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 1,
    marginBottom: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  p: {
    fontSize: 18,
  },
  a: {
    fontWeight: "300",
    color: "#0c55ae", // make links coloured pink
  },
});

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
    backgroundColor: "#fff",
    marginTop: 1,
    marginBottom: 1,
    marginRight: 10,
    marginLeft: 10,
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
  label: {
    paddingVertical: 5,
    marginLeft: 3,
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
});
