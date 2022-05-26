<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/fylogo.png" />
        <span class="title">{{ systemName }}</span>
      </div>
      <div class="desc">四川大学飞扬俱乐部始终践行【服务川大，创新实践】</div>
    </div>
    <div class="login">
      <a-tabs
        size="large"
        :tabBarStyle="{ textAlign: 'center' }"
        style="padding: 0 2px"
      >
        <a-tab-pane tab="技术员登录" key="1">
          <a-form @submit="onSubmitStaff" :form="formStaff">
            <a-form-item>
              <a-input
                size="large"
                placeholder="请输入电话号码"
                v-decorator="[
                  'phoneNumber',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入电话号码',
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="mobile" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="16">
                  <a-input
                    size="large"
                    v-decorator="[
                      'inputVerifyCode',
                      {
                        rules: [
                          {
                            message: '请输入验证码',
                          },
                        ],
                      },
                    ]"
                  >
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                </a-col>
                <a-col :span="8" style="padding-left: 4px">
                  <a-button
                    style="width: 100%"
                    class="captcha-button"
                    size="large"
                    @click="getCode"
                    >获取验证码</a-button
                  >
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item>
              <a-button
                :loading="logging"
                style="width: 100%; margin-top: 24px"
                size="large"
                htmlType="submit"
                type="primary"
                >登录</a-button
              >
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="管理员登录" key="2">
          <a-form @submit="onSubmitAdmin" :form="formAdmin">
            <a-alert
              type="error"
              :closable="true"
              v-show="error"
              :message="error"
              showIcon
              style="margin-bottom: 24px"
            />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="admin"
                v-decorator="[
                  'name',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入账户名',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="888888"
                autocomplete="autocomplete"
                type="password"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                :loading="logging"
                style="width: 100%; margin-top: 24px"
                size="large"
                htmlType="submit"
                type="primary"
                >登录</a-button
              >
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import { login, getCode, loginStaff } from "@/services/user";
import { setAuthorization } from "@/utils/request";
import { loadRoutes } from "@/utils/routerUtil";
import { mapMutations } from "vuex";

// import { marked } from "marked";

export default {
  name: "Login",
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: "",
      formStaff: this.$form.createForm(this),
      formAdmin: this.$form.createForm(this),
      verifyCode: "",
      routerAdmin: [
        {
          router: "root",
          children: [
            { router: "dashboard", children: ["workplace", "analysis"] },
            { router: "QandA", children: ["examine", "QandAlist"] },
            {
              router: "user",
              children: [
                { router: "userlist", children: ["normal", "staff", "admin"] },
                "userdetail",
                "staffdetail",
              ],
            },
            { router: "order", children: ["lastestList", "orderlist"] },
          ],
        },
      ],
      routerStaff: [
        {
          router: "root",
          children: [
            { router: "personalinfo" },
            { router: "question" },
            { router: "answer" },
            {
              router: "history",
              children: ["personalorder", "personalpost"],
            },
          ],
        },
      ],
    };
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName;
    },
  },
  // mounted() {
  //   const roles = [
  //     {
  //       id: "admin",
  //     },
  //     {
  //       id: "staff",
  //     },
  //   ];
  //   const permissions = [
  //     {
  //       id: "admin",
  //     },
  //     {
  //       id: "staff",
  //     },
  //   ];
  //   console.log(permissions);
  //   this.$store.commit("account/setPermissions", permissions);
  //   this.$store.commit("account/setRoles", roles);
  // },
  methods: {
    ...mapMutations("account", ["setUser", "setPermissions", "setRoles"]),
    onSubmitAdmin(e) {
      e.preventDefault();
      this.formAdmin.validateFields((err) => {
        if (!err) {
          this.logging = true;
          const name = this.formAdmin.getFieldValue("name");
          const password = this.formAdmin.getFieldValue("password");
          login(name, password).then(this.afterLoginAdmin);
        }
      });
    },
    afterLoginAdmin(res) {
      console.log("afterLogin");
      console.log(res);
      this.logging = false;
      const loginRes = res.data;
      console.log(loginRes);
      if (loginRes.message == "登录成功") {
        console.log(loginRes);
        const user = loginRes.data[0];
        // const { permissions, roles } = loginRes.data[0];
        const roles = { id: "admin" };
        const permissions = { id: "admin" };
        this.setUser(user);
        this.setPermissions(permissions);
        this.setRoles(roles);
        setAuthorization({
          token: loginRes.data.token,
          expireAt: new Date(loginRes.data.expireAt),
        });
        loadRoutes(this.routerAdmin);
        this.$router.push("/dashboard/workplace");
        this.$message.success(loginRes.message, 3);
        // 获取路由配置
        // getRoutesConfig().then((result) => {
        //   console.log("resultresultresultresultresultresultresult",result);
        //   const routesConfig = result.data.data;
        //   console.log(routesConfig);
        // });
        // // getRoutesConfig().then(result => {
        // //   const routesConfig = result.data.data
        // //   loadRoutes(routesConfig)
        //   this.$router.push('/dashboard/workplace')
        //   this.$message.success(loginRes.message, 3)
        // // })
      } else {
        this.error = loginRes.message;
      }
    },

    // 获取验证码
    getCode() {
      this.formStaff.validateFields((err) => {
        if (!err) {
          const phoneNumber = this.formStaff.getFieldValue("phoneNumber");
          console.log(
            "phoneNumberphoneNumberphoneNumberphoneNumberphoneNumberphoneNumberphoneNumber",
            phoneNumber
          );
          getCode(phoneNumber).then((res) => {
            this.verifyCode = res.data.data.code;
            console.log(res.data.data.code);
          });
        }
      });
    },
    onSubmitStaff(e) {
      e.preventDefault();
      this.formStaff.validateFields((err) => {
        if (!err) {
          this.logging = true;
          const phoneNumber = this.formStaff.getFieldValue("phoneNumber");
          const inputVerifyCodeord =
            this.formStaff.getFieldValue("inputVerifyCode");
          if (this.verifyCode == inputVerifyCodeord) {
            loginStaff(phoneNumber).then(this.afterLoginStaff);
          } else {
            this.logging = false;
            this.$message.warn("验证码错误，请重试", 3);
          }
        }
      });
    },
    afterLoginStaff(res) {
      console.log(res);
      this.logging = false;
      const loginRes = res.data;
      if (loginRes.message == "登录成功") {
        console.log(loginRes);
        const user = loginRes.data.userInfo;
        // 权限没用上
        const roles = { id: "staff" };
        const permissions = { id: "staff" };
        this.setUser(user);
        this.setPermissions(permissions);
        this.setRoles(roles);
        setAuthorization({
          token: loginRes.data.token,
          expireAt: new Date(loginRes.data.expireAt),
        });
        // 设置异步路由
        loadRoutes(this.routerStaff);
        this.$router.push("/personalinfo");
        this.$message.success(loginRes.message, 3);
      } else {
        this.error = loginRes.message;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      a {
        text-decoration: none;
      }
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: @title-color;
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
          sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      // margin-bottom: 40px;
      margin-bottom: 20px;
    }
  }
  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
