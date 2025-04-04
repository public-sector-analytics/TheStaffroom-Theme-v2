import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "login-page-setup",
  initialize() {
    withPluginApi("0.8.31", api => {
      api.onPageChange((url) => {
        if (url === "/login") {
          // Add 'login-required' class to body for easier CSS targeting
          document.body.classList.add('login-required');
          
          // Add class to main-outlet too
          const mainOutlet = document.getElementById('main-outlet');
          if (mainOutlet) {
            mainOutlet.classList.add('login-required');
          }
          
          // Ensure Font Awesome is loaded
          if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(link);
          }
        } else {
          // Remove classes when not on login page
          document.body.classList.remove('login-required');
          const mainOutlet = document.getElementById('main-outlet');
          if (mainOutlet) {
            mainOutlet.classList.remove('login-required');
          }
        }
      });
    });
  }
}; 
