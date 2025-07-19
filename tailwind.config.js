/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        kindsans: ["Kindsans-Regular", "sans-serif"],
        "kindsans-bold": ["Kindsans-Bold", "sans-serif"],
        "kindsans-semibold": ["Kindsans-SemiBold", "sans-serif"],
        "kindsans-light": ["Kindsans-Light", "sans-serif"],
        "kindsans-medium": ["Kindsans-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
}