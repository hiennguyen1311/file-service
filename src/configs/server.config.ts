export const corsConfigs = {
  origin: [
    'http://localhost:3001',
    'http://217.15.163.43:3001',
    'https://nguyenphuchien.com',
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
    'Access-Control-Allow-headers',
    'Access-Control-Max-Age',
    'Origin',
    'X-Requested-With',
    'Accept',
    'X-Forwarded-for',
    'From-Url',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

export const serverConfigs = {
  cors: corsConfigs,
};
