<template>
  <div>
    <el-container>
      <el-aside width="160px">
        <side></side>
      </el-aside>
      <el-main>
        <transition name=".el-zoom-in-center">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import Side from './side.vue'
  export default{
      components:{
          Side
      }
  }
</script>
