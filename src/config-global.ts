import packageJson from "../package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  baseUrl: string;
  serverUrl: string;
  assetsDir: string;
  nodeEnv: string;
  isStaticExport: boolean;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: "pigina",
  isStaticExport: process.env.NEXT_PUBLIC_STATIC_EXPORT === "true",
  appVersion: packageJson.version,
  baseUrl: process.env.BASE_URL ?? "",
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? "https://pigina.com.vn/api",
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? "https://pigina.com.vn",
  nodeEnv: process.env.ENV ?? "",
};
