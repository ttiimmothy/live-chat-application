/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#3B82F6",
        "background-primary": "#FFFFFF",
        900: "#212121",
      },
      backgroundColor: {
        primary: "#3B82F6",
      },
    },
  },
  plugins: [],
};
