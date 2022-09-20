import { StyleSheet, ScrollView, Keyboard } from "react-native";

import {
  Divider,
  Surface,
  Subheading,
  Button,
  Portal,
  Dialog,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Text, View } from "../components/Themed";
import overlay from "./overlay";

import { useForm, Controller } from "react-hook-form";

import HTMLView from "react-native-htmlview";

import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
  id: number;
  bitacora_id: number;
  tipo_event_id: number;
  events_id: number;
  event_date: string;
  event: string;
  tipoevent: string;
  description: string;
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

interface IFormInputs {
  singleErrorInput: string;
  multipleErrorInput: string;
  numberInput: string;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 10000,
    },
  },
});

const convertDate = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};
const convertDate1 = (date: string) => {
  const d = dayjs(date).format("DD-MM-YYYY HH:MM");
  return d;
};
export default function ModalEvent(propss: Props) {
  const clonedObj = { ...propss.route.params };
  const bitaEvents = { ...clonedObj, ...propss };
  const navigation = useNavigation();
  //console.log("bitaEvents", bitaEvents);
  const theme = useTheme();
  const backgroundColor = overlay(1, theme.colors.surface) as string;

  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);

  const showDialog = () => setVisible(true);
  const showDialog1 = () => setVisible1(true);

  const hideDialog = () => setVisible(false);
  const hideDialog1 = () => setVisible1(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const date = new Date();
  const titulo = "Evento Id: " + bitaEvents.id;

  useEffect(() => {
    setVisible1(true);
  }, [setVisible1]);

  const onSubmit = async (dataE: any) => {
    console.log("DATAE", dataE);
    try {
      const dataEE = {
        id: Number(dataE.id),
        bitacora_id: Number(dataE.bitacora_id),
        tipo_event_id: Number(dataE.tipo_event_id),
        events_id: Number(dataE.events_id),
        description: dataE.description,
        event_date: new Date(dataE.event_date),
      };
      // https://bita-personal-api.vercel.app/api/
      //await editBitacora(data);  http://192.168.1.99:3000/api/  "http://localhost:3000/
      const result = await fetch(
        "http://192.168.1.99:3000/api/bitacora/events/admin/edit",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataEE),
        }
      );
      console.log("result", result);
      // refetch();
      setVisible1(false);
      setTimeout(() => {
        //navigation.navigation.push('ActivitiesList');
        navigation.navigate("Bitacoras");
      }, 600);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Surface style={styles.container}>
      <ScrollView>
        <View style={styles.topRow}>
          <View>
            <Subheading style={styles.title}>{titulo}</Subheading>

            <Subheading style={styles.label}>
              <Button
                dark
                color="green"
                icon="file-document-edit-outline"
                mode="contained"
                onPress={() => {
                  Keyboard.dismiss();
                  showDialog1();
                }}
              >
                Edit
              </Button>
              {"  "}
              <Button
                dark
                color="red"
                icon="delete-alert"
                background-color="gray"
                mode="contained"
                onPress={() => {
                  Keyboard.dismiss();
                  showDialog();
                }}
              >
                Delete
              </Button>
            </Subheading>
          </View>
        </View>
        <Divider style={{ backgroundColor: "gray" }} />
        <Subheading style={styles.label}>
          Fecha: {convertDate(bitaEvents.event_date)}
        </Subheading>
        <Subheading style={styles.label}>
          TipoEvent: {bitaEvents.tipoevent}
        </Subheading>
        <Subheading style={styles.label}>Event: {bitaEvents.event}</Subheading>
        <HTMLView value={bitaEvents.description} stylesheet={styless} />
        <Divider style={{ backgroundColor: "gray" }} />
      </ScrollView>
      <View>
        <Portal>
          <Dialog
            visible={visible1}
            onDismiss={hideDialog1}
            style={{ backgroundColor }}
          >
            <Dialog.Title style={styles.title}>
              Edit Actividadd: {bitaEvents.id}
            </Dialog.Title>
            <Dialog.ScrollArea style={{ maxHeight: 450, paddingHorizontal: 0 }}>
              <ScrollView>
                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="id"
                    control={control}
                    defaultValue={bitaEvents.id}
                    render={({ field: { value } }) => (
                      <TextInput
                        label="ID"
                        testID="input"
                        mode="outlined"
                        keyboardType="numeric"
                        value={String(bitaEvents.id)}
                        disabled={true}
                      />
                    )}
                  />
                  {errors.id && <Text>This is required.</Text>}
                </View>

                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="bitacora_id"
                    control={control}
                    defaultValue={bitaEvents.bitacora_id}
                    render={({ field: { value } }) => (
                      <TextInput
                        label="BitacoraID"
                        testID="input"
                        mode="outlined"
                        keyboardType="numeric"
                        value={String(bitaEvents.bitacora_id)}
                      />
                    )}
                  />
                  {errors.id && <Text>This is required.</Text>}
                </View>

                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="tipo_event_id"
                    control={control}
                    defaultValue={bitaEvents.tipo_event_id}
                    render={({ field: { value } }) => (
                      <TextInput
                        label="TipoEventID"
                        testID="input"
                        mode="outlined"
                        keyboardType="numeric"
                        value={String(bitaEvents.tipo_event_id)}
                      />
                    )}
                  />
                  {errors.id && <Text>This is required.</Text>}
                </View>

                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="events_id"
                    control={control}
                    defaultValue={bitaEvents.events_id}
                    render={({ field: { value } }) => (
                      <TextInput
                        label="EventsID"
                        testID="input"
                        mode="outlined"
                        keyboardType="numeric"
                        value={String(bitaEvents.events_id)}
                      />
                    )}
                  />
                  {errors.id && <Text>This is required.</Text>}
                </View>

                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={bitaEvents.description}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextInput
                        label="Description"
                        testID="input"
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={(value) => onChange(value)}
                        ref={ref}
                      />
                    )}
                  />
                </View>

                <View style={styles.inputContainerStyle}>
                  <Controller
                    name="event_date"
                    control={control}
                    defaultValue={String(bitaEvents.event_date)}
                    render={({ field: { value } }) => (
                      <TextInput
                        label="Event Date"
                        testID="input"
                        mode="outlined"
                        value={String(bitaEvents.event_date)}
                      />
                    )}
                  />
                  {errors.id && <Text>This is required.</Text>}
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
                        color="green"
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  input: {
    borderRadius: 4,
    fontSize: 16,
    height: 18,
    padding: 6,
    marginTop: 10,
    marginBottom: 10,
    color: "rgba(0, 0, 0,0)",
  },
  inputMulti: {
    backgroundColor: "#f0f6fa",
    borderRadius: 4,
    fontSize: 14,
    padding: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  inputContainerStyle: {
    margin: 8,
  },
});

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
