<template>
  <div class=""></div>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!--      不可点击-->
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{
          item.meta.title
        }}</span>
        <!--        可点击-->
        <span v-else class="redirect" @click="onLinkClick(item)">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

//监听路由变化
const route = useRoute()
const router = useRouter()
//生成数组数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  //当前路由的标注化路由记录
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
  console.log(breadcrumbData.value)
}
const onLinkClick = (item) => {
  router.push(item.path)
}

const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }

  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }
}
</style>
