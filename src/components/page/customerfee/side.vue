<template>
  <div id="side">
    <el-menu
      default-active="detail"
      :default-openeds="['customerfee']"
      router>
      <el-submenu index="customerfee">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          客户费用管理
        </template>
        <el-menu-item index="detail">客户费用明细</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
