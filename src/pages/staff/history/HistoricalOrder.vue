<template>
  <div>
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
import { orderForUser } from "@/services/dataSource";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters("account", ["user"]),
  },
  data() {
    return {
      allOrderNum: "",
      orderData: [],
      columns: columns,
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
    handleTableChange(e) {
      console.log(e);
      let that = this;
      let current = e.current;
      that.pagination.current = current;
      orderForUser(current,this.user.userId).then(function (res) {
        console.log(res);
        that.orderData = res.data.data;
        console.log(this.orderData);
      });
    },
    toOrderDetail(record) {
      record.staff_email = this.user.email;
      record.staff_username = this.user.username;
      record.staff_id = this.user.userId;
      record.staff_phone_number = this.user.phoneNumber;
      record.staff_qq_number = this.user.qqNumber;
      console.log("record", record);
      this.$router.push({
        name: "订单详情",
        params: record,
      });
    },
  },
  mounted() {
    let that = this;
    console.log("进入mounted");
    //获取第一页的订单
    orderForUser(1,this.user.userId).then(function (res) {
      console.log(res);
      that.allOrderNum = res.data.otherData.page.rows;
      that.orderData = res.data.data;
      that.pagination.total = res.data.otherData.page.rows;
      console.log(that.orderData);
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
</style>
