# AI Resume Analyzer

A smart application that analyzes your resume and provides feedback, tips, and ratings to help you land your dream job.

## Features

- 📄 Resume analysis with AI-powered feedback
- 📊 ATS compatibility scoring
- 💡 Personalized improvement suggestions
- 🔍 Job description matching
- 🌓 Dark mode support with theme toggle
- 🔒 User authentication
- 📱 Responsive design for all devices
- 🎉 TailwindCSS for styling

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This application uses [Tailwind CSS](https://tailwindcss.com/) for styling, including its dark mode feature. The dark mode implementation includes:

- Theme toggle button in the navbar
- Dark versions of background images
- Responsive dark mode styling for all components
- Theme persistence using localStorage

For more details about the dark mode implementation, see [DARK_MODE.md](./DARK_MODE.md).

---

Built with ❤️ by the AI Resume Analyzer team.
