import Vue from "vue";
import { ElementPlus } from "@xzui/components";
import VueRouter from "vue-router";
interface micoAppSubApp {
  getRoute: () => Array<RouteRecordRaw>;
}
declare global {
  interface Window {
    Vue: typeof Vue;
    __POWERED_BY_QIANKUN__: string;
    ElementPlus: typeof ElementPlus;
    VueRouter: typeof VueRouter;
    $microApps: Record<string, micoAppSubApp>;
  }
}
