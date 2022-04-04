import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { GlobalProvider } from "./context/GlobalState";
import { EventsProvider } from "./context/EventState";
import { BitacoraProvider } from "./context/BitacoraState";
import { QueryClient, QueryClientProvider } from "react-query";

import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
} from "react-native-paper";
import Navigation from "./navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 10000,
    },
  },
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<"light" | "dark">(
    colorScheme === "dark" ? "dark" : "light"
  );

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalProvider>
            <BitacoraProvider>
              <EventsProvider>
                <PaperProvider
                  theme={
                    theme === "light"
                      ? {
                          ...DefaultTheme,
                          colors: {
                            ...DefaultTheme.colors,
                            primary: "#1ba1f2",
                          },
                        }
                      : {
                          ...DarkTheme,
                          colors: { ...DarkTheme.colors, primary: "#1ba1f2" },
                        }
                  }
                >
                  <Navigation colorScheme={colorScheme} />
                  <StatusBar />
                </PaperProvider>
              </EventsProvider>
            </BitacoraProvider>
          </GlobalProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
}
