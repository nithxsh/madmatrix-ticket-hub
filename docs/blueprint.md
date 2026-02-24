# **App Name**: MadMatrix Ticket Hub

## Core Features:

- Ticket Data Retrieval: Allows users to search for their registration details (Name, RegNo, Email) by entering their registered email, fetching data from the SheetDB API at https://sheetdb.io/api/v1/m4xm36b3182sq.
- Dynamic Ticket Display: Visually presents the fetched student's name in a bold, professional font, and their registration number, overlaid on the '/template.png' background image.
- QR Code Generation: Dynamically generates a QR code based on the student's registration number using https://api.qrserver.com/v1/create-qr-code/?data={regNo} and positions it appropriately on the displayed ticket.
- AI-Powered Cyberpunk Greeting: A generative AI tool that creates a unique, short, and thematic cyberpunk-style welcome message or quote for each ticket holder, subtly displayed on their digital ticket.
- High-Resolution Ticket Download: Enables users to download their personalized ticket as a high-resolution PNG image, leveraging the html2canvas library for accurate capture of the ticket container.
- Responsive & Themed UI: Implements a sleek 'Hacker/Cyberpunk' user interface with Tailwind CSS, ensuring optimal display and functionality across devices, especially Chrome on Android, as per project requirements.

## Style Guidelines:

- Our color palette draws inspiration from a 'Hacker/Cyberpunk' aesthetic, emphasizing digital energy and a futuristic vibe for MadMatrix '26. The primary color is a vibrant tech-green, matching the user's provided accent at '#22C55E'. The background is an almost-black shade with a subtle green tint, '#131711', to enhance visual depth while adhering to a dark scheme. An accent color, a vivid lime green '#C9E830', provides high contrast for call-to-action elements and highlights, bringing a punchy digital glow to the interface.
- Headline and body font: 'Inter' (sans-serif) for its clean, professional, and modern aesthetic, ensuring readability and a contemporary feel consistent with a tech event.
- Utilize clean, crisp vector icons from 'lucide-react' to maintain a modern and digital aesthetic, complementing the cyberpunk theme without adding visual clutter.
- The layout will be mobile-first and responsive, optimized specifically for Chrome on Android devices, with a clear focus on the ticket display. It features a minimalist search input, a prominent ticket container for easy viewing, and an easily accessible download button, reflecting efficiency and direct functionality.
- Subtle digital-style transitions and minimalist hover effects will be incorporated to enhance interactivity and reinforce the sleek 'Hacker/Cyberpunk' aesthetic without distracting from core functionality.