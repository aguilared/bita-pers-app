import { StyleSheet, ScrollView, Keyboard } from "react-native";

import {
  Divider,
  Surface,
  Subheading,
  Button,
  Provider,
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
import React, { useContext } from "react";
import { EventsContext } from "../context/EventState";
import { useNavigation } from "@react-navigation/native";

type Props = {
  id: number;
  events_id: number;
  event_date: string;
  event: string;
  user_id: number;
  client_id: number;
  sistemaclient: string;
  client_description: string;
  activitie_id: number;
  description: string;
  otherParam: string;
};

interface IFormInputs {
  singleErrorInput: string;
  multipleErrorInput: string;
  numberInput: string;
}

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
  console.log("bitaEvents", bitaEvents);
  const theme = useTheme();
  const backgroundColor = overlay(1, theme.colors.surface) as string;

  const { editBitaEvent } = useContext(EventsContext);

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
  } = useForm<IFormInputs>();

  const date = new Date();
  const titulo = "Evento Id: " + bitaEvents.id;

  const onSubmit = (data) => {
    const datas = {
      id: data.id,
      date: data.event_date,
      user_id: data.user_id,
      client_id: data.client_id,
      sistemaclient: data.sistemaclient,
      client_description: data.client_description,
      activitie_id: data.activitie_id,
      description: data.description,
      fecha_creado: convertDate1(date),
    };
    console.log("datas", datas);
    setIsSubmitting(true);
    editBitaEvent(datas);
    setVisible1(false); //close Dialog
    //debugger;
    setTimeout(() => {
      //navegando a home
      //navigation.navigation.push('ActivitiesList');
      navigation.navigate("ActivitiesList");
    }, 600);
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
                color="blue"
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
              Edit Actividad: {bitaEvents.id}
            </Dialog.Title>
            <Dialog.ScrollArea style={{ maxHeight: 450, paddingHorizontal: 0 }}>
              <ScrollView>
                <View>
                  <Text style={styles.label}>
                    Id:
                    <Controller
                      name="id"
                      control={control}
                      rules={{
                        required: {
                          value: false,
                          message: "* Please enter your id",
                        },
                        pattern: /\d+/,
                      }}
                      onFocus={() => {
                        true;
                      }}
                      render={(props) => (
                        <TextInput
                          {...propss}
                          keyboardType="numeric"
                          style={styles.input}
                          onChangeText={(value) => {
                            propss.onChange(value);
                          }}
                          value={String(bitaEvents.id)}
                        />
                      )}
                      defaultValue={String(bitaEvents.id)}
                    />
                    {errors.id && <Text>This is required.</Text>}
                  </Text>
                  <Text style={styles.label}>
                    Fecha:
                    <Controller
                      name="event_date"
                      control={control}
                      rules={{ required: "this is required" }}
                      onFocus={() => {
                        true;
                      }}
                      render={(props) => (
                        <TextInput
                          {...props}
                          style={styles.input}
                          onChangeText={(value) => {
                            props.onChange(value);
                          }}
                        />
                      )}
                      defaultValue={convertDate1(bitaEvents.event_date)}
                    />
                    {errors.event_date && <Text>This is required.</Text>}
                  </Text>
                  <Text style={styles.label}>
                    User:
                    <Controller
                      name="user_id"
                      control={control}
                      rules={{ required: true }}
                      render={(props) => (
                        <TextInput
                          {...props}
                          keyboardType="numeric"
                          style={styles.input}
                          onBlur={props.onBlur}
                          onChangeText={(value) => {
                            props.onChange(value);
                          }}
                        />
                      )}
                      defaultValue={String(propss.user_id)}
                    />
                    {errors.user_id && <Text>This is required.</Text>}
                  </Text>

                  <Text style={styles.label}>
                    Client ID:
                    <Controller
                      name="client_id"
                      control={control}
                      rules={{ required: true }}
                      render={(props) => (
                        <TextInput
                          {...props}
                          keyboardType="numeric"
                          style={styles.input}
                          onBlur={props.onBlur}
                          onChangeText={(value) => {
                            props.onChange(value);
                          }}
                        />
                      )}
                      defaultValue={String(propss.client_id)}
                    />
                    {errors.client_id && <Text>This is required.</Text>}
                  </Text>

                  <Text style={styles.label}>
                    Cliente:
                    <Controller
                      name="client_description"
                      control={control}
                      rules={{ required: true }}
                      render={(props) => (
                        <TextInput
                          {...props}
                          style={styles.input}
                          onBlur={props.onBlur}
                          onChangeText={(value) => {
                            props.onChange(value);
                          }}
                        />
                      )}
                      defaultValue={propss.client_description}
                    />
                    {errors.client_description && (
                      <Text>This is required.</Text>
                    )}
                  </Text>

                  <Text style={styles.label}>
                    Sistema Atendido:
                    <Controller
                      name="sistemaclient"
                      control={control}
                      rules={{ required: true }}
                      render={(props) => (
                        <TextInput
                          {...props}
                          style={styles.input}
                          onBlur={props.onBlur}
                          onChangeText={(value) => {
                            props.onChange(value);
                          }}
                        />
                      )}
                      defaultValue={propss.sistemaclient}
                    />
                    {errors.sistemaclient && <Text>This is required.</Text>}
                  </Text>

                  <Text style={styles.label}>
                    Tipo Activitie_id:
                    <Controller
                      name="activitie_id"
                      control={control}
                      rules={{ required: true }}
                      render={(props) => (
                        <TextInput
                          {...props}
                          keyboardType="numeric"
                          style={styles.input}
                          onBlur={props.onBlur}
                          onChangeText={(value) => {
                            props.onChange(value);
                          }}
                        />
                      )}
                      defaultValue={String(propss.activitie_id)}
                    />
                    {errors.activitie_id && <Text>This is required.</Text>}
                  </Text>
                  <Text style={styles.label}>Actividad:</Text>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={(props) => (
                      <TextInput
                        {...props}
                        multiline
                        numberOfLines={3}
                        style={styles.inputMulti}
                        onBlur={props.onBlur}
                        onChangeText={(value) => {
                          props.onChange(value);
                        }}
                      />
                    )}
                    defaultValue={propss.description}
                  />
                  {errors.description && <Text>This is required.</Text>}
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
