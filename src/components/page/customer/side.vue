<template>
  <div id="side">
    <el-menu
      default-active="add"
      :default-openeds="['customer']"
      router>
      <!--:default-openeds=["1"]>-->
      <el-submenu index="customer">
        <template slot="title">
          <i class="el-icon-view"></i>
          客户管理
        </template>
        <!--<el-menu-item index="search">查询客户</el-menu-item>-->
        <el-menu-item index="add">添加客户</el-menu-item>
        <el-menu-item index="deleted">已删除客户</el-menu-item>
        <el-menu-item index="print">打印客户</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
