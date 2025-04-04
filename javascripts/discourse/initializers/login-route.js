import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "login-page-override",
  initialize() {
    withPluginApi("0.8.31", api => {
      api.modifyClass("route:login", {
        renderTemplate() {
          // This will render our custom login template
          this.render("login");
        }
      });
    });
  }
}; 
