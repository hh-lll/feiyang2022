<template>
  <div>
        <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="基本信息"
    ></a-card>
    <div class="user-wrap">
      <detail-list v-if="!showEdit" size="small" col="1" slot="headerContent">
        <detail-list-item term="用户ID">{{ userData.adminId }}</detail-list-item>
        <detail-list-item term="用户名">{{ userData.username }}</detail-list-item>
        <detail-list-item term="密码">{{ userData.password }}</detail-list-item>
        <detail-list-item term="创建时间">{{
          userData.createtime
        }}</detail-list-item>
      </detail-list>
    </div>
  </div>
</template>

<script>
import DetailList from "@/components/tool/DetailList";
const DetailListItem = DetailList.Item;
export default {  
  
  components: { DetailList, DetailListItem },
  data() {
    return {
      userData: Object,
    };
  },
  mounted() {
    console.log("进入mounted");
    this.userData= JSON.parse(localStorage.getItem("adminInfo"));
    console.log(this.userData);
  },
}
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
  margin-bottom: 20px;
}
</style>