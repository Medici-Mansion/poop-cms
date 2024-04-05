/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  endOfLine: "auto",
  semi: false,
  tabWidth: 4,
};

module.exports = config;
