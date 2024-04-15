/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'Thunderstorm': "url('thunder.jpg')",
        'Rain': "url('rain1.jpg')",
        'Drizzle': "url('drizzle.jpg')",
        'Snow': "url('snow.jpg')",
        'Atmosphere': "url('atmosphere.jpg')",
        'Clear': "url('clearSky.jpg')",
        'Clouds': "url('cloudy.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
}

