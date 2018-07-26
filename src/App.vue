<template>
  <div id="app">
    <el-container>
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-main>
        <transition name="el-zoom-in-center">
          <router-view></router-view>
        </transition>
      </el-main>
      <el-footer>
        <my-footer></my-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  // 导入组件
  import MyHeader from '@/components/header'

  import MyFooter from '@/components/footer'
  import ElMain from "../node_modules/element-ui/packages/main/src/main";
  export default {
    components: {
      ElMain, MyHeader,
      MyFooter
    }
  }
</script>

<style>
  .el-header, .el-footer {
    background-color: #eee;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    /*background-color: #D3DCE6;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 200px;*/
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
