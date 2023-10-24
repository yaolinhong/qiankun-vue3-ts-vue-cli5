import "element-plus/dist/index.css";
import "./public-path";

const routerBase = `/${process.env?.APPNAME}`;

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // TODO store操作
  // 独立运行时，也注册一个名为global的store module
  // commonStore.globalRegister(store);
  // // 模拟登录后，存储用户信息到global module
  // const userInfo = { name: "我是独立运行时名字叫张三" }; // 假设登录后取到的用户信息
  // store.commit("global/setGlobalState", { user: userInfo });
  const { render } = await import("@/utils/loadRemote");
  render({
    container: window.document,
    routerBase,
    // router: createSubAppRouter(routerBase),
  });
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props: any) {
  console.log("[vue] props from main framework", props);

  // commonStore.globalRegister(store, props);
  const { render } = await import("@/utils/loadRemote");
  render(props);
}

export async function unmount() {
  // instance?.$destroy();
  // instance.$el.innerHTML = "";
  // instance = null;
  console.log("🚀 - unmount - instance:");
}
