export interface AppConfig {
  app: {
    isProduction: boolean;
  };
  file: {
    maxFileSize: number;
  };
  storage: {
    path: string;
    url: string;
    folder: string;
    destination: string;
  };
}
