# AI Resume Analyzer

## Project set up

run `npm crate viet@latest .` to initialize a vite project. `type your porject-name`, select framework `react`, select variant `React Router v7`.

## Project file/folder Structure

at the root of the project there are configuration files, docker files and ide files. but we don't care about all these, but what we care the most is `app` directory which is the core of our application. `routes.txt` is the react-router's configuration file, `root.tsx` which is the main entrypoint of the application which contains the default layout and loads all the necessary scripts, all the other pages are gonna be assed as children to this page. `app.css`  which is the main css file for tailwind 


## Change your app's name

Go to the `app/routes/home.tsx` 

```tsx 
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}

```
and change `title` to your preferred one 
