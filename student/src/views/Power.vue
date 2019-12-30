<template>
  <div class="power">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/power/processing-center">处理中心</router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">
          <router-link to="/power/my-news">我的消息</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <router-link to="/power/my-add">我的添加</router-link>
          </el-menu-item>
        <el-menu-item index="2-3">
          <router-link to="/power/call-mi">@我</router-link>
          </el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">联系人</template>
          <el-menu-item index="2-4-1">
            <router-link to="/power/primary-school">小学</router-link>
            </el-menu-item>
          <el-menu-item index="2-4-2">
            <router-link to="/power/junior-middle-school">初中</router-link>
            </el-menu-item>
          <el-menu-item index="2-4-3">
            <router-link to="/power/high-school">高中</router-link>
            </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">
        <router-link to="/power/message-center">消息中心</router-link>
        </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/power/order-management">订单管理</router-link>
        </el-menu-item>
    </el-menu>

    

    <router-view />
  </div>
</template>

<script>
export default {
  name: "power",
  data() {
    return {
      
    };
  },
  created() {
    
  },
  methods: {
    
  }
};
</script>