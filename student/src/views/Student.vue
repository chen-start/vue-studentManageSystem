<template>
  <div class="student">
    <!-- 查询条件 -->
    <el-row type="flex" :gutter="10" align="middle">
      <el-col :span="2">查询条件：</el-col>
      <el-col :span="3">
        <el-select v-model="key" placeholder="请选择" @change="change()">
          <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key"></el-option>
        </el-select>
      </el-col>
      <el-col :span="num1">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="value"
          v-show="valueshow"
        ></el-input>
        <el-select placeholder="请选择" v-model="value" v-show="sexshow" style="width:100%">
          <el-option value>全部</el-option>
          <el-option value="男">男</el-option>
          <el-option value="女">女</el-option>
        </el-select>
        <el-input
          type="number"
          placeholder="请输入开始年龄"
          prefix-icon="el-icon-search"
          v-model="value"
          v-show="ageshow"
        ></el-input>
        <el-date-picker
          v-show="birthdayshow"
          v-model="value"
          type="date"
          placeholder="选择开始日期"
          style="width:100%;"
        ></el-date-picker>
      </el-col>
      <el-col :span="num2">
        <el-input
          type="number"
          placeholder="请输入结束年龄"
          prefix-icon="el-icon-search"
          v-model="value2"
          v-show="ageshow"
        ></el-input>
        <el-date-picker
          v-show="birthdayshow"
          v-model="value2"
          type="date"
          placeholder="选择结束日期"
          style="width:100%;"
        ></el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" icon="el-icon-search" @click="getStudents(currentPage)">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="add()">添加</el-button>
      </el-col>
    </el-row>
    <!-- 数据列表 -->
    <el-row>
      <el-table :data="students" class="table" height="470" @select="select" @select-all="select">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="sno" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column label="出生日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.birthday | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="edit(scope.row._id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="4">
        <el-button type="danger" size="medium" @click="deleteMore()">批量删除</el-button>
      </el-col>
      <el-col :span="20" style="text-align:right;">
        <el-pagination
          layout="prev, pager, next"
          :current-page="currentPage"
          :total="total"
          @current-change="pageChange($event)"
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 编辑和添加 -->
    <el-dialog :title="title" :visible.sync="dialogVisible">
      <el-form :model="postForm" label-width="80px">
        <el-form-item label="学号">
          <el-input type="number" v-model="postForm.sno"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="postForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="postForm.sex" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input type="number" v-model="postForm.age"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="postForm.birthday"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postAddEdit()">保存</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
// qs不需要单独安装，安装axios时，qs已经补安装上，直接导入
import Qs from "qs";
export default {
  name: "student",
  data() {
    return {
      key: "name",
      options: [
        { key: "sno", label: "学号" },
        { key: "name", label: "名称" },
        { key: "sex", label: "性别" },
        { key: "age", label: "年龄" },
        { key: "birthday", label: "出生日期" }
      ],
      value: "",
      value2: "",
      students: [],
      total: 0,
      currentPage: 1,
      valueshow: true,
      sexshow: false,
      ageshow: false,
      birthdayshow: false,
      num1: 14,
      num2: 0,
      // 对话框是否显示。
      dialogVisible: false,
      postForm: { sno: "", name: "", sex: "", age: "", birthday: "" },
      editFlag: false, // 是否编辑
      title: "添加学生",
      // 批量删除的id
      ids: []
    };
  },
  created() {
    this.getStudents(this.currentPage);
  },
  methods: {
    getStudents(currentPage) {
      var data = {
        params: { key: this.key, value: this.value, value2: this.value2 }
      };
      axios.get(`/api/getStudent/${currentPage}`, data).then(res => {
        this.students = res.data.students;
        this.total = res.data.total;
        this.currentPage = res.data.page;
      });
    },
    change() {
      this.value = "";
      this.value2 = "";
      if (this.key === "age") {
        this.valueshow = false;
        this.ageshow = true;
        this.birthdayshow = false;
        this.sexshow = false;
        this.num1 = 7;
        this.num2 = 7;
      } else if (this.key === "birthday") {
        this.valueshow = false;
        this.ageshow = false;
        this.birthdayshow = true;
        this.sexshow = false;
        this.num1 = 7;
        this.num2 = 7;
      } else if (this.key === "sex") {
        this.valueshow = false;
        this.ageshow = false;
        this.birthdayshow = false;
        this.sexshow = true;
        this.num1 = 14;
        this.num2 = 0;
      } else {
        this.valueshow = true;
        this.ageshow = false;
        this.birthdayshow = false;
        this.sexshow = false;
        this.num1 = 14;
        this.num2 = 0;
      }
    },
    remove(id) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios.delete("/api/deleteStudent", { data: { id } }).then(res => {
            this.getStudents();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    pageChange(currentPage) {
      this.currentPage = currentPage;
      this.getStudents(this.currentPage);
    },
    add() {
      // 视图显示
      this.dialogVisible = true;
      // 编辑状态是添加
      this.editFlag = false;
      // 标题
      this.title = "添加学生";
      // 数据清空
      this.postForm = { sno: "", name: "", sex: "", age: "", birthday: "" };
    },
    edit(id) {
      this.dialogVisible = true;
      this.title = "编辑学生";
      this.editFlag = true;
      // 请求一个接口得到一个学生信息。
      axios.get(`/api/getOneStudent/${id}`).then(res => {
        if (res.data.code !== 200) {
          this.$message({ type: "info", message: res.data.message });
          return;
        }
        this.postForm = res.data.student;
        this.postForm.id = res.data.student._id;
        delete this.postForm._id; // 删除一个对象中的某个属性
        // console.log(this.postForm)
      });
    },
    postAddEdit() {
      /*
      if (this.editFlag) { // 编辑
        // axios.js要发起post，put请求时，传递的数据data无法直接在后台被解析，req.body.xxx获取不到。
        // 要想被解析，需要使用qs模块（QueryString）序列化成字符串。
        axios.put("/api/putStudent", Qs.stringify(this.postForm)).then(res => {
          if (res.data.code !== 200) {
            this.$message({ type: "info", message: res.data.message });
            return;
          }
          this.$message({ type: "info", message: "保存成功！" });
          this.dialogVisible = false;
          this.getStudents(this.currentPage);
        });
        return;
      }
      // 添加 
      axios.post("/api/postStudent", Qs.stringify(this.postForm)).then(res => {
        if (res.data.code !== 200) {
          this.$message({ type: "info", message: res.data.message });
          return;
        }
        this.$message({ type: "info", message: "保存成功！" });
        this.dialogVisible = false;
        this.getStudents(this.currentPage);
      });
      */
      // 注意：使用如下代码时，需要把后台的putStudent接口改成put请求。
      var url = this.editFlag ? "/api/putStudent" : "/api/postStudent";
      axios.post(url, Qs.stringify(this.postForm)).then(res => {
        if (res.data.code !== 200) {
          this.$message({ type: "info", message: res.data.message });
          return;
        }
        this.$message({ type: "info", message: "保存成功！" });
        this.dialogVisible = false;
        this.getStudents(this.currentPage);
      });
    },
    select(selection) {
      this.ids = [];
      selection.forEach(v => {
        if (this.ids.indexOf(v._id) === -1) {
          this.ids.push(v._id);
        }
      });
    },
    deleteMore() {
      if(this.ids.length === 0){
        this.$message({ type: "info", message: "请先选择要删除的数据!" });
        return;
      }
      axios
        .delete("/api/deleteMoreStudent", { data: { ids: this.ids } })
        .then(res => {
          if (res.data.code !== 200) {
            this.$message({ type: "info", message: res.data.message });
            return;
          }
          this.getStudents();
          this.$message({
            type: "success",
            message: "批量删除成功!"
          });
        });
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-top: 20px;
}
</style>