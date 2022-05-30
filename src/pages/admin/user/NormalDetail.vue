<template>
  <div>
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
        <!-- <detail-list-item term="是否为VIP"
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
        ></detail-list-item> -->
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
        <detail-list-item term="是否禁止报修">{{
          userData.isBan ? "是" : "否"
        }}</detail-list-item>
        <detail-list-item term="创建时间">{{
          userData.createTime
        }}</detail-list-item>
        <detail-list-item v-if="!userData.isStaff"
          ><a-button @click="clickIdentity(userData.userId)"
            >设为技术员</a-button
          ></detail-list-item
        >
        <detail-list-item v-else
          ><a-button @click="clickIdentity(userData.userId)" disabled="true"
            >设为技术员</a-button
          ></detail-list-item
        >
        <detail-list-item>
          <a-button v-if="userData.isBan" @click="clickBan(userData.userId, 0)"
            >解除禁用</a-button
          >
          <a-button v-else @click="clickBan(userData.userId, 1)"
            >禁止报修</a-button
          >
        </detail-list-item>
      </detail-list>
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
import { userInfoEdit } from "@/services/edituser";
import { userUrban, staffAdd } from "@/services/edituser";
import { getUserInfo } from "@/services/user";
import { orderForUser } from "@/services/dataSource";
const DetailListItem = DetailList.Item;
const columns = [
  {
    title: "订单编号",
    dataIndex: "order_id",
  },
  {
    title: "维修员编号",
    dataIndex: "staff_id",
  },
  {
    title: "维修员名称",
    dataIndex: "staff_username",
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
      showEdit: false,
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
    // getDataFromRoute(callback) {
    getDataFromRoute() {
      // this.userData = this.$route.params;
      let userId = JSON.parse(localStorage.getItem("normaID"));
      getUserInfo(userId).then((res) => {
        console.log("getUserInfo(userId).then((res) => {", res.data);
        // this.userData = res.data.data.userInfo.map((item) => {
        //   item.createTime = renderTime(item.createTime);
        //   return item;
        // });
        this.userData = res.data.data.userInfo;
        this.userData.createTime = renderTime(this.userData.createTime);
        console.log(this.userData);
        // if (typeof callback == "function") {
        //   callback();
        // }
      });
    },
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
          if (res.status == 200) {
            this.$message.success("修改用户信息成功！");
          }
        }
      );
    },
    clickBan(userId, isBan) {
      userUrban(userId, isBan).then((res) => {
        this.userData.isBan = res.data.data.userInfo.isBan;
        if (res.status == 200) {
          this.$message.success("修改用户报修状态成功！");
        }
      });
    },
    clickIdentity(userId) {
      staffAdd(userId).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message.success("已成功将该用户设为技术员！");
        }
        setTimeout(
          this.$router.push({
            name: "技术员",
          }),
          5000
        );
        this.userData.isStaff = 1;
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
      console.log("record", record);
      record.user_email = this.userData.email;
      record.user_username = this.userData.username;
      record.user_user_id = this.userData.userId;
      record.user_phone_number = this.userData.phoneNumber;
      record.user_is_vip = this.userData.isVip;
      record.user_vip_id = this.userData.vipId;
      record.user_qq_number = this.userData.qqNumber;
      this.$router.push({
        name: "订单详情",
        params: record,
      });
    },
  },
  mounted() {
    let that = this;
      let userId = JSON.parse(localStorage.getItem("normaID"));
      console.log("let userIdlet userIdlet userIdlet userId",userId);
    // 先获取用户的ID，然后用ID去查找用户相关的订单
    // 回调写得好丑，先这样，后期改
    // this.getDataFromRoute(function () {
    this.getDataFromRoute();
      //获取第一页的订单
      orderForUser(1, userId).then(function (res) {
        that.orderData = res.data.data;
        that.pagination.total = res.data.otherData.page.rows;
      });
    // });
  },
  beforeUpdate(){
    let userId = JSON.parse(localStorage.getItem("normaID")); 
    console.log("let userIdlet userIdlet userIdlet userId",userId); 
  },
  updated(){
    let userId = JSON.parse(localStorage.getItem("normaID")); 
    console.log("let userIdlet userIdlet userIdlet userId",userId); 
  }
  // beforeUpdate() {
  //   let that = this;
  //   // 先获取用户的ID，然后用ID去查找用户相关的订单
  //   // 回调写得好丑，先这样，后期改
  //   this.getDataFromRoute(function () {
  //     let userId = that.userData.userId;
  //     //获取第一页的订单
  //     orderForUser(1, userId).then(function (res) {
  //       that.orderData = res.data.data;
  //       that.pagination.total = res.data.otherData.page.rows;
  //     });
  //   });
  // },
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
</style>
