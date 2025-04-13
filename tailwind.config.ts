
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Theme colors
				calm: {
					DEFAULT: '#4A90E2',
					light: '#70A7EB',
					dark: '#2B6FC2',
					foreground: '#FFFFFF',
				},
				midnight: {
					DEFAULT: '#222639',
					light: '#393C53',
					dark: '#121726',
					foreground: '#E0E1E6',
				},
				retro: {
					DEFAULT: '#2E8B57',
					light: '#3DAA68',
					dark: '#1E6B3C',
					foreground: '#F5F5DC',
				},
				neon: {
					DEFAULT: '#FF00FF',
					light: '#FF33FF',
					dark: '#CC00CC',
					foreground: '#F0F0FF',
				},
				forest: {
					DEFAULT: '#3A5741',
					light: '#4C6E54',
					dark: '#2A412F',
					foreground: '#E6EAE8',
				},
				pastel: {
					DEFAULT: '#FFB5C5',
					light: '#FFC1CF',
					dark: '#FF99B0',
					foreground: '#49484B',
				},
				minimal: {
					DEFAULT: '#F5F5F5',
					light: '#FFFFFF',
					dark: '#E5E5E5',
					foreground: '#222222',
				},
				// Model colors
				model1: '#4A90E2',
				model2: '#FF7043',
				model3: '#7E57C2',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						filter: 'brightness(1) blur(4px)'
					},
					'50%': { 
						opacity: '0.6',
						filter: 'brightness(1.3) blur(8px)'
					}
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				sparkle: {
					'0%, 100%': { opacity: '0' },
					'50%': { opacity: '1' }
				},
				rotate: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'sparkle': 'sparkle 1.5s ease-in-out infinite',
				'rotate': 'rotate 12s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
