# Kodigo Eleksyon 2025

## Project Overview

**Kodigo Eleksyon 2025** is a ballot builder application for the 2025 Philippine elections. The app allows voters to:

- Create personalized Kodigo ballots (voting guides) for specific cities and municipalities
- Select candidates for various positions (national and local)
- Preview and print their selections to use on election day
- Access national candidates (Senators and Party List) regardless of location

## Supported Locations

The app currently supports ballot builders for:

- Cainta, Rizal
- Cebu City
- Makati City
- Mandaluyong City
- Manila
- Marikina City
- Pasay City
- Pasig City
- Quezon City
- Samal, Bataan
- Taguig City
- Taytay, Rizal
- National candidates (Senators and Party List) — available to all users regardless of location

## Features

- **City-specific ballot builders**: Customized for various Philippine cities
- **Candidate selection**: Easy-to-use interface for selecting candidates by position
- **Ballot preview**: Generate a printable ballot with selected candidates
- **Progress tracking**: Visual indicators of ballot completion
- **Responsive design**: Works seamlessly on mobile devices and desktops
- **Accessibility**: Screen reader support and keyboard navigation
- **Data persistence**: Local storage for saving ballot selections
- **Print optimization**: Dedicated print styles for ballot output
- **Election results**: View and track election results
- **Back to top**: Easy navigation for long ballot lists
- **Analytics**: Anonymous usage tracking to improve user experience
- **Privacy-focused**: No personal data collection
- **SEO optimized**: With sitemap and proper meta tags
- **Progressive Web App (PWA)**: Installable on mobile devices

## Tech Stack

This project is built with:

- **Vite**: For fast development and optimized builds
- **TypeScript**: For type safety and better developer experience
- **React**: UI library for building component-based interfaces
- **React Router**: For navigation between pages
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Reusable component library built on Radix UI
- **Bun**: JavaScript runtime and package manager
- **PostCSS**: For CSS processing and optimization
- **ESLint**: For code quality and consistency
- **Web Analytics**: For anonymous usage tracking and improvements

## Project Setup

To run this project locally:

```sh
# Clone the repository
git clone https://github.com/JHNLWHD/kodigoeleksyon2025.git

# Navigate to the project directory
cd kodigoeleksyon2025

# Install dependencies
bun install

# Start the development server
bun dev
```

## Deployment

The app is deployed on Netlify as a Single Page Application (SPA). To deploy:

```sh
# Build the project
bun run build

# The build output will be in the dist/ directory
```

You can deploy to Netlify through:
1. Connecting your GitHub repository to Netlify
2. Setting the build command to `bun run build`
3. Setting the publish directory to `dist`
4. Ensuring the `_redirects` file is present in the public directory for proper SPA routing

The app will be automatically deployed on every push to the main branch.

## Contact

If you want a similar app for your city or have other inquiries, please email:
[aljhoenilw@gmail.com](mailto:aljhoenilw+kodigoeleksyon2025@gmail.com)

