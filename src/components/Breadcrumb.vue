<template>
  <el-breadcrumb separator="/">
    <!--第一个面包屑默认首页-->
    <el-breadcrumb-item>
      <router-link to="/home">首页</router-link>
    </el-breadcrumb-item>
    <!--第二个取路由route的页面栈matched的最后一个-->
    <el-breadcrumb-item v-if="route">
      {{ route }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

  computed: {
    route () {
      let matched = this.$route.matched
      return matched[matched.length - 1].meta.title !== '首页' ? matched[matched.length - 1].meta.title : ""
    }
  }
}
</script>

<style>
</style>