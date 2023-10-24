<template>
  <div class="home">foo-子应用homeview</div>
  <el-input id="foo-input" v-model="inputV"></el-input>
  <div v-for="(item, index) in count" :key="index">插入大量dom</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let driverObj = null;
const initDriver = async () => {
  const { driver } = await import("main_share/driver");
  console.log("🚀 ~ file: HomeView.vue:13 ~ initDriver ~ driver:", driver);
  driverObj = driver({
    showProgess: true,
    steps: [
      {
        element: "#foo-input",
        popover: {
          title: "子应用远程加载",
          description: "基座应用提供的新手指引js",
          align: "start",
        },
      },
    ],
  });
  nextTick(() => {
    driverObj.drive();
  });
};
initDriver();
// const all = import("main_share").finally(() => {
//   console.log("all", all);
// });
const inputV = ref("");
const count = ref(0);
console.log("foo-homeview调用接口1");

onMounted(() => {
  console.log("here", driverObj);
  driverObj?.drive();
});
// setInterval(() => {
//   count.value += 2000;
// });
</script>
