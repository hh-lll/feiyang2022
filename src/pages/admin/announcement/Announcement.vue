<template>
  <div>
    <a-card>
      <div class="title">
        标题：<a-input size="large" style="width: 80%" v-model="title"></a-input>
      </div>

      <div class="content">
        内容：
        <a-textarea
          style="width: 80%"
          v-model="content"
          :auto-size="{ minRows: 5 }"
        />
      </div>

      <div class="pop">
        是否弹出：
        <a-radio-group v-model="isPop">
          <a-radio :value="1"> 是 </a-radio>
          <a-radio :value="0"> 否 </a-radio>
        </a-radio-group>
      </div>
      <div class="operation">
        <a-button
          style="background-color: #17a05d; color: white"
          @click="submit"
          >保存</a-button
        >
      </div>
    </a-card>
  </div>
</template>

<script>
import { getTip } from "@/services/dataSource";
import { updateTips } from "@/services/tips";
export default {
  data() {
    return {
      title: "",
      content: "",
      isPop: 0,
    };
  },
  mounted() {
    getTip()
      .then((res) => {
        console.log(res.data);
        this.title = res.data.data[0].title;
        this.content = res.data.data[0].tips;
        this.isPop = res.data.data[0].isPop;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    submit(){
      let title = this.title;
      let content = this.content;
      let isPop = this.isPop;
      updateTips(title,content,isPop).then((res)=>{
console.log(res);
        if(res.status == 200){
          this.$message.success("修改公告成功！")
        }
      })
    }
  },
};
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
  display: flex;
  // font-weight: bold;
  // justify-content: space-between;
}
.content {
  margin-top: 30px;
  font-size: 20px;
  display: flex;
  // justify-content: space-between;
}
.operation {
  margin: auto;
  width: 200px;
  justify-content: space-between;
  align-items: center;
}
.pop {
  margin: 30px 0;
  font-size: 15px;
}
</style>