<template>
  <page-layout :avatar="currUser.avatar">
    <template>
      <a-row style="margin: 0 -12px">
        <a-col
          style="padding: 0 12px"
          :xl="15"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24"
        >
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px"
            :bordered="false"
            :title="$t('operationdata')"
            :body-style="{ padding: 0 }"
          >
            <div>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="今日报修" :content="TodayOrder" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="本周报修" :content="ThisWeek" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="本月报修" :content="ThisMonth" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="总技术员" :content="ALLStaffs" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="总用户数" :content="AllUsers" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="总订单数" :content="TotalOrder" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="总问答数" :content="TotalQuestion" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="总会员数" :content="TotalVips" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="总反馈数" :content="TotalFeedback" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="总管理数" :content="ALLStaffs" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="全局年份" :content="year" />
                </a-card>
              </a-card-grid>
              <a-card-grid>
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <head-info title="全局配额" content="56" />
                </a-card>
              </a-card-grid>
            </div>
          </a-card>
          
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="9"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24"
        >
          <a-card
            :title="$t('access')"
            style="margin-bottom: 24px"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div class="item-group">
              <a @click="toSH">问答审核</a>
              <a @click="toYH">用户管理</a>
              <a @click="toDD">订单管理</a>
            </div>
          </a-card>
          <a-card
            :loading="loading"
            :title="$t('globalsetting')"
            :bordered="false"
          >
            <div class="setting">配额状态:</div>
            <div class="setting">
              全局开关: &nbsp;
              <a-select
                default-value="on"
                style="width: 120px"
                @change="changeOnOff"
              >
                <a-select-option value="on"> 全部开启 </a-select-option>
                <a-select-option value="off"> 全部关闭 </a-select-option>
              </a-select>
            </div>
            <div class="setting">
              时间年份：
              <a-select
                :value="year"
                style="width: 120px"
                @change="changeYear"
              >
                <a-select-option
                  :value="item"
                  :key="i"
                  v-for="(item, i) in yearList"
                >
                  {{ item }}
                </a-select-option>
              </a-select>
            </div>
            <div class="setting">
              每日限制：
              <a-input-number
                id="inputNumber"
                v-model="limit"
                :min="0"
                @pressEnter="pressLimit"
              />
              tip: 确认后请回车
            </div>
            <div class="setting">
              每日游客：
              <a-input-number
                id="inputNumber"
                v-model="visitor"
                :min="0"
                @pressEnter="pressVisitor"
              />
              tip: 确认后请回车
            </div>
          </a-card>
        </a-col>
      </a-row>
    </template>
  </page-layout>
</template>

<script>
import HeadInfo from "@/components/tool/HeadInfo";
import PageLayout from "@/layouts/PageLayout";
import { adminDashData } from "@/services/dataSource";
import { staffYear } from "@/services/edituser";
import { mapState } from "vuex";
// import func from "vue-editor-bridge";
// import { request, METHOD } from "@/utils/request";

export default {
  name: "WorkPlace",
  components: { PageLayout, HeadInfo },
  i18n: require("./i18n"),
  data() {
    return {
      TotalVips: 0,
      TotalFeedback: 0,
      ALLStaffs: 0,
      TotalAdmin: 0,
      ThisWeek: 0,
      ThisMonth: 0,
      AllUsers: 0,
      TodayOrder: 0,
      TotalOrder: 0,
      TotalQuestion: 0,
      globalData: {},
      globalYear: "",
      yearList: [],
      year:2022,
      globalOnOff: true,
      limit:0,
      visitor:0,
    };
  },
  computed: {
    ...mapState("account", { currUser: "user" }),
    ...mapState("setting", ["lang"]),
  },
  created() {
    let nowdate = new Date();
    this.year = nowdate.getFullYear();
  },
  mounted() {
    let nowdate = new Date();
    let year = nowdate.getFullYear();
    year++;
    console.log(year);
    for (let i = 0; i < 5; i++) {
      this.yearList.push(year--);
      console.log("第" + i + "个" + this.yearList[i]);
    }
    adminDashData(new Date().getFullYear()).then((res) => {
      let data = res.data.data
      this.ALLStaffs = data.ALLStaffs
      this.TotalVips = data.TotalFeedback
      this.TotalFeedback = data.TotalFeedback
      this.TotalAdmin = data.TotalAdmin
      this.ThisWeek = data.ThisWeek
      this.ThisMonth = data.ThisMonth
      this.AllUsers = data.AllUsers
      this.TodayOrder = data.TodayOrder
      this.TotalQuestion = data.TotalQuestion
    });
  },
  methods:{
    changeOnOff(){

    },
    toSH(){
      this.$router.push({
        name: "问答审批",
        // params: record,
      });
    },
    toYH(){
      this.$router.push({
        name: "普通用户",
        // params: record,
      });
    },
    toDD(){
      this.$router.push({
        name: "订单列表",
        // params: record,
      });
    },
    changeYear(year){
      console.log(year);
      this.year = year;
      staffYear(year).then((res)=>{
        if(res.status == 200){
          this.$message.success("已成功将技术员年份设置为"+year)
        }
      })
    },
    pressLimit(){
      console.log("blurLimitblurLimitblurLimitblurLimit",this.limit);
    },
    pressVisitor(){
      console.log("blurLimitblurLimitblurLimitblurLimit",this.visitor);
    }
  }
};
</script>

<style lang="less">
@import "index";
.setting {
  height: 50px;
}
</style>
