# Dark Mode Implementation

This document explains the dark mode implementation in the AI Resume Analyzer application.

## Overview

The application now supports a dark theme that can be toggled via a button in the navbar. The implementation uses Tailwind CSS's dark mode feature with a class strategy, and includes:

- A theme context/provider for managing theme state
- Dark versions of background images
- Dark mode styling for all components
- Theme persistence using localStorage

## Implementation Details

### Theme Provider

The theme state is managed by a React context provider in `app/lib/theme.tsx`. This provider:

- Initializes the theme based on localStorage or user's system preference
- Provides a toggle function to switch between light and dark modes
- Updates the HTML document class and localStorage when the theme changes

### Dark Mode Toggle

A toggle button has been added to the navbar in `app/components/Navbar.tsx`. This button:

- Shows a moon icon in light mode and a sun icon in dark mode
- Calls the `toggleTheme` function from the theme context when clicked

### Background Images

Dark versions of background images are used when in dark mode:

- Home page: `bg-main.svg` → `bg-main-dark.svg`
- Auth page: `bg-auth.svg` → `bg-auth-dark.svg`
- Resume page: `bg-small.svg` → `bg-small-dark.svg`

### Component Styling

All components have been updated with dark mode variants using Tailwind's `dark:` prefix:

- Text colors are adjusted for better readability in dark mode
- Background colors use darker shades
- Icons are inverted when necessary
- Form elements have appropriate dark styling

## Usage

To toggle between light and dark modes, click the theme toggle button in the navbar (moon/sun icon).

The selected theme will be saved to localStorage and persisted across page reloads and sessions.

## Testing

A test script (`test-dark-mode.js`) is provided to verify the dark mode functionality. This script can be run in the browser console to:

- Test the theme toggle button
- Verify that the HTML document class is updated correctly
- Check if background images match the current theme

## Future Improvements

Potential improvements for the dark mode implementation:

- Add animation for smoother theme transitions
- Implement per-component theme preferences
- Add more theme options beyond just light and dark