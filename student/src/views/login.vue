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
        <el-button type="primary" @click="open">注册</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="注册" :visible.sync="dialogFormVisible" class="form">
      <el-form>
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" class="openform" /> 
        </el-form-item>
        <el-form-item label="账号:" :label-width="formLabelWidth">
          <el-input v-model="form.account" class="openform" /> 
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input v-model="form.password" class="openform" /> 
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import {mapState, mapMutations} from 'vuex';
export default {
  name: "login",
  data() {
    return {
      username: "1111",
      password: "1111",
      form: [],
      dialogFormVisible: false,
      formLabelWidth: '120px'
    };
  },
  methods: {
    ...mapMutations(['setAdmin', 'setIsLogin']),
    login() {
      let admin = {
        account: this.username,
        password: this.password
      };
      axios
        .post("/api/admin/getadmin", Qs.stringify(admin))
        .then(res => {
          this.setAdmin(this.username);
          this.setIsLogin();
          // console.log(res);
          this.$router.push("/home");
          this.$message({
            type: "success",
            message: "登录成功"
          });
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "账号或密码错误!"
          });
        });
    },
    open(){
      this.dialogFormVisible = true;
    },
    register(){
      let registerForm = this.form;
      console.log(registerForm)
      axios.post('/api/login/register', {
        account: this.form.account,
        password: this.form.password,
        nickname: this.form.nickname
      }).then(res => {
        this.dialogFormVisible = false;
        console.log(res);
        let data = res.data;
        if(data.code === 201){
          return this.$message({
            type: 'info',
            message: '账号或密码不能为空'
          })
        }
        this.$message({
          type: 'success',
          message: '注册成功'
        })
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '注册失败'
        })
      })
    }
  }
};
</script>

<style>
.form{
  width: 1000px;
}
.form .openform{
  width: 70%;
  margin-right: 50px;
}
</style>