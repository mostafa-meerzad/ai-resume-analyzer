# AI Resume Analyzer

## Project set up

run `npm crate viet@latest .` to initialize a vite project. `type your porject-name`, select framework `react`, select
variant `React Router v7`.

## Project file/folder Structure

at the root of the project there are configuration files, docker files and ide files. but we don't care about all these,
but what we care the most is `app` directory which is the core of our application. `routes.txt` is the react-router's
configuration file, `root.tsx` which is the main entrypoint of the application which contains the default layout and
loads all the necessary scripts, all the other pages are gonna be assed as children to this page. `app.css`  which is
the main css file for tailwind

## Change your app's name

Go to the `app/routes/home.tsx`

```tsx 
import type {Route} from "./+types/home";
import {Welcome} from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "New React Router App"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Home() {
    return <Welcome/>;
}

```

and change `title` to your preferred one

## Global Type Declaration File

Any type declared here is available everywhere in your project — no imports needed.

in the root of your project you create a `types` directory and inside it create `index.d.ts` file, and you just put all
your types there with no **export** or **import**, just plain types.

🚨 Gotchas:

- You must include the file in your tsconfig.json (but Vite usually does this automatically)

- Avoid clutter — use it for shared types like IUser, Job, Notification, etc., but not for component-specific types (
  those should stay local)

✅ When to Use This

- Use global types/index.d.ts when:

- You want app-wide interfaces (like IUser, Job, APIError)

- You hate repeated imports for the same types

- You're working in a large project or team and want centralized type control

🤯 Final Thought
What you're seeing is a professional convention in modern TypeScript apps. Big projects often use this pattern to stay
clean and DRY.

Let me know if you want help writing your own global types or if you want to move some types from components into
index.d.ts!


## Make a SVG circle that fills up as the score goes high

### The Component

```jsx
const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);
  
  return (
          <div className="relative w-[100px] h-[100px]">
            <svg
                    height="100%"
                    width="100%"
                    viewBox="0 0 100 100"
                    className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                      cx="50"
                      cy="50"
                      r={normalizedRadius}
                      stroke="#e5e7eb"
                      strokeWidth={stroke}
                      fill="transparent"
              />
              {/* Partial circle with gradient */}
              <defs>
                <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF97AD" />
                  <stop offset="100%" stopColor="#5171FF" />
                </linearGradient>
              </defs>
              <circle
                      cx="50"
                      cy="50"
                      r={normalizedRadius}
                      stroke="url(#grad)"
                      strokeWidth={stroke}
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
              />
            </svg>

            {/* Score and issues */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-semibold text-sm">{`${score}/100`}</span>
            </div>
          </div>
  );
};

export default ScoreCircle;

```


### Explanation


What you built is a **radial progress circle** using SVG — and it's **already awesome**. It uses classic SVG stroke tricks + a gradient to show progress based on a score. Let me walk you through it, polish it slightly, and explain the magic behind it 👇

---

### 💡 What This Component Does

* Draws a circle.
* Uses the `stroke-dasharray` and `stroke-dashoffset` technique to visually show progress.
* Fills it with a **gradient** (beautiful touch).
* Rotates the SVG -90° so progress starts from the top (SVG default is right).

---

### 🧠 Breakdown of Key Concepts

| Concept                 | Explanation                                             |
| ----------------------- | ------------------------------------------------------- |
| `radius - stroke / 2`   | Keeps the stroke neatly inside the 100x100 SVG viewbox. |
| `circumference = 2πr`   | Needed to compute full length of the circle stroke.     |
| `strokeDasharray`       | Total visible length of the circle stroke.              |
| `strokeDashoffset`      | How much of the stroke is hidden — based on score.      |
| `rotate(-90deg)`        | Makes the progress start from top instead of right.     |
| `defs > linearGradient` | SVG magic for a colorful stroke 🎨                      |

---

### ✅ Polish Suggestions

1. **Remove accidental `a` in your code**
2. Use `React.FC` for type clarity (optional)
3. Clamp `score` between 0–100 to prevent overflow
4. Make it slightly more reusable with `size` or `color` props if needed (optional)

---

### ✨ Cleaned & Enhanced Version

```tsx
import React from "react";

interface ScoreCircleProps {
  score: number;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score = 75 }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  // Clamp score between 0 and 100
  const safeScore = Math.min(Math.max(score, 0), 100);
  const progress = safeScore / 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative w-[100px] h-[100px]">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF97AD" />
            <stop offset="100%" stopColor="#5171FF" />
          </linearGradient>
        </defs>

        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="url(#grad)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Score Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-semibold text-sm">{`${safeScore}/100`}</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
```

---

### 🌈 Bonus Ideas:

* Add a little **animation** using Framer Motion or Tailwind Animate plugin
* Make the gradient customizable via props
* Add a **label** under the score (e.g. “Performance”)

---

### ✅ TL;DR Note:

> This component visually represents a `score` from 0–100 using SVG strokes and a gradient. `strokeDasharray` defines the full length, and `strokeDashoffset` "hides" part of it depending on the score — creating a circular progress effect.

---

Let me know if you want a version with animation on mount, or want to make it dynamic with live data 💪
