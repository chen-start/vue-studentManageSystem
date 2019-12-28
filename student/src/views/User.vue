<template>
  <div class="user">
    <el-col :span='4'>
        <span>
            姓名：
        </span>
    </el-col>
    <el-col :span="16">
      <el-input placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" icon="el-icon-search">查询</el-button>
    </el-col>
  </div>
</template>