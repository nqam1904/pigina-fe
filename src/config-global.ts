import packageJson from "../package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  baseUrl: string;
  serverUrl: string;
  assetsDir: string;
  nodeEnv: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: "pigina",
  appVersion: packageJson.version,
  baseUrl: process.env.BASE_URL ?? "",
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? "",
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? "",
  nodeEnv: process.env.ENV ?? "",
};
