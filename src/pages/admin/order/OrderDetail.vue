<template>
  <page-layout :title="'订单号：'+orderId">
    <detail-list size="small" :col="2" slot="headerContent">
      <detail-list-item term="客户ID">1</detail-list-item>
      <detail-list-item term="技术员ID">21</detail-list-item>
      <detail-list-item term="创建时间">2018-08-07</detail-list-item>
      <detail-list-item term="结束时间">2018-12-11</detail-list-item>
      <detail-list-item term="维修类型">"电脑太旧，清个灰"</detail-list-item>
      <detail-list-item term="维修进度">等待接单</detail-list-item>
    </detail-list>
    <!-- <template slot="extra">
      <head-info title="状态" content="待审批" />
      <head-info title="订单金额" content="¥ 568.08" />
    </template> -->
    <template slot="action">
      <a-button-group style="margin-right: 8px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button><a-icon type="ellipsis"/></a-button>
      </a-button-group>
      <a-button type="primary" >主操作</a-button>
    </template>
    <a-card :bordered="false" title="维修进度">
      <a-steps :current="3" progress-dot :direction="isMobile ? 'vertical' : 'horizontal'">
        <a-step title="创建订单">
          <a-step-item-group :align="isMobile ? 'left' : 'center'" slot="description">
            <a-step-item link="/dashboard/workplace" title="曲丽丽" icon="dingding-o"/>
            <a-step-item title="2016-12-12 12:32"/>
          </a-step-item-group>
        </a-step>
        <a-step title="等待接单">
          <a-step-item-group :align="isMobile ? 'left' : 'center'" slot="description">
            <a-step-item link="/form/step" title="周毛毛" icon="dingding-o" />
            <a-step-item link="/result/success" title="催一下" icon="bell"/>
          </a-step-item-group>
        </a-step>
        <a-step title="技术员已经接单">
        </a-step>
        <a-step title="订单完成">
        </a-step>
      </a-steps>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="用户信息">
      <detail-list>
        <detail-list-item term="用户ID">付晓晓</detail-list-item>
        <detail-list-item term="用户名">32943898021309809423</detail-list-item>
        <detail-list-item term="QQ号">3321944288191034921</detail-list-item>
        <detail-list-item term="手机号">18112345678</detail-list-item>
        <detail-list-item term="Email">浙江省杭州市西湖区黄姑山路工专路交叉路口</detail-list-item>
      </detail-list>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="技术员信息">
      <detail-list>
        <detail-list-item term="技术员ID">付晓晓</detail-list-item>
        <detail-list-item term="用户名">32943898021309809423</detail-list-item>
        <detail-list-item term="QQ号">3321944288191034921</detail-list-item>
        <detail-list-item term="手机号">18112345678</detail-list-item>
        <detail-list-item term="Email">浙江省杭州市西湖区黄姑山路工专路交叉路口</detail-list-item>
      </detail-list>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout'
import DetailList from '@/components/tool/DetailList'
import AStepItem from '@/components/tool/AStepItem'
import {operation1, operation2, operation3, operationColumns} from '@/mock/common/tableData'
import {mapState} from 'vuex'
// import HeadInfo from '@/components/tool/HeadInfo';


const DetailListItem = DetailList.Item
const AStepItemGroup = AStepItem.Group

const tabList = [
  {
    key: '1',
    tab: '操作日志一'
  },
  {
    key: '2',
    tab: '操作日志二'
  },
  {
    key: '3',
    tab: '操作日志三'
  }
]

export default {
  name: 'AdvancedDetail',
  // components: {HeadInfo, AStepItemGroup, AStepItem, DetailListItem, DetailList, PageLayout},
  components: {AStepItemGroup, AStepItem, DetailListItem, DetailList, PageLayout},
  data () {
    return {
      tabList,
      operationColumns,
      operation1,
      operation2,
      operation3,
      activeTabKey: '2'
    }
  },
  computed: {
    ...mapState('setting', ['isMobile'])
  },
  methods: {
    onTabChange (key) {
      console.log(key)
    }
  },
}
</script>

<style lang="less" scoped>
</style>
