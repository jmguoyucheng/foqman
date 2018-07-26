<template>
  <el-main>
    <el-form
      :model="LoginForm"
      ref="LoginForm"
      :rules="rule"
      label-width="0"
      class="login-form">
      <h3>用户登录系统</h3>

      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="LoginForm.username"
          placeholder="请输入用户名" >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="LoginForm.password"
          placeholder="请输入密码" >
        </el-input>
      </el-form-item>

      <el-form-item >
        <el-button
          type="danger"
          class="submitBtn"
          round
          @click.native.prevent="submit"
          :loading="logining">
          登录
        </el-button>
        <el-button
          type="primary"
          class="resetBtn"
          round
          @click.native.prevent="reset">
          重置
        </el-button>
        <hr>
        <p>还没有账号，马上去<span class="to" @click="toregin">注册</span></p>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  export default {
    // ....
    data () {
      return {
        LoginForm: {
          username: '',
          password: ''
        },
        logining: false,
        rule: {
          username: [
            {
              required: true,
              max: 14,
              min: 3,
              message: '用户名是必须的，长度为3-14位',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '密码是必须的！',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      // ...
      submit () {
        this.$refs.LoginForm.validate(valid => {
          if (valid) {
            this.logining = true
//            console.log('开始请求后台数据，验证返回之类的操作！')
            window.sessionStorage.setItem('username',this.LoginForm.username)
            window.sessionStorage.setItem('password',this.LoginForm.password)
          } else {
            console.log('submit err')
          }
        })
//        this.$store.dispatch('login')
        let redirect = decodeURIComponent(this.$route.query.redirect || '/customer');
        this.$router.push({
          path: redirect
        })
        console.log(this.$store.getters.logged)
      },
      reset () {
        this.$refs.LoginForm.resetFields()
      },
      toregin () {
        this.$router.push('/regin')
      }
    }
  }
</script>
<style scoped>
  .login-form {
    margin: 20px auto;
    width: 310px;
    background: #fff;
    box-shadow: 0 0 35px #B4BCCC;
    padding: 30px 30px 0 30px;
    border-radius: 25px;
  }
  .submitBtn {
    width: 65%;
  }
  .to {
    color: #67C23A;
    cursor: pointer;
  }
</style>
