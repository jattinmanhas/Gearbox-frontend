import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{tsx,mdx}',
    './components/**/*.tsx',
    './providers/**/*.tsx',
    './layouts/**/*.tsx',
    './app/**/*.tsx',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

      },
      colors : {
        "card-background" : '#212121',
      }
    },
  },
  plugins: [],
};
export default config;
