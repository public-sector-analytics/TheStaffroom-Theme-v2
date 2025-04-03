import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "login-page-override",
  initialize() {
    withPluginApi("0.8.31", api => {
      api.modifyClass("route:login", {
        renderTemplate() {
          // This will render our custom login template
          this.render("login");
          
          // We need to add a delay to make sure the DOM is loaded before running our script
          setTimeout(() => {
            // In case our script in the template doesn't run, we'll run it here too
            const faqItems = document.querySelectorAll('.faq-item');
            if (faqItems.length > 0) {
              console.log("Initializing accordion from route initializer");
              
              // First hide all answers
              document.querySelectorAll('.faq-answer').forEach(answer => {
                answer.style.display = 'none';
              });
              
              // Then add click handlers to questions
              faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                
                if (question && answer) {
                  question.onclick = function() {
                    // Close all other answers
                    faqItems.forEach(otherItem => {
                      if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if (otherAnswer) otherAnswer.style.display = 'none';
                        if (otherToggle) otherToggle.textContent = '▼';
                      }
                    });
                    
                    // Toggle current answer
                    const toggle = item.querySelector('.faq-toggle');
                    if (answer.style.display === 'none') {
                      answer.style.display = 'block';
                      if (toggle) toggle.textContent = '▲';
                    } else {
                      answer.style.display = 'none';
                      if (toggle) toggle.textContent = '▼';
                    }
                  };
                }
              });
            }
          }, 1000);
        }
      });
    });
  }
}; 