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
        <detail-list-item term="是否为VIP"
          ><a-radio-group v-model="userData.isVip">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group></detail-list-item
        >
        <detail-list-item term="VIP 号"
          ><a-input
            v-model="userData.vipId"
            style="width: 120px"
            size="small"
          ></a-input
        ></detail-list-item>
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
      <detail-list size="small" col="1" slot="headerContent">
        <detail-list-item term="是否禁止接单">{{
          userData.isAllow ? "是" : "否"
        }}</detail-list-item>
        <detail-list-item term="接单间隔">{{
          userData.createTime
        }}</detail-list-item>
        <detail-list-item>
          <a-button @click="clickBan(userData.userId, 0)"
            >编辑接单信息</a-button
          >
        </detail-list-item>
      </detail-list>
      <detail-list size="small" col="1" slot="headerContent">
        <detail-list-item term="订单数">{{
          userData.repairCount
        }}</detail-list-item>
        <detail-list-item term="问答数">{{
          userData.postCount
        }}</detail-list-item>
      </detail-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DetailList from "@/components/tool/DetailList";
import { userInfoEdit } from "@/services/edituser";
import { staffUpdate } from "@/services/edituser";
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
      showEdit: false,
    };
  },
  methods: {
    callEdit() {
      this.showEdit = true;
    },
    submitEdit() {
      this.showEdit = false;
      let userId = this.userData.userId;
      let username = this.userData.username;
      let qqNumber = this.userData.qqNumber;
      let phoneNumber = this.userData.phoneNumber;
      let email = this.userData.email;
      // let isVip = this.userData.isVip
      // let vipId = this.userData.vipId
      let isBan = this.userData.isBan;
      // userInfoEdit(userId,username,qqNumber,phoneNumber,email,isVip,vipId,isBan).then((res)=>{
      userInfoEdit(userId, username, qqNumber, phoneNumber, email, isBan).then(
        (res) => {
          console.log(res);
        }
      );
    },
    subTechUpdate(userId) {
      staffUpdate(
        userId,
        21,
        "新华社天津5月19日电（记者白佳丽）5月19日上午，天津市第二中级人民法院对公益诉讼起诉人天津市人民检察院第二分院诉被告张某侵害著名农业科"
      ).then((res) => {
        console.log(res);
        // this.userData.isStaff = 1;
      });
    },
  },
  mounted() {
    console.log("进入mounted");
    console.log(this.user);
    this.userData = this.user;
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
  display: flex;
  padding: 20px;
  font-size: 1.1em;
}
</style>
