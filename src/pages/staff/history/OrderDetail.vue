<template>
  <page-layout :title="'订单号：'+ orderInfo.orderId">
    <detail-list size="small" :col="2" slot="headerContent">
      <detail-list-item term="客户ID">{{userInfo.userId?userInfo.userId:'无'}}</detail-list-item>
      <detail-list-item term="技术员ID">{{staffInfo.userId?userInfo.userId:'无'}}</detail-list-item>
      <detail-list-item term="创建时间">{{orderInfo.createTime?orderInfo.createTime:'无'}}</detail-list-item>
      <detail-list-item term="结束时间">{{orderInfo.closeTime?orderInfo.closeTime:'无'}}</detail-list-item>
      <detail-list-item term="维修类型">{{orderInfo.repairType}}</detail-list-item>
    </detail-list>

    <a-card :bordered="false" title="维修进度">
      <a-steps :current="orderInfo.status" progress-dot :direction="isMobile ? 'vertical' : 'horizontal'">
        <a-step title="创建订单">
        </a-step>
        <a-step title="等待接单">
        </a-step>
        <a-step title="技术员已经接单">
        </a-step>
        <a-step title="订单完成">
        </a-step>
      </a-steps>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="用户信息">
      <detail-list>
        <detail-list-item term="用户ID">{{userInfo.userId}}</detail-list-item>
        <detail-list-item term="用户名">{{userInfo.username}}</detail-list-item>
        <detail-list-item term="QQ号">{{userInfo.qqNumber}}</detail-list-item>
        <detail-list-item term="手机号">{{userInfo.phoneNumber}}</detail-list-item>
        <detail-list-item term="Email">{{userInfo.email}}</detail-list-item>
      </detail-list>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="技术员信息">
      <detail-list>
        <detail-list-item term="用户ID">{{staffInfo.userId}}</detail-list-item>
        <detail-list-item term="用户名">{{staffInfo.username}}</detail-list-item>
        <detail-list-item term="QQ号">{{staffInfo.qqNumber}}</detail-list-item>
        <detail-list-item term="手机号">{{staffInfo.phoneNumber}}</detail-list-item>
        <detail-list-item term="Email">{{staffInfo.email}}</detail-list-item>
      </detail-list>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="设备信息">
      <detail-list>
        <detail-list-item term="类型">{{deviceInfo.type}}</detail-list-item>
        <detail-list-item term="品牌">{{deviceInfo.brand}}</detail-list-item>
        <detail-list-item term="版本">{{deviceInfo.version}}</detail-list-item>
        <detail-list-item term="保修状态">{{deviceInfo.guaranteeStatus}}</detail-list-item>
      </detail-list>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="报修内容">
      {{orderInfo.repairInstruction}}
      <div>
      <img :src="orderInfo.repairImage" alt="" style="height: 300px;margin-top: 20px;"></div>
    </a-card>
  </page-layout>
</template>

<script>
import { renderTime } from "@/utils/render-time";
import PageLayout from '@/layouts/PageLayout'
import DetailList from '@/components/tool/DetailList'
// import AStepItem from '@/components/tool/AStepItem'
import {mapState} from 'vuex'
// import HeadInfo from '@/components/tool/HeadInfo';


const DetailListItem = DetailList.Item
// const AStepItemGroup = AStepItem.Group

export default {
  name: 'AdvancedDetail',
  // components: {HeadInfo, AStepItemGroup, AStepItem, DetailListItem, DetailList, PageLayout},
  components: {DetailListItem, DetailList, PageLayout},
  data () {
    return {
      orderInfo:{
        orderId:"",
        createTime:"",
        closeTime:"",
        cancelReason:"",
        repairType:"",
        repairInstruction:"",
        repairImage:"",
        status:0,
      },
      userInfo:{
        email:"",
        username:"",
        userId:"",
        phoneNumber:"",
        isVip:"",
        vipId:"",
        qqNumber:"",
      },
      staffInfo:{
        email:"",
        username:"",
        userId:"",
        phoneNumber:"",
        qqNumber:"",
      },
      deviceInfo:{
        version:"",
        guaranteeStatus:"",
        type:"",
        brand:"",
      },
    }
  },
  computed: {
    ...mapState('setting', ['isMobile'])
  },
  mounted(){
    this.getDataFromRoute();
    console.log(this.orderInfo);
    console.log(this.userInfo.userId);
    console.log(this.staffInfo.userId);
  },
  methods: {
    onTabChange (key) {
      console.log(key)
    },
    getDataFromRoute() {
      let params = this.$route.params;
      console.log("params",params);
      this.orderInfo.orderId = params.order_id;
      this.orderInfo.createTime = renderTime(params.create_time);
      this.orderInfo.closeTime = renderTime(params.close_time);
      this.orderInfo.cancelReason = params.cancel_reason;
      this.orderInfo.repairType = params.repair_type;
      this.orderInfo.repairInstruction = params.repair_instruction;
      this.orderInfo.repairImage = params.repair_image;
      this.orderInfo.status = params.status;

      this.userInfo.email = params.user_email;
      this.userInfo.username = params.user_username;
      this.userInfo.userId = params.user_user_id;
      this.userInfo.phoneNumber = params.user_phone_number;
      this.userInfo.isVip = params.user_is_vip;
      this.userInfo.vipId = params.user_vip_id;
      this.userInfo.qqNumber = params.user_qq_number;

      this.staffInfo.email = params.staff_email;
      this.staffInfo.username = params.staff_username;
      this.staffInfo.userId = params.staff_id;
      this.staffInfo.phoneNumber = params.staff_phone_number;
      this.staffInfo.qqNumber = params.staff_qq_number;
      
      this.deviceInfo.version = params.device_version;
      this.deviceInfo.guaranteeStatus = params.guarantee_status;
      this.deviceInfo.type = params.device_type;
      this.deviceInfo.brand = params.device_brand;
    },
    cancelOrder(){
      
    }
  },
}
</script>

<style lang="less" scoped>
</style>
