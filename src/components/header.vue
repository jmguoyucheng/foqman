<template>
  <el-row class="header">
    <!-- 左边logo -->
    <el-col :span="4" class="logo">
      <img @click="tohome" src="../assets/logo.png" alt="">
    </el-col>
    <!-- 中间导航区域 -->
    <el-col class="main" :span="16">
      <el-menu
        :default-active="$route.path"
        class="menu"
        router
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#000">
        <!-- 循环写的路由，其中路由中有  hidden：true 的就不加入循环 -->
        <template
          v-for="route in $router.options.routes"
          v-if="!route.hidden">
          <!-- 循环没有children的路由 -->
          <el-menu-item
            :key="route.path"
            :index="route.path">
            <i :class="route.class"></i>
            {{ route.name }}


          </el-menu-item>
          <!-- 循环有children的路由 -->
          <!--<el-submenu v-else :index="route.path">-->
          <!--<template slot="title">{{ route.name }}</template>-->
          <!--<el-menu-item-->
          <!--v-for="child in route.children"-->
          <!--:index="child.path"-->
          <!--:key="child.path">-->
          <!--{{ child.name }}-->
          <!---->
          <!---->
          <!--</el-menu-item>-->
          <!--</el-submenu>-->
        </template>
      </el-menu>
    </el-col>
    <!-- 右边用户信息以及登陆注册 -->
    <el-col :span="4" class="user">
      <el-button-group v-if="!logined">
        <el-button @click="tologin" class="button" type="danger" size="small" round>登录</el-button>
        <el-button @click="tologout" class="button" type="success" size="small" round>退出</el-button>
        <!--<el-button @click="toregin" class="button" type="success" size="small" round>regin</el-button>-->
      </el-button-group>

      <div v-else>
        <el-dropdown>
          <img class="avatar" src="../assets/avatar.jpg" alt=""/>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>李小小</el-dropdown-item>
            <el-dropdown-item>我的工作台</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

  </el-row>
</template>
<script>
  export default {
    data(){
      return {
        logined: false
      }
    },
    methods: {
      handleSelect () {
//        console.log('菜单选择之后的回调操作')
      },
      tohome(){
        this.$router.push('/')
        console.log('home')
      },
      tologin(){
        this.$router.push('/login')
        console.log('login')
      },
      tologout(){
        window.sessionStorage.removeItem('username')
        window.sessionStorage.removeItem('password')
        this.$router.push('/')
        console.log('logout')
      },
      toregin(){
        this.$router.push('/regin')
        console.log('regin')
      }
    }
  }
</script>
<style scoped>
  .header {
    width: 100%;
    height: 60px;
    margin: 0;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 0 25px #666;
    z-index: 100;
  }

  .logo img {
    width: 60px;
    height: 60px;
    cursor: pointer;
  }

  .button {
    margin: 15px 0;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0;
    cursor: pointer;
  }
</style>
