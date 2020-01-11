<template>
  <div class="processing-center">
    <el-table :data="tableData" class="table" height="470">
      <el-table-column prop="date" label="时间" />
      <el-table-column prop="thing" label="事项" />
      <el-table-column prop="name" label="申请人" />
      <el-table-column prop="situation" label="完成情况" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.row._id)">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type='success' @click="dialogFormVisible = true">添加事情</el-button>

    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-input v-model="form.date"></el-input>
        </el-form-item>
        <el-form-item label="事项" :label-width="formLabelWidth">
          <el-input v-model="form.thing"></el-input>
        </el-form-item>
        <el-form-item label="申请人" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addThing">确 定</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "processing-center",
  data() {
    return {
      activeIndex: "",
      tableData: [],
      form: [],
      formLabelWidth: '120px',
      dialogFormVisible: false,
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      axios
        .get("/api/power/getinformation")
        .then(res => {
          this.tableData = res.data.result;
          this.code = false;
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "获取处理信息失败"
          });
        });
    },
    handleEdit(ev) {
      console.log(ev);
      let id = ev;
      this.$prompt("请输入'完成'以确定该操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if(value === '完成'){
            axios.put('/api/power/putinformation', {id, value}).then(res => {
              this.get();
              this.$message({
                type: 'success',
                message: '成功'
              })
            }).catch(err => {
              console.log(err)
              this.$message({
                type: 'info',
                message: '完成失败'
              })
            })
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    addThing(){ 
      this.dialogFormVisible = false;
      axios.post('/api/power/addThing', {
        date:this.form.date,
        thing: this.form.thing,
        name: this.form.name
      }).then(res => {
        console.log(res);
        if(res.data.code == 201){
          this.$message({
            type: 'info',
            message: '请输入过后再尝试添加！'
          })
        }else{
          this.get();
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '添加失败'
        })
      })
    }
  }
};
</script>