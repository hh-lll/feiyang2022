<template>
  <div>
    <a-card :bordered="false">
      <div style="display: flex; flex-wrap: wrap">
        <head-info title="总订单量" content="80个" :bordered="true" />
        <head-info
          title="本周订单平均处理时间"
          content="32分钟"
          :bordered="true"
        />
        <head-info title="本月订单量" content="24个" />
      </div>
    </a-card>
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
import { orderList } from "@/services/dataSource";
// const orderData = [
//     {
//       orderId: 1,
//       userId: 3,
//       staffId: null,
//       createTime: "2022-05-05T06:45:17.000+00:00",
//       receiveTime: null,
//       closeTime: "2022-05-05T06:55:31.000+00:00",
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "华为",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: "测试一下取消",
//       status: 0,
//     },
//     {
//       orderId: 2,
//       userId: 3,
//       staffId: 1,
//       createTime: "2022-05-05T06:49:11.000+00:00",
//       receiveTime: "2022-05-05T10:17:46.000+00:00",
//       closeTime: "2022-05-09T09:03:20.000+00:00",
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "联想",
//       deviceVersion: "1.0",
//       repairType: "屏幕损坏",
//       repairInstruction: "屏幕轻微损坏",
//       repairImage: "sfz2",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 3,
//     },
//     {
//       orderId: 3,
//       userId: 5,
//       staffId: 2,
//       createTime: "2022-05-05T06:58:17.000+00:00",
//       receiveTime: "2022-05-05T06:59:03.000+00:00",
//       closeTime: "2022-05-07T13:44:21.000+00:00",
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "戴尔",
//       deviceVersion: "1.0",
//       repairType: "卡机",
//       repairInstruction: "卡卡卡卡卡",
//       repairImage: "124sdfa",
//       guaranteeStatus: "不在保",
//       cancelReason: null,
//       status: 3,
//     },
//     {
//       orderId: 4,
//       userId: 5,
//       staffId: 2,
//       createTime: "2022-05-05T09:18:58.000+00:00",
//       receiveTime: "2022-05-05T10:18:27.000+00:00",
//       closeTime: "2022-05-07T13:40:37.000+00:00",
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "戴尔",
//       deviceVersion: "1.0",
//       repairType: "卡机",
//       repairInstruction: "卡卡卡卡卡",
//       repairImage: "124sdfa",
//       guaranteeStatus: "不在保",
//       cancelReason: null,
//       status: 1,
//     },
//     {
//       orderId: 5,
//       userId: 3,
//       staffId: 1,
//       createTime: "2022-05-05T09:21:13.000+00:00",
//       receiveTime: "2022-05-05T14:53:37.000+00:00",
//       closeTime: null,
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "苹果",
//       deviceVersion: "1.0",
//       repairType: "黑屏",
//       repairInstruction: "重启无反应，一直黑屏",
//       repairImage: "124sdfa",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 2,
//     },
//     {
//       orderId: 8,
//       userId: 5,
//       staffId: 1,
//       createTime: "2022-05-05T14:55:04.000+00:00",
//       receiveTime: "2022-05-05T15:01:15.000+00:00",
//       closeTime: "2022-05-07T13:43:37.000+00:00",
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "测试1",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 3,
//     },
//     {
//       orderId: 10,
//       userId: 5,
//       staffId: 2,
//       createTime: "2022-05-05T15:02:15.000+00:00",
//       receiveTime: "2022-05-07T13:40:38.000+00:00",
//       closeTime: "2022-05-09T09:01:12.000+00:00",
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "测试1",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 3,
//     },
//     {
//       orderId: 11,
//       userId: 5,
//       staffId: 1,
//       createTime: "2022-05-05T15:02:17.000+00:00",
//       receiveTime: "2022-05-07T13:42:46.000+00:00",
//       closeTime: null,
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "测试1",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 2,
//     },
//     {
//       orderId: 12,
//       userId: 3,
//       staffId: 1,
//       createTime: "2022-05-07T13:41:32.000+00:00",
//       receiveTime: "2022-05-07T13:43:37.000+00:00",
//       closeTime: null,
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "华为",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 2,
//     },
//     {
//       orderId: 13,
//       userId: 5,
//       staffId: 2,
//       createTime: "2022-05-07T13:41:41.000+00:00",
//       receiveTime: "2022-05-07T13:44:21.000+00:00",
//       closeTime: null,
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "华为",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 2,
//     },
//     {
//       orderId: 14,
//       userId: 3,
//       staffId: 1,
//       createTime: "2022-05-09T09:02:32.000+00:00",
//       receiveTime: "2022-05-09T09:20:21.000+00:00",
//       closeTime: "2022-05-09T11:39:55.000+00:00",
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "华为",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 3,
//     },
//     {
//       orderId: 15,
//       userId: 3,
//       staffId: 10,
//       createTime: "2022-05-09T09:21:33.000+00:00",
//       receiveTime: "2022-05-09T09:23:20.000+00:00",
//       closeTime: null,
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "华为",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 2,
//     },
//     {
//       orderId: 16,
//       userId: 3,
//       staffId: 5,
//       createTime: "2022-05-09T09:40:02.000+00:00",
//       receiveTime: "2022-05-09T09:43:55.000+00:00",
//       closeTime: "2022-05-09T10:00:27.000+00:00",
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "华为",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 3,
//     },
//     {
//       orderId: 17,
//       userId: 3,
//       staffId: 2,
//       createTime: "2022-05-09T09:45:57.000+00:00",
//       receiveTime: "2022-05-09T10:06:49.000+00:00",
//       closeTime: null,
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "华为",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 2,
//     },
//     {
//       orderId: 18,
//       userId: 3,
//       staffId: 1,
//       createTime: "2022-05-09T11:39:39.000+00:00",
//       receiveTime: "2022-05-09T11:39:59.000+00:00",
//       closeTime: null,
//       buyTime: null,
//       deviceType: "笔记本",
//       deviceBrand: "华为",
//       deviceVersion: "1.0",
//       repairType: "清灰",
//       repairInstruction: "电脑太旧，清个灰",
//       repairImage: "sfzdcvjbzdjshgs",
//       guaranteeStatus: "在保",
//       cancelReason: null,
//       status: 2,
//     },
// ];
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
// import { request, METHOD } from "@/utils/request";
// async function GetOrder() {
//   return request("/fy/order/all", METHOD.GET);
// }
import HeadInfo from "../../components/tool/HeadInfo";
export default {
  name: "StandardList",
  components: { HeadInfo },
  data() {
    return {
      orderData: [],
      columns: columns,
    };
  },
  mounted() {
    let that = this;
    console.log("进入mounted");
    //获取所有公告
    // GetOrder().then(function (res) {
    orderList().then(function (res) {
      console.log(res);
      that.orderData = res.data.data;
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
