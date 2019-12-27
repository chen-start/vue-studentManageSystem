<template>
  <div class="login">
    <el-form ref="form" label-width="80px">
      <el-form-item label="用户名：">
        <el-input v-model="username" />
      </el-form-item>
      <el-form-item label="密码：">
        <el-input type="password" v-model="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
export default {
    name: 'login',
    data(){
        return {
            username: 'admin',
            password: '0000'
        }
    },
    methods:{
        login(){
            let admin = {
                username: this.username,
                password: this.password
            };
            axios.post('/api/admin/getadmin', Qs.stringify(admin)).then(res => {
              localStorage.setItem('username', admin.username);
                this.$router.push('/home')
                this.$message({
                    type: 'success',
                    message: '登录成功'
                });
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '账号或密码错误!'
                })
            })
        }
    }
}
</script>

<style>

</style>