<template>
  <el-form
    :model="userInfo"
    :rules="rules2"
    ref="ruleForm2"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="email">
      <el-input type="text" v-model="userInfo.email" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="userInfo.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="login" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import { requestLogin } from "../api/api";
import {
  login,
  register,
  checkLoginFormValidity,
  checkRegisterFormValidity
} from "../graphql/admin";
import { updateUser } from "../store";
import { Loading } from "element-ui";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      loading: false,
      isSearchDialogVisible: false,
      isRegistering: false,
      isLoginFormVisible: false,
      globalSearchUserInput: "",
      logining: false,
      userInfo: {
        email: "1@qq.com",
        password: "123456"
      },

      rules2: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
          //{ validator: validaePass }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    async login() {
      const validity = checkLoginFormValidity(this.userInfo);
      if (!validity.valid) {
        this.$message.error(validity.message);
        return;
      }
      try {
        this.loading = true;
        const result = await login(this.userInfo.email, this.userInfo.password);

        this.$store.dispatch(updateUser, result.data.login);
        this.$notify({
          type: "success",
          title: "欢迎回来",
          message: `您现在以 ${this.$store.getters.usersName} 的身份登录。`
        });
        this.isLoginFormVisible = false;
        // sessionStorage.setItem('user', JSON.stringify(user));
          this.$router.push({ path: "/Table" });
      } catch (err) {
        // A temporary implementation. DON'T IMITATE.
        this.$notify({
          title: "登录失败"
        });
        console.error(JSON.parse(JSON.stringify(err)));
        if (!err.graphQLErrors)
          this.$message.error("我们暂时无法处理您的请求。");
        else
          this.$message.error(
            "您提供的用户名与密码并不匹配，因此我们无法认证您的身份。"
          );
      } finally {
        this.loading = false;
      }
    },
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            email: this.userInfo.email,
            password: this.userInfo.password
          };
          requestLogin(loginParams).then(data => {
            this.logining = false;
            //NProgress.done();
            let { msg, code, user } = data;
            if (code !== 200) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              sessionStorage.setItem("user", JSON.stringify(user));
              this.$router.push({ path: "/Table" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>