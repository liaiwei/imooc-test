<template>
  <el-menu
    :unique-opened="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!--    子集menu-->
    <el-sub-menu index="1">
      <template #title>
        <Location style="width: 1em; height: 1em; margin-right: 8px" />
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项一</el-menu-item>
      <el-menu-item index="1-2">选项二</el-menu-item>
    </el-sub-menu>
    <!--      具体菜单-->
    <el-menu-item index="2">
      <Location style="width: 1em; height: 1em; margin-right: 8px" />
      <template #title>导航4</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

console.log('router---', router.getRoutes())
</script>

<style lang="scss" scoped></style>
