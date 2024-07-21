
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('https://img.freepik.com/free-vector/video-conferencing-concept-landing-page_52683-20715.jpg?t=st=1720877090~exp=1720880690~hmac=08b96ad94681391f58743188ab3932f49d6776ebd5dd3d96aa1db9ecbbe79f48&w=740')",
      },
    },
  },
  plugins: [],
}