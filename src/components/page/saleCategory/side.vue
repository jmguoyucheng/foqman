<template>
  <div id="side">
    <el-menu
      default-active="search"
      :default-openeds="['salecategory']"
      router>
      <!--:default-openeds=["1"]>-->
      <el-submenu index="salecategory">
        <template slot="title">
          <i class="el-icon-goods"></i>
          商品种类
        </template>
        <el-menu-item index="addsalecategory">添加商品种类</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
