<template>
  <div class="home">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 我的行程
        </span>
        我的行程
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 我的信息
        </span>
        我的信息
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 任务
        </span>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今天任务</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="task in tasks" :key="task.id" class="text item">
            {{ task.id + ' ' + task.thing }}
            <el-button
              style="float: right;padding: 3px 0;margin-left:5px;"
              type="text"
              @click="deleted"
            >删除</el-button>
            <el-button
              style="float: right;padding: 3px 0;"
              type="text"
              @click="complete(task._id)"
            >完成</el-button>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定完成此条任务吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="last">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      tasks: [],
      dialogVisible: false,
      id: ""
    };
  },
  created() {
    this.getmine();
  },
  methods: {
    getmine() {
      console.log("000000");
      axios
        .get("/api/mine/getmine")
        .then(res => {
          console.log("1111");
          console.log(res);
          this.tasks = res.data.result;
        })
        .catch(err => {
          console.log("2222");
          console.log(err);
        });
    },
    complete(ev) {
      console.log(ev);
      this.id = ev;
      this.dialogVisible = true;
    },
    deleted() {},
    last() {
      console.log(this.id);
      let _id = this.id;
      axios
        .delete("/api/mine/deletemine", { data: { _id } })
        .then(res => {
          console.log(_id)
          this.$message({
            type: 'success',
            message: `完成成功`
          })
          this.dialogVisible = false;
        })
        .catch(err => {
          console.log(_id)
          console.log(err);
          this.$message({
            type: "info",
            message: `完成错误`
          });
          this.dialogVisible = false;
        });
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>