// This is a simple test script to verify dark mode functionality
// Run this in the browser console to test dark mode toggle

function testDarkMode() {
  console.log('Testing dark mode functionality...');
  
  // Check if ThemeProvider is properly initialized
  const htmlElement = document.documentElement;
  const initialTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
  console.log(`Initial theme: ${initialTheme}`);
  
  // Find the theme toggle button in the navbar
  const toggleButton = document.querySelector('button[aria-label="Toggle theme"]');
  
  if (!toggleButton) {
    console.error('Theme toggle button not found in the navbar!');
    return;
  }
  
  console.log('Theme toggle button found in the navbar');
  
  // Test toggle functionality
  console.log('Clicking theme toggle button...');
  toggleButton.click();
  
  // Check if theme changed
  const newTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
  console.log(`Theme after toggle: ${newTheme}`);
  
  if (initialTheme === newTheme) {
    console.error('Theme did not change after clicking the toggle button!');
  } else {
    console.log('Theme toggle successful!');
  }
  
  // Check background images
  const mainElement = document.querySelector('main');
  if (mainElement) {
    const computedStyle = window.getComputedStyle(mainElement);
    const backgroundImage = computedStyle.backgroundImage;
    console.log(`Current background image: ${backgroundImage}`);
    
    if (newTheme === 'dark' && !backgroundImage.includes('-dark')) {
      console.warn('Dark theme is active but dark background image is not being used');
    } else if (newTheme === 'light' && backgroundImage.includes('-dark')) {
      console.warn('Light theme is active but dark background image is being used');
    } else {
      console.log('Background image matches current theme');
    }
  }
  
  // Toggle back to original theme
  console.log('Toggling back to original theme...');
  toggleButton.click();
  
  const finalTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
  console.log(`Final theme: ${finalTheme}`);
  
  if (finalTheme !== initialTheme) {
    console.error('Failed to toggle back to original theme!');
  } else {
    console.log('Successfully toggled back to original theme');
  }
  
  console.log('Dark mode testing complete');
}

// Run the test
testDarkMode();