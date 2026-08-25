/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			brand: {
  				blue: {
  					DEFAULT: '#0888F8',
  					50: '#EBF5FE',
  					100: '#D7ECFE',
  					200: '#B0D9FD',
  					300: '#88C6FC',
  					400: '#61B3FB',
  					500: '#0888F8',
  					600: '#0774D3',
  					700: '#065FAE',
  					800: '#044B88',
  					900: '#033663',
  				},
  				gold: {
  					DEFAULT: '#F8B010',
  					50: '#FEF9EC',
  					100: '#FEF2D9',
  					200: '#FDE6B3',
  					300: '#FCD98C',
  					400: '#FBCC66',
  					500: '#F8B010',
  					600: '#D3960E',
  					700: '#AE7B0B',
  					800: '#886109',
  					900: '#634606',
  				},
  				sky: {
  					DEFAULT: '#78A0D0',
  					50: '#F4F7FB',
  					100: '#E9F0F7',
  					200: '#D4E1F0',
  					300: '#BED1E8',
  					400: '#A9C2E1',
  					500: '#78A0D0',
  					600: '#6688B1',
  					700: '#547092',
  					800: '#425872',
  					900: '#304053',
  				},
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};