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
          
          // Make sure the accordion functionality works
          setTimeout(() => {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
              const question = item.querySelector('.faq-question');
              const answer = item.querySelector('.faq-answer');
              
              if (answer) {
                answer.style.display = 'none';
              }
              
              if (question) {
                question.addEventListener('click', function() {
                  faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                      const otherAnswer = otherItem.querySelector('.faq-answer');
                      const otherToggle = otherItem.querySelector('.faq-toggle');
                      if (otherAnswer) otherAnswer.style.display = 'none';
                      if (otherToggle) otherToggle.innerHTML = '▼';
                    }
                  });
                  
                  const toggle = item.querySelector('.faq-toggle');
                  if (answer && answer.style.display === 'none') {
                    answer.style.display = 'block';
                    if (toggle) toggle.innerHTML = '▲';
                  } else if (answer) {
                    answer.style.display = 'none';
                    if (toggle) toggle.innerHTML = '▼';
                  }
                });
              }
            });
          }, 1000);
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