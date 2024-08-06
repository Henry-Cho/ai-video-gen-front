/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        ping: {
          '0%, 100%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #363570 0%, #020018 23%, #0E0C2C 79%, #363570 100%)',
      },
    },
  },
  variants: {
    extend: {
        display: ["group-hover"],
    },
},
  plugins: [],
};
