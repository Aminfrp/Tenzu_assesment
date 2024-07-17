"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { PropsWithChildren } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    text: {
      primary: "#222",
    },
  },
  typography: {
    allVariants: {
      color: "primary",
    },
  },
});

export default function MaterialProvider({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>{" "}
    </AppRouterCacheProvider>
  );
}
