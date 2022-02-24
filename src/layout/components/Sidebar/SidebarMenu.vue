<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :uniqueOpened="true"
    default-active="2"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 子集 menu 菜单 -->
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项 1</el-menu-item>
      <el-menu-item index="1-2">选项 2</el-menu-item>
    </el-submenu>
    <!-- 具体菜单项 -->
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <template #title>导航四</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'

const router = useRouter()
const routes = computed(() => {
  const FilterRouters = filterRouters(router.getRoutes())
  return generateMenus(FilterRouters)
})
console.log(JSON.stringify(routes.value))
</script>

<style lang="scss" scoped></style>
