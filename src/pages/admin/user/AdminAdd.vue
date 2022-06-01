<template>
  <div>
    <div class="user-wrap">
      <detail-list v-if="!showEdit" size="small" col="1" slot="headerContent">
        <detail-list-item term="用户名">
          <a-input
            v-model="username"
            style="width: 120px"
            size="middle"
          ></a-input>
        </detail-list-item>
        <detail-list-item term="密码"
          ><a-input
            v-model="password"
            style="width: 135px"
            size="middle"
          ></a-input
        ></detail-list-item>
        <detail-list-item
          ><a-button type="primary" @click="submit"
            >确定</a-button
          ></detail-list-item
        >
      </detail-list>
    </div>
  </div>
</template>

<script>
import DetailList from "@/components/tool/DetailList";

import { adminAdd } from "@/services/edituser";
const DetailListItem = DetailList.Item;
export default {
  components: { DetailList, DetailListItem },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {},
  methods:{
    submit(){
      adminAdd(this.username,this.password).then((res)=>{
        if(res.status == 200){
          this.$message.success("新增管理员成功！")
          this.username = "";
          this.password = "";
        }
      })
    }
  }
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
  margin-bottom: 20px;
}
</style>