<template>
  <el-container>
    <el-header class="header">
      <el-row class="row">
        <el-col :span="20">
          <img src="./assets/logo.svg" alt="logo" />
        </el-col>
        <el-col :span="4" class="right">
          <span class="user">{{ name }}</span>
          <el-button type="danger" v-if="show" size="small" @click="logout">注销</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-divider class="divider"></el-divider>
    <el-container>
      <el-aside style="height: calc(100vh - 60px - 1px)!important; width:200px;">
        <el-menu :collapse="false" default-active="1" class="menu">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">
              <router-link to="/home">主页</router-link>
            </span>
          </el-menu-item>
          <el-submenu index="2" :collapse="false">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-user"></i>
              <router-link to="/user">家长管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-view"></i>
              <router-link to="/role">角色管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-3">
              <i class="el-icon-house"></i>
              <router-link to="/power">权限管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-4">
              <i class="el-icon-setting"></i>
              <router-link to="/setting">系统设置</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">
              <router-link to="/student">学生管理</router-link>
            </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
import {mapState, mapMutations} from 'vuex'
export default {
  name: "app",
  data() {
    return {
      name: "",
      show: true,
    };
  },
  created() {
    this.getAdmin();
  },
  watch: {
    isLogin() {
      this.show = true;
      console.log(this.isLogin);
    }
  },
  computed: {
    ...mapState(['isLogin', 'admin']),
  },
  methods: {
    ...mapMutations(['change']),
    getAdmin() {
      this.show = this.isLogin;
      console.log(this.isLogin);
      console.log(this.show);
      this.show - true;
      this.name = this.admin;
      console.log('this.name', this.name)
    },
    logout() {
      axios
        .put("/api/admin/putadmin", { name })
        .then(res => {
          // console.log(res);
          // this.show = false;
          this.name = '';
          console.log(this.show);
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "注销成功"
          });
        })
        .catch(err => {
          // console.log(err)
          this.$message({
            type: "info",
            message: "注销失败"
          });
        });
    },
    setadmin() {
      console.log("111");
      if (this.isLogin) {
        return (this.show = true);
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-size: 14px;
  color: #303133;
}
a {
  color: #303133;
  text-decoration: none;
}
.header {
  padding: 0 !important;
}
.header .row {
  padding: 10px;
  padding-right: 15px;
}
.header .row .right {
  text-align: right;
}
.header .row .right .user {
  margin-right: 20px;
}
.divider {
  margin: 0 !important;
}
.menu {
  height: 100%;
}
.router-link-active {
  color: #409eff !important;
}
</style>
