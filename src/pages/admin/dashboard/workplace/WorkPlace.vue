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
                  <head-info title="全局配额" :content="limit" />
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
            <div class="setting">
              配额状态：
              <span :class="left > 10 ? 'green' : left > 0 ? 'yellow' : 'red'"
                >&nbsp;&nbsp;报修剩余量&nbsp;&nbsp;{{ left }}&nbsp;&nbsp;</span
              >
            </div>
            <div class="setting">
              全局开关: &nbsp;
              <a-select style="width: 120px" @change="changeOnOff">
                <a-select-option value="1"> 全部开启 </a-select-option>
                <a-select-option value="0"> 全部关闭 </a-select-option>
              </a-select>
            </div>
            <div class="setting">
              时间年份：
              <a-select :value="year" style="width: 120px" @change="changeYear">
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
          </a-card>
        </a-col>
      </a-row>
    </template>
  </page-layout>
</template>

<script>
import HeadInfo from "@/components/tool/HeadInfo";
import PageLayout from "@/layouts/PageLayout";
import { getStaffyear } from "@/services/dataSource";
import {
  getConfyear,
  adminDashData,
  getConflimit,
  setConfturn,
  setConflimit,
} from "@/services/conf";
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
      year: null,
      globalOnOff: true,
      limit: null,
      visitor: 0,
      left: 0,
    };
  },
  computed: {
    ...mapState("account", { currUser: "user" }),
    ...mapState("setting", ["lang"]),
  },
  created() {
    // let nowdate = new Date();
    // this.year = nowdate.getFullYear();
  },
  mounted() {
    // let nowdate = new Date();
    // let year = nowdate.getFullYear();
    // year++;
    // console.log(year);
    // for (let i = 0; i < 5; i++) {
    //   this.yearList.push(year--);
    //   console.log("第" + i + "个" + this.yearList[i]);
    // }
    getStaffyear().then((res) => {
      let yearL = res.data.data;
      yearL.map((item) => {
        console.log("itemitemitemitem", item);
        this.yearList.push(item.year);
      });
    });
    getConflimit().then((res) => {
      this.limit = res.data.data;
    });
    getConfyear().then((res) => {
      console.log(res);
      this.year = res.data.data;
      adminDashData(this.year).then((res) => {
        let data = res.data.data;
        this.ALLStaffs = data.ALLStaffs;
        this.TotalVips = data.TotalFeedback;
        this.TotalFeedback = data.TotalFeedback;
        this.TotalAdmin = data.TotalAdmin;
        this.ThisWeek = data.ThisWeek;
        this.ThisMonth = data.ThisMonth;
        this.AllUsers = data.AllUsers;
        this.TodayOrder = data.TodayOrder;
        this.TotalQuestion = data.TotalQuestion;
        this.left = this.limit - this.TodayOrder;
      });
    });
    console.log("this.year this.year this.year", this.year);
  },
  methods: {
    changeOnOff(turn) {
      setConfturn(turn).then((res) => {
        console.log("setConfturnsetConfturnsetConfturnsetConfturn", res);
        if (res.status == 200) {
          this.$message.success("系统开关状态改变成功！");
        }
      });
    },
    toSH() {
      this.$router.push({
        name: "问答审批",
        // params: record,
      });
    },
    toYH() {
      this.$router.push({
        name: "普通用户",
        // params: record,
      });
    },
    toDD() {
      this.$router.push({
        name: "订单列表",
        // params: record,
      });
    },
    changeYear(year) {
      console.log(year);
      this.year = year;
      let that = this;
      staffYear(year).then((res) => {
        if (res.status == 200) {
          this.$message.success("已成功将技术员年份设置为" + year);

          adminDashData(year).then((res) => {
            let data = res.data.data;
            that.ALLStaffs = data.ALLStaffs;
            that.TotalVips = data.TotalFeedback;
            that.TotalFeedback = data.TotalFeedback;
            that.TotalAdmin = data.TotalAdmin;
            that.ThisWeek = data.ThisWeek;
            that.ThisMonth = data.ThisMonth;
            that.AllUsers = data.AllUsers;
            that.TodayOrder = data.TodayOrder;
            that.TotalQuestion = data.TotalQuestion;
            that.left = that.limit - that.TodayOrder;
          });
        }
      });
    },
    pressLimit() {
      let that = this;
      console.log("blurLimitblurLimitblurLimitblurLimit", this.limit);
      setConflimit(that.limit).then((res) => {
        if (res.status == 200) {
          this.$message.success("已成功将报修限额设置为" + that.limit);
          getConflimit().then((res) => {
            that.left = res.data.data - that.TodayOrder;
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
@import "index";
.setting {
  height: 50px;
}
.green {
  background-color: #01ab34;
  color: white;
}
.yellow {
  background-color: #f9ad08;
  color: white;
}
.red {
  background-color: #e81010;
  color: white;
}
</style>
