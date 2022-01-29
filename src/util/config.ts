interface ENV {
  readonly PORT: number;
}

let envVariable: ENV | null = null;

export function loadEnv(): ENV {
  if (!envVariable) {
    envVariable = {
      PORT: process.env.PUBLIC_PORT ? parseInt(process.env.PUBLIC_PORT) : 3000,
    };
  }
  return envVariable;
}
