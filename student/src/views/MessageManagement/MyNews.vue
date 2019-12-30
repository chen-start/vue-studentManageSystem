<template>
  <div class="my-news">
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>工作</span>
            </div>
            <div v-for="(work, i) in works" :key="i" class="text item">{{ work.thing }}</div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>教学</span>
            </div>
            <div v-for="(teach, i) in teachs" :key="i" class="text item">{{ teach.thing }}</div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>家庭</span>
            </div>
            <div v-for="(family, i) in familys" :key="i" class="text item">{{ family.thing }}</div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>社区</span>
            </div>
            <div v-for="(community, i) in communitys" :key="i" class="text item">{{ community.thing }}</div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'mynews',
    data(){
        return {
            works: [],
            teachs: [],
            familys: [],
            communitys: []
        }
    },
    created(){
        this.get()
    },
    methods: {
        get(){
            axios.get('/api/power/getwork').then(res => {
                this.works = res.data.result;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '获取工作信息失败'
                })
            });

            axios.get('/api/power/getteach').then(res => {
                this.teachs = res.data.result;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '获取教学信息失败'
                })
            });

            axios.get('/api/power/getfamily').then(res => {
                this.familys = res.data.result;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '获取家庭信息失败'
                })
            });

            axios.get('/api/power/getcommunity').then(res => {
                this.communitys = res.data.result;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '获取社区信息失败'
                })
            })
        }
    }
};
</script>

<style scoped>
.box-card {
  height: 300px;
  background-color: #999;
}
</style>