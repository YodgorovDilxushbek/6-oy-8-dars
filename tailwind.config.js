/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind uchun fayllarni qamrab oling
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // DaisyUI-ni plugin sifatida qo'shing
};
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D3557", // Asosiy rang
        secondary: "#E63946", // Ikkinchi darajali rang
        accent: "#A8DADC", // Aksent
        neutral: "#F1FAEE", // Neytral fon
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1D3557",
          secondary: "#E63946",
          accent: "#A8DADC",
          neutral: "#F1FAEE",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
};
