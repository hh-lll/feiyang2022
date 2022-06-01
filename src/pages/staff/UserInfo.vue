<template>
  <div>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="基本信息"
    ></a-card>
    <div class="user-wrap">
      <detail-list v-if="!showEdit" size="small" col="1" slot="headerContent">
        <detail-list-item term="用户ID">{{ userData.userId }}</detail-list-item>
        <detail-list-item term="用户名">{{
          userData.username
        }}</detail-list-item>
        <detail-list-item term="QQ号">{{ userData.qqNumber }}</detail-list-item>
        <detail-list-item term="手机号">{{
          userData.phoneNumber
        }}</detail-list-item>
        <detail-list-item term="Email">{{ userData.email }}</detail-list-item>
        <detail-list-item term="是否为VIP">{{
          userData.isVip ? "是" : "否"
        }}</detail-list-item>
        <detail-list-item term="VIP号">{{
          userData.vipId ? this.userData.vipId : "无"
        }}</detail-list-item>
        <detail-list-item
          ><a-button type="primary" @click="callEdit"
            >编辑信息</a-button
          ></detail-list-item
        >
      </detail-list>
      <detail-list v-else size="small" col="1" slot="headerContent">
        <detail-list-item term="用户ID">{{ userData.userId }}</detail-list-item>
        <detail-list-item term="用户名"
          ><a-input
            v-model="userData.username"
            style="width: 120px"
            size="small"
          ></a-input
        ></detail-list-item>
        <detail-list-item term="QQ 号">
          <a-input
            v-model="userData.qqNumber"
            style="width: 120px"
            size="small"
          ></a-input
        ></detail-list-item>
        <detail-list-item term="手机号"
          ><a-input
            v-model="userData.phoneNumber"
            style="width: 120px"
            size="small"
          ></a-input
        ></detail-list-item>
        <detail-list-item term="E-mail"
          ><a-input
            v-model="userData.email"
            style="width: 120px"
            size="small"
          ></a-input
        ></detail-list-item>
        <detail-list-item term="是否为VIP">{{
          userData.isVip ? "是" : "否"
        }}</detail-list-item>
        <detail-list-item term="VIP号">{{
          userData.vipId ? this.userData.vipId : "无"
        }}</detail-list-item>
        <detail-list-item
          ><a-button type="primary" @click="submitEdit"
            >保存信息</a-button
          ></detail-list-item
        >
      </detail-list>

      <detail-list size="small" col="1" slot="headerContent">
        <detail-list-item term="是否为技术员">{{
          userData.isStaff ? "是" : "否"
        }}</detail-list-item>
        <detail-list-item term="创建时间">{{
          userData.createTime
        }}</detail-list-item>
      </detail-list>
    </div>
        <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="技术员相关信息"
    ></a-card>
    <div class="staff-wrap">
      <div style="display: flex">
        <detail-list size="small" col="1" slot="headerContent">
          <detail-list-item term="是否允许接单">
            {{ staffData.isAllow ? "允许" : "禁止" }}
          </detail-list-item>
          <detail-list-item term="接单间隔" v-if="!showInterval"
            >{{ staffData.receiveInterval
            }}<a-button
              type="primary"
              style="margin-left: 20px"
              @click="callInterval"
              >编辑</a-button
            >
          </detail-list-item>
          <detail-list-item term="接单间隔" v-else
            ><a-input-number
              v-model="staffData.receiveInterval"
              style="width: 120px"
              :min="0"
              size="small"
            ></a-input-number
            ><a-button
              type="primary"
              style="margin-left: 20px"
              @click="submitInterval"
              >保存</a-button
            >
          </detail-list-item>
        </detail-list>
        <detail-list size="small" col="1" slot="headerContent">
          <detail-list-item term="订单数">{{
            staffData.repairCount
          }}</detail-list-item>
          <detail-list-item term="问答数">{{
            staffData.postCount
          }}</detail-list-item>
          <detail-list-item term="所属年份">{{
            staffData.year
          }}</detail-list-item>
        </detail-list>
      </div>
      <div>
        <div style="color: black">技术员简介：</div>
        <div v-if="!showTip">
          <div style="width: 60%; padding: 20px">{{ staffData.tips }}</div>
          <a-button
            type="primary"
            style="margin-left: 20px"
            @click="callTip"
          >
            编辑
          </a-button>
        </div>
        <div v-else>
          <div style="width: 60%; padding: 20px">
            <a-textarea v-model="staffData.tips"/>
            </div>
          <a-button
            type="primary"
            style="margin-left: 20px"
            @click="submitTip"
          >
            保存
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { renderTime } from "@/utils/render-time";
import { getUserInfo } from "@/services/user";
import DetailList from "@/components/tool/DetailList";
import { userInfoEdit, staffInterval, staffTip } from "@/services/edituser";
const DetailListItem = DetailList.Item;

export default {
  name: "StandardList",
  computed: {
    ...mapGetters("account", ["user"]),
  },
  components: { DetailList, DetailListItem },
  data() {
    return {
      userData: Object,
      staffData: Object,
      showEdit: false,
      showInterval: false,
      showTip: false,
    };
  },
  methods: {
    callEdit() {
      this.showEdit = true;
    },
    callInterval() {
      this.showInterval = true;
    },
    callTip() {
      this.showTip = true;
    },
    submitInterval() {
      this.showInterval = false;
      let userId = this.userData.userId;
      let receiveInterval = this.staffData.receiveInterval;
      staffInterval(userId, receiveInterval).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message.success("修改技术员接单间隔成功！");
        }
      });
    },
    submitTip() {
      this.showTip = false;
      let userId = this.userData.userId;
      let tips = this.staffData.tips;
      staffTip(userId, tips).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message.success("修改技术员简介成功！");
        }
      });
    },
    submitEdit() {
      this.showEdit = false;
      let userId = this.userData.userId;
      let username = this.userData.username;
      let qqNumber = this.userData.qqNumber;
      let phoneNumber = this.userData.phoneNumber;
      let email = this.userData.email;
      let isBan = this.userData.isBan;
      userInfoEdit(userId, username, qqNumber, phoneNumber, email, isBan).then(
        (res) => {
          console.log(res);
        }
      );
    },
    
  },
  mounted() {
    console.log("进入mounted");
    console.log(this.user);
    let userId = this.user.userId;
    getUserInfo(userId).then((res) => {
      this.staffData = res.data.data.staffInfo;
      this.userData = res.data.data.userInfo;
      this.userData.createTime = renderTime(this.userData.createTime);
      console.log(this.userData);
    });
  },
};
</script>

<style lang="less" scoped>
.list-content-item {
  color: @text-color-second;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin: 4px 0 0;
    line-height: 22px;
  }
}
.user-wrap {
  background-color: white;
  display: flex;
  padding: 20px;
  font-size: 1.1em;
}
.staff-wrap {
  background-color: white;
  padding: 20px;
  font-size: 1.1em;
}
</style>
