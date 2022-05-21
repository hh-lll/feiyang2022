<template>
    <div>
      <div :class="['search-head', layout, pageWidth]">
        <div style="padding: 0 24px">
          <a-tabs :tabBarStyle="{margin: 0}" @change="navigate" :activeKey="activeKey">
            <a-tab-pane tab="普通用户" key="1"></a-tab-pane>
            <a-tab-pane tab="技术员" key="2"></a-tab-pane>
            <a-tab-pane tab="管理员" key="3"></a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="search-content">
        <router-view />
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'SearchLayout',
  computed: {
    ...mapState('setting', ['layout', 'pageWidth']),
    activeKey () {
      switch (this.$route.path) {
        case '/user/userlist/normal':
          return '1'
        case '/user/userlist/technician':
          return '2'
        case '/user/userlist/manager':
          return '3'
        default:
          return '1'
      }
    }
  },
  methods: {
    navigate (key) {
      switch (key) {
        case '1':
          this.$router.push('/user/userlist/normal')
          break
        case '2':
          this.$router.push('/user/userlist/technician')
          break
        case '3':
          this.$router.push('/user/userlist/manager')
          break
        default:
          this.$router.push('/workplace')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-head{
    background-color: @base-bg-color;
    margin: -24px;
    &.head.fixed{
      margin: -24px 0;
    }
    .search-input{
      text-align: center;
    }
  }
  .search-content{
    margin-top: 48px;
  }
</style>
