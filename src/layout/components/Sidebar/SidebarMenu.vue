<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
  >
    <SidebarItem
      v-for="item in routes"
      :route="item"
      :key="item.path"
    ></SidebarItem>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue'

const router = useRouter()

const routes = computed(() => {
  const filteredRoutes = filterRoutes(router.getRoutes())
  return generateMenus(filteredRoutes)
})
//默认激活
const route = useRoute()
console.log('route----', route)
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
