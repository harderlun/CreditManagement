<template>
  <el-container>
    <el-aside width="240px">
      <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <!--//没有二级导航的 -->
        <el-menu-item index="1">
          <span slot="title"><router-link to="/home">首页</router-link></span>
        </el-menu-item>

        <!--	//有二级导航的 -->
        <el-submenu index="2">
          <template slot="title">
            <span>贷款管理</span>
          </template>
          <el-menu-item index="2-1">
            <router-link to='/loan-input/index'>贷款申请</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>申请管理</span>
          </template>
          <el-menu-item index="3-1">
            <router-link to="/application-manage/index">
              申请列表
            </router-link>
          </el-menu-item>
        </el-submenu>
        <!-- 审批 -->
        <el-submenu index="4">
          <template slot="title">
            <span>贷款审批</span>
          </template>
          <el-menu-item index="4-1">
            <router-link to='/loan-approve/first'>初审</router-link>
          </el-menu-item>
          <el-menu-item index="4-2">
            <router-link to='/loan-approve/end'>终审</router-link>
          </el-menu-item>
        </el-submenu>
        <!-- 合同管理 -->
        <el-submenu index="5">
          <template slot="title">
            <span>合同管理</span>
          </template>
          <el-menu-item index="5-1">
            <router-link to="/contract-manage/index">
              合同列表
            </router-link>
          </el-menu-item>
        </el-submenu>
        <!-- 权限管理 -->
        <el-submenu index="6">
          <template slot="title">
            <span>权限管理</span>
          </template>
          <el-menu-item index="6-1">
            <router-link to='/permission/create'>创建管理员</router-link>
          </el-menu-item>
          <el-menu-item index="6-2">
            <router-link to='/permission/list'>列表展示</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>

    </el-aside>
    <el-container>
      <el-header>
        <!--//左侧面包屑-->
        <div class="left">
          <Breadcrumb />
        </div>
        <!--//右侧用户名-->
        <div class="right">
          <!--// //下拉菜单-->
          <el-dropdown @command="doCommand">

            <span class="el-dropdown-link"> admin </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>

          </el-dropdown>
        </div>
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
import { logout } from "@/apis/user"

export default {
  components: {
    Breadcrumb
  },
  methods: {
    async doCommand (e) {
      if (e === "logout") {
        let res = await logout()
        if (res.data.code === 603) {
          localStorage.clear()
        }
      }
    }
  },
}
</script>

<style scoped>
a:link {
  text-decoration: none;
  color: #fff;
}

/* 状态二: 已经访问过的链接 */
a:visited {
  text-decoration: none;
  color: #fff;
}

/* 状态三: 鼠标划过(停留)的链接(默认红色) */
a:hover {
  text-decoration: none;
  color: #fff;
}
/* 状态四: 被点击的链接 */
a:active {
  text-decoration: none;
  color: #fff;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-container {
  height: 100%;
}
.el-menu-vertical-demo {
  border: none;
}
a:link {
  text-decoration: none;
  color: #fff;
}

/* 状态二: 已经访问过的链接 */
a:visited {
  text-decoration: none;
  color: #fff;
}

/* 状态三: 鼠标划过(停留)的链接(默认红色) */
a:hover {
  text-decoration: none;
  color: #fff;
}
/* 状态四: 被点击的链接 */
a:active {
  text-decoration: none;
  color: #fff;
}
.router-link-active {
  color: rgb(255, 208, 75) !important;
}
</style>