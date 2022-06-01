<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false">
      <div>
        <div>
          <a-row justify="start" :gutter="[0, 32]">
            <a-col :md="12" :sm="24">
              报修类型：
              <a-input
                placeholder="请输入类型"
                style="width: 150px"
                v-model="repairType"
              />
            </a-col>
            <a-col :md="12" :sm="24">
              订单状态：
              <a-select
                placeholder="请选择"
                ref="select"
                v-model="status"
                style="width: 120px"
              >
                <a-select-option value="取消">取消</a-select-option>
                <a-select-option value="等待中">等待中</a-select-option>
                <a-select-option value="进行中">进行中</a-select-option>
                <a-select-option value="完成后">完成后</a-select-option>
                <a-select-option value="全部">全部</a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="12" :sm="24">
              用户姓名：
              <a-input
                style="width: 150px"
                placeholder="请输入用户姓名"
                v-model="userName"
              />
            </a-col>
            <a-col :md="12" :sm="24">
              技术员姓名：
              <a-input
                style="width: 150px"
                placeholder="请输入技术员姓名"
                v-model="staffName"
              />
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px">
          <a-button type="primary" @click="submitQuery">查询</a-button>
          <a-button style="margin-left: 8px" @click="clearQuery">重置</a-button>
        </span>
      </div>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
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
import { orderList } from "@/services/dataSource";
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
    title: "维修员编号",
    dataIndex: "staff_id",
  },
  {
    title: "维修员名称",
    dataIndex: "staff_username",
  },
  {
    title: "订单状态",
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
  data() {
    return {
      orderData: [],
      columns: columns,

      repairType: "",
      status: "全部",
      userName: "",
      staffName: "",

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
            let repairType = this.repairType;
      let status = this.status;
      let userName = this.userName;
      let staffName = this.staffName;
      if (repairType == "") {
        repairType = null;
      }
      if (status == "全部") {
        status = null;
      }
      else if(status == "取消"){
        status = 0;
      }else if(status == "等待中"){
        status = 1;
      }else if(status == "进行中"){
        status = 2;
      }else if(status == "完成后"){
        status = 3;
      }
      if (userName == "") {
        userName = null;
      }
      if (staffName == "") {
        staffName = null;
      }
      orderList(
        current,
        repairType,
        status,
        staffName,
        userName
      ).then(function (res) {
        console.log(res);
        that.orderData = res.data.data;
        console.log(this.orderData);
      });
    },
    toOrderDetail(record) {
      console.log("record", record);
      this.$router.push({
        name: "订单详情",
        params: record,
      });
    },
    submitQuery() {
      let that = this;
      console.log("this.repairType", this.repairType);
      console.log("this.status", this.status);
      console.log("this.userName", this.userName);
      console.log("this.staffName", this.staffName);
      let repairType = this.repairType;
      let status = this.status;
      let userName = this.userName;
      let staffName = this.staffName;
      if (repairType == "") {
        repairType = null;
      }
      if (status == "全部") {
        status = null;
      }
      else if(status == "取消"){
        status = 0;
      }else if(status == "等待中"){
        status = 1;
      }else if(status == "进行中"){
        status = 2;
      }else if(status == "完成后"){
        status = 3;
      }
      if (userName == "") {
        userName = null;
      }
      if (staffName == "") {
        staffName = null;
      }
      orderList(1, repairType, status, staffName, userName).then(function (
        res
      ) {
        console.log(res);
        that.orderData = res.data.data;
        that.pagination.total = res.data.otherData.page.rows;
      });
    },
    clearQuery(){
      this.repairType="";
      this.repairType= "";
      this.status= "全部";
      this.userName= "";
      this.staffName= "";
    },
  },
  mounted() {
    let that = this;
    console.log("进入mounted");
    //获取第一页的订单
    orderList(1).then(function (res) {
      console.log(res);
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
</style>
