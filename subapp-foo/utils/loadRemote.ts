import ElementPlus from "element-plus";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";

import zhCn from "element-plus/es/locale/lang/zh-cn";
import createSubAppRouter from "@/router";
import routes from "@/router/routes";

export function render(props: {
  container: Document;
  routerBase: string;
  // router: Router;
}) {
  console.log("🚀 - props:", props);
  console.log("🚀 - props:", props);
  const {
    container,
    routerBase,
    // , router
  } = props;
  // console.log("🚀 - routerssssson:", router);
  // const router = createSubAppRouter(routerBase);
  if (window.$microApps) {
    window.$microApps[routerBase] = {
      getRoute: () => {
        return routes;
      },
    };
  }
  // router.addRoute({ path: routerBase, name: "routerBase", children: routes });
  const router = createSubAppRouter(routerBase);
  console.log(
    '🚀 - { path: routerBase, name: "routerBase", children: routes }:',
    { path: routerBase, name: "routerBase", children: routes }
  );
  console.log("🚀 - render - router:", router, container);
  const store = createPinia();

  const app = createApp(App);
  app.use(router).use(store).use(ElementPlus, { locale: zhCn });
  console.log(
    '🚀 - container.querySelector("#app"):',
    container.querySelector("#app")
  );
  const mountContainer =
    container.querySelector("#app") || document.querySelector("#app") || "#app";
  app.mount(mountContainer);
}
