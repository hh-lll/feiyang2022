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
            <a-button
              style="margin-left: 20px"
              v-if="staffData.isAllow"
              @click="clickAllow(staffData.userId, 0)"
              >禁止接单</a-button
            >
            <a-button
              style="margin-left: 20px"
              v-else
              @click="clickAllow(staffData.userId, 1)"
              >解除禁用</a-button
            >
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
              :max="5"
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
    <a-card style="margin-top: 24px" :bordered="false" title="订单列表">
      <a-table
        :columns="columns"
        :row-key="(record) => record.orderId"
        :data-source="orderData"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <a-progress
          slot="status"
          slot-scope="text, record"
          :percent="
            record.status == 0
              ? 0
              : record.status == 1
              ? 30
              : record.status == 2
              ? 75
              : 100
          "
          :strokeColor="
            record.status == 0
              ? 'white'
              : record.status == 1
              ? '#F4DF00'
              : record.status == 2
              ? '#41A5EE'
              : '#52C41A'
          "
          style="width: 180px"
        >
          <template #format="percent">
            <span style="color: red" v-if="percent == 0">中止</span>
            <span style="color: #f4df00" v-else-if="percent == 30">等待中</span>
            <span style="color: #41a5ee" v-else-if="percent == 75">进行中</span>
            <span style="color: #52c41a" v-else>已完成</span>
          </template>
        </a-progress>
        <a-button
          slot="edit"
          slot-scope="text, record"
          @click="() => toOrderDetail(record)"
        >
          详情
        </a-button>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import DetailList from "@/components/tool/DetailList";
import { renderTime } from "@/utils/render-time";
import { staffAllow } from "@/services/edituser";
import { userInfoEdit, staffInterval, staffTip } from "@/services/edituser";
import { getUserInfo } from "@/services/user";
import { orderForUser } from "@/services/dataSource";
const DetailListItem = DetailList.Item;
const columns = [
  {
    title: "订单编号",
    dataIndex: "order_id",
    // width: "20%",
  },
  {
    title: "用户编号",
    dataIndex: "user_user_id",
  },
  {
    title: "用户名",
    dataIndex: "user_username",
  },
  {
    title: "订单进度",
    dataIndex: "status",
    scopedSlots: {
      customRender: "status",
    },
  },
  {
    title: "维修类型",
    dataIndex: "repair_type",
  },

  {
    title: "查看详情",
    key: "edit",
    dataIndex: "edit",
    scopedSlots: {
      customRender: "edit",
    },
  },
];
export default {
  name: "StandardList",
  components: { DetailList, DetailListItem },
  data() {
    return {
      orderData: [],
      columns: columns,
      totalOrder: 80,
      userData: Object,
      staffData: Object,
      showEdit: false,
      showInterval: false,
      showTip: false,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 8,
        defaultPageSize: 8,
        showTotal: (total) => `共 ${total} 条数据`,
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
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
      // let isVip = this.userData.isVip
      // let vipId = this.userData.vipId
      let isBan = this.userData.isBan;
      // userInfoEdit(userId,username,qqNumber,phoneNumber,email,isVip,vipId,isBan).then((res)=>{
      userInfoEdit(userId, username, qqNumber, phoneNumber, email, isBan).then(
        (res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success("修改用户信息成功！");
          }
        }
      );
    },
    clickAllow(userId, isALLow) {
      staffAllow(userId, isALLow).then((res) => {
        this.staffData.isAllow = res.data.data.isAllow;
        if (res.data.data.isAllow == 0) {
          this.$message.success("已禁止该技术员接单");
        } else {
          this.$message.success("已允许该技术员接单");
        }
      });
    },
    handleTableChange(e) {
      console.log(e);
      let that = this;
      let current = e.current;
      that.pagination.current = current;
      let userId = that.userData.userId;
      orderForUser(current, userId).then(function (res) {
        console.log(res);
        that.orderData = res.data.data;
        console.log(this.orderData);
      });
    },
    toOrderDetail(record) {
      record.staff_email = this.userData.email;
      record.staff_username = this.userData.username;
      record.staff_id = this.userData.userId;
      record.staff_phone_number = this.userData.phoneNumber;
      record.staff_qq_number = this.userData.qqNumber;
      console.log("record", record);
      this.$router.push({
        name: "订单详情",
        params: record,
      });
    },
  },
  mounted() {
    console.log("进入mounted");
    let that = this;
    let userId = JSON.parse(localStorage.getItem("staffID"));
    getUserInfo(userId).then((res) => {
      console.log("SSSSSSSSSSSSSgetUserInfo(userId).then((res) => {", res.data);
      // this.userData = res.data.data.userInfo.map((item) => {
      //   item.createTime = renderTime(item.createTime);
      //   return item;
      // });
      this.staffData = res.data.data.staffInfo;
      this.userData = res.data.data.userInfo;
      this.userData.createTime = renderTime(this.userData.createTime);
      console.log(this.userData);
      // if (typeof callback == "function") {
      //   callback();
      // }
    });
    //获取第一页的订单
    orderForUser(1, userId).then(function (res) {
      that.orderData = res.data.data;
      that.pagination.total = res.data.otherData.page.rows;
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
