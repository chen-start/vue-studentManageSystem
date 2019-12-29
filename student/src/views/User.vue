<template>
  <div class="user">
    <el-row type="flex" align="middle" style="margin-bottom:10px;">
      <el-col :span="1">
        <span>姓名：</span>
      </el-col>
      <el-col :span="16" style="margin-right:10px;">
        <el-input placeholder="请输入内容" v-model="input" />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search" @click="getusers">查询</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="sno" label="序号" width="150" />
        <el-table-column prop="position" label="职位" width="150" />
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="age" label="年龄" width="150" />
        <el-table-column prop="sex" label="性别" width="150" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="remove(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 添加start -->
    <el-dialog title="添加页面" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="form.sno"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加end -->
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  name: "user",
  data() {
    return {
      tableData: [],
      input: "",
      form: [],
      dialogFormVisible: false,
      formLabelWidth: '70px'
    };
  },
  created() {
    this.getusers();
  },
  methods: {
    getusers() {
      let condition = this.input;
      console.log("condition", condition);
      console.log("11111", Qs.stringify(condition));
      axios
        .post("/api/user/getuser", { condition: condition })
        .then(res => {
          console.log(res);
          this.tableData = res.data.result;
        })
        .catch(err => {
          console.log("2222");
          this.$message({
            type: "info",
            message: "获取家长信息失败"
          });
        });
    },
    remove(ev) {
      console.log("1111");
      console.log(ev);
      let id = ev;
      console.log(id);
      axios
        .delete("/api/user/deleteuser", { data: { id } })
        .then(res => {
          console.log(res);
          this.getusers();
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "删除失败"
          });
        });
    },
    addUser() {
      axios
        .put("/api/user/putuser", Qs.stringify(this.form))
        .then(res => {
          console.log(res);
          this.getusers();
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "添加成功"
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "添加失败"
          });
        });
    }
  }
};
</script>

<style scoped>
</style>