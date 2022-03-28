import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from "react-native";
import {
  Subheading,
  Surface,
  Divider,
  List,
  Appbar,
  Portal,
  Dialog,
  TextInput,
  Button,
  useTheme,
} from "react-native-paper";
import { Text, View } from "../components/Themed";
import HTMLView from "react-native-htmlview";
import axios from "axios";

import dayjs from "dayjs";
import React, { useState, useRef, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { onlineManager, focusManager, useQuery } from "react-query";
import NetInfo from "@react-native-community/netinfo";
import useAppState from "react-native-appstate-hook";

import { useForm, Controller } from "react-hook-form";
import overlay from "./overlay";

const convertDate = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};

type FormData = {
  id: number;
  bitacora_id: number;
  tipo_event_id: number;
  events_id: number;
  event_date: string;
  event: string;
  tipoevent: string;
  description: string;
};

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected);
  });
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function Bitacoras<T>() {
  useAppState({
    onChange: onAppStateChange,
  });

  const [id, setId] = useState("");
  const [bitacora_id, setBitacora_id] = useState("");
  const [tipo_event_id, setTipo_event_id] = useState("");
  const [events_id, setEvents_id] = useState("");
  const [event_date, setEvent_date] = useState("");
  const [event, setEvent] = useState("");
  const [tipoevent, setTipoevent] = useState("");
  const [description, setDescription] = useState("");

  const getData = async () => {
    const response = await axios(operatorEndpoint);
    return response.data;
  };

  //const { data, error } = useSWR("operator_key", getData);
  const ENDPOINT = "http://192.168.0.106:3000/api/bitacora/events";
  const { status, data, error, isLoading, refetch } = useQuery(
    "bitacoras",
    async () => {
      const res = await axios.get(`${ENDPOINT}`);
      console.log("DATA1", res);
      return res.data;
    }
  );
  const enabledRef = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) {
        refetch();
      } else {
        enabledRef.current = true;
      }
    }, [refetch])
  );
  const dates: any = new Date();
  const titulo = "Eventos al: " + convertDate(dates);
  const navigation = useNavigation();
  //console.log("Bitacoras", bitacoras1);
  //console.log("Bitacoras Data", data);

  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);

  const showDialog = () => setVisible(true);
  const showDialog1 = () => setVisible1(true);

  const hideDialog = () => setVisible(false);
  const hideDialog1 = () => setVisible1(false);
  const theme = useTheme();
  const backgroundColor = overlay(1, theme.colors.surface) as string;

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = async (dataE: any) => {
    axios
      .put(
        "http://192.168.0.106:3000/api/bitacora/events/edit/" +
          Number(dataE.id),
        {
          bitacora_id: Number(dataE.bitacora_id),
          tipo_event_id: Number(dataE.tipo_event_id),
          events_id: Number(dataE.events_id),
          description: dataE.description,
          event_date: new Date(dataE.event_date),
        }
      )
      .then((res) => {
        console.log("RESP", res);
       
        setVisible1(false);
      })
      .catch((err) => console.error(err));
  };

  if (isLoading) {
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
        renderItem={({ item }) => (
          <List.Section
            style={{
              marginTop: 1,
              marginBottom: 1,
              marginLeft: 10,
              marginRight: 5,
            }}
          >
            <Appbar.Header style={styles.header}>
              <Appbar.Content
                title={`${convertDate(item.event_date)}`}
                subtitle={`Id: ${item.id} BitacoraId ${item.bitacora_id}`}
              />
              <Appbar.Action
                icon="pencil"
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
              />
              <Appbar.Action icon="delete" onPress={() => alert("Search")} />
              <Appbar.Action
                icon="menu"
                onPress={() => {
                  Keyboard.dismiss();
                  setId(item.id);
                  setBitacora_id(item.bitacora_id);
                  setTipo_event_id(item.tipo_event_id);
                  setEvents_id(item.events_id);
                  setEvent_date(item.event_date);
                  setEvent(item.event);
                  setTipoevent(item.tipoevent);
                  setDescription(item.description);
                  showDialog1();
                }}
              />
            </Appbar.Header>
            <Text
              style={styles.title1}
            >{`Tipo Evento: ${item.tipoEvent.description}`}</Text>
            <Text
              style={styles.title1}
            >{`Evento: ${item.event.description}`}</Text>
            <HTMLView
              value={`Description: ${item.description}`}
              stylesheet={styles}
            />

            <Divider style={{ backgroundColor: "gray" }} />
            <View>
              <Portal>
                <Dialog
                  visible={visible1}
                  onDismiss={hideDialog1}
                  style={{ backgroundColor }}
                >
                  <Dialog.Title style={styles.title}>
                    Edit ID:{`${id}`}
                    Edit BitacoraId:{`${bitacora_id}`}
                  </Dialog.Title>
                  <Dialog.ScrollArea
                    style={{ maxHeight: 450, paddingHorizontal: 0 }}
                  >
                    <ScrollView>
                      <View>
                        <Text style={styles.label}>
                          Id:
                          <Controller
                            name="id"
                            control={control}
                            render={({ field: { value } }) => (
                              <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                value={String(id)}
                                disabled={true}
                              />
                            )}
                            defaultValue={String(id)}
                          />
                          {errors.id && <Text>This is required.</Text>}
                        </Text>

                        <Text style={styles.label}>
                          Bitacora Id:
                          <Controller
                            name="bitacora_id"
                            control={control}
                            render={({ field: { value } }) => (
                              <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                value={String(bitacora_id)}
                                disabled={true}
                              />
                            )}
                            defaultValue={String(bitacora_id)}
                          />
                          {errors.id && <Text>This is required.</Text>}
                        </Text>

                        <Text style={styles.label}>
                          Tipos_event_id:
                          <Controller
                            name="tipo_event_id"
                            control={control}
                            render={({ field: { value } }) => (
                              <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                value={String(tipo_event_id)}
                                disabled={true}
                              />
                            )}
                            defaultValue={String(tipo_event_id)}
                          />
                          {errors.id && <Text>This is required.</Text>}
                        </Text>

                        <Text style={styles.label}>
                          Events_id:
                          <Controller
                            name="events_id"
                            control={control}
                            render={({ field: { value } }) => (
                              <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                value={String(events_id)}
                                disabled={true}
                              />
                            )}
                            defaultValue={String(events_id)}
                          />
                          {errors.id && <Text>This is required.</Text>}
                        </Text>

                        <Text style={styles.label}>Description:</Text>
                        <Controller
                          name="description"
                          control={control}
                          rules={{ required: true }}
                          defaultValue={String(description)}
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <TextInput
                              multiline
                              numberOfLines={4}
                              onBlur={onBlur}
                              value={value}
                              onChangeText={(value) => onChange(value)}
                              ref={ref}
                            />
                          )}
                        />

                        <Text style={styles.label}>
                          Fecha:
                          <Controller
                            name="event_date"
                            control={control}
                            render={({ field: { value } }) => (
                              <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                value={String(event_date)}
                                disabled={true}
                              />
                            )}
                            defaultValue={String(event_date)}
                          />
                          {errors.id && <Text>This is required.</Text>}
                        </Text>
                      </View>

                      <View style={styles.topRow}>
                        <View>
                          <Subheading style={styles.label}>
                            <Button
                              dark
                              color="gray"
                              icon="file-cancel-outline"
                              mode="contained"
                              onPress={hideDialog1}
                            >
                              Cancelar
                            </Button>
                            {"  "}
                            <Button
                              dark
                              color="blue"
                              icon="content-save-edit-outline"
                              background-color="gray"
                              mode="contained"
                              onPress={handleSubmit(onSubmit)}
                            >
                              Modificar
                            </Button>
                          </Subheading>
                        </View>
                      </View>
                    </ScrollView>
                  </Dialog.ScrollArea>
                </Dialog>
              </Portal>
            </View>
          </List.Section>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#656c71",
  },
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
    color: "blue",
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f0f6fa",
    borderRadius: 4,
    fontSize: 16,
    height: 18,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 1,
    marginBottom: 1,
  },
  inputMulti: {
    backgroundColor: "#f0f6fa",
    borderRadius: 4,
    fontSize: 14,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
  },
});
