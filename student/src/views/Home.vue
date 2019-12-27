<template>
  <div class="home">
    <el-tabs type="border-card" style="height: 500px;">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 我的信息
        </span>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我的信息</span>
          </div>
          <div class="text item">序号：{{ infor.sno }}</div>
          <div class="text item">职位：{{ infor.position }}</div>
          <div class="text item">姓名：{{ infor.name }}</div>
          <div class="text item">年龄：{{ infor.age }}</div>
          <div class="text item">性别：{{ infor.sex }}</div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 我的行程
        </span>
        <el-collapse v-for="(trip,i) in trips" :key="i">
          <el-collapse-item name="1">
            <template slot="title">
              {{trip.title}}
              <i class="el-icon-check" v-if="trip.token"></i>
            </template>
            <h3>{{ trip.content }}</h3>
            <el-button type="success" @click="tripfinally(trip._id)">完成</el-button>
          </el-collapse-item>
        </el-collapse>
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
          <div v-for="(task,i) in tasks" :key="i+1" class="text item">
            <div>
              {{ i+1 + " " + task.thing }}
              <i
                class="el-icon-check"
                v-if="task.token?task.token:false"
              ></i>
            </div>
            <div>
              <el-button
                style="float: right;padding: 3px 0;margin-left:5px;"
                type="text"
                @click="deleted(task._id)"
              >删除</el-button>
              <el-button
                style="float: right;padding: 3px 0;"
                type="text"
                @click="complete(task._id)"
              >完成</el-button>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除此条任务吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="last">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  name: "home",
  data() {
    return {
      tasks: [],
      dialogVisible: false,
      id: "",
      nu: [],
      taken: false,
      show: true,
      trips: [],
      infor: []
    };
  },
  created() {
    this.getmine();
    this.getTrip();
    this.getinfor();
  },
  methods: {
    getTrip() {
      axios
        .get("/api/trip/gettrip")
        .then(res => {
          // console.log(res)
          this.trips = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    tripfinally(ev) {
      console.log(ev);
      let id = ev;
      this.$confirm("确定这条任务完成了吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          axios
            .put("/api/trip/puttrip", { id })
            .then(res => {
              this.getTrip();
              console.log(res);
              this.$message({
                type: "success",
                message: "成功"
              });
            })
            .catch(err => {
              this.$message.error("失败");
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    getmine() {
      // console.log("000000");
      axios
        .get("/api/mine/getmine")
        .then(res => {
          // console.log("1111");
          // console.log(res);
          this.tasks = res.data.result;
        })
        .catch(err => {
          // console.log("2222");
          console.log(err);
          this.$message.error("失败");
        });
    },
    deleted(ev) {
      console.log(ev);
      this.id = ev;
      this.dialogVisible = true;
    },
    last() {
      console.log(this.id);
      let _id = this.id;
      axios
        .delete("/api/mine/deletemine", { data: { _id } })
        .then(res => {
          this.getmine();
          console.log(_id);
          this.$message({
            type: "success",
            message: `删除成功`
          });
          this.dialogVisible = false;
        })
        .catch(err => {
          console.log(_id);
          console.log(err);
          this.$message({
            type: "info",
            message: `删除错误`
          });
          this.dialogVisible = false;
        });
    },
    complete(ev) {
      console.log(ev);
      var id = ev;
      console.log(id);
      this.$confirm("是否确定完成此条任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios.put("/api/mine/putmine", { id }).then(res => {
            this.getmine();
            console.log("11111111");
            console.log(res);
            this.$message({
              type: "success",
              message: "完成成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消完成"
          });
        });
    },
    getinfor() {
      axios
        .get("/api/mine/getinfor")
        .then(res => {
          console.log(res);
          this.infor = res.data.result[0];
          console.log(this.infor);
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "未能获取您的信息"
          });
        });
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
  margin-bottom: 18px;
}

.item {
  display: flex;
  justify-content: space-between;
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