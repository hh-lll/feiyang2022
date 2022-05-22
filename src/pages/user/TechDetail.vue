<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="基本信息"></a-card>
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
        <detail-list-item term="用户ID"
          ><a-input
            v-model="userData.userId"
            style="width: 120px"
            size="small"
          ></a-input
        ></detail-list-item>
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
        <detail-list-item term="是否禁止接单">{{
          userData.isAllow ? "是" : "否"
        }}</detail-list-item>
        <detail-list-item term="创建时间">{{
          userData.createTime
        }}</detail-list-item>
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
    <a-card style="margin-top: 24px" :bordered="false" title="技术员相关信息"></a-card>
    <div class="tech-wrap">
          <detail-list size="small" col="1" slot="headerContent">
        <detail-list-item term="是否为技术员">{{
          userData.isStaff ? "是" : "否"
        }}</detail-list-item>
        <detail-list-item term="是否禁止接单">{{
          userData.isAllow ? "是" : "否"
        }}</detail-list-item>
        <detail-list-item term="创建时间">{{
          userData.createTime
        }}</detail-list-item>
        <detail-list-item>
          <a-button @click="subTechUpdate(userData.userId)"
            >更新信息</a-button
          >
          <a-button @click="clickBan(userData.userId, 1)"
            >禁止报修</a-button
          >
        </detail-list-item>
      </detail-list>
      </div>
    <a-card style="margin-top: 24px" :bordered="false" title="订单列表">
      <div slot="extra">
        <a-radio-group>
          <a-radio-button>全部</a-radio-button>
          <a-radio-button>进行中</a-radio-button>
          <a-radio-button>等待中</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px" />
      </div>
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
          @click="() => toEditNotice(record)"
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
import { userUrban,techAdd,techUpdate } from "@/services/edituser";
import { orderForUser } from "@/services/dataSource";
const DetailListItem = DetailList.Item;
const columns = [
  {
    title: "订单编号",
    dataIndex: "orderId",
    width: "20%",
  },
  {
    title: "用户编号",
    dataIndex: "userId",
  },
  {
    title: "维修员编号",
    dataIndex: "staffId",
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
    dataIndex: "repairType",
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
    getDataFromRoute(callback) {
      this.userData = this.$route.params;
      this.userData.createTime = renderTime(this.userData.createTime);
      console.log(this.userData);
      if (typeof callback == "function") {
        callback();
      }
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
        }
      );
    },
    clickBan(userId, isBan) {
      userUrban(userId, isBan).then((res) => {
        this.userData.isBan = res.data.data.userInfo.isBan;
        0;
      });
    },
    clickIdentity(userId){
      techAdd(userId).then((res)=>{
        console.log(res);
        this.userData.isStaff = 1;
      })
    },
    subTechUpdate(userId){
      techUpdate(userId,21,"新华社天津5月19日电（记者白佳丽）5月19日上午，天津市第二中级人民法院对公益诉讼起诉人天津市人民检察院第二分院诉被告张某侵害著名农业科").then((res)=>{
        console.log(res);
        // this.userData.isStaff = 1;
      })
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
  },
  mounted() {
    console.log("进入mounted");
    let that = this;
    this.getDataFromRoute(function () {
      let userId = that.userData.userId;
      //获取第一页的订单
      orderForUser(1, userId).then(function (res) {
        that.orderData = res.data.data;
        that.pagination.total = res.data.otherData.page.rows;
      });
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
.tech-wrap{
  background-color: white;
  // display: flex;
  padding: 20px;
  font-size: 1.1em;
}
</style>
