<template>
  <div>
    <div v-if="postList.length != 0">
    <a-card>
      待审核量/本次审核总量：
      {{residue}}/{{totalCount}}
    </a-card>
      <!-- <a-card v-for="(item, i) in postList" :key="i"> -->
      <a-card>
        <div class="qu-wrap">
          <div class="title">{{ postList[0].question_content }}</div>
          <div class="time">{{ postList[0].question_time }}</div>
        </div>
        <div class="tech-wrap">
          <!-- <img class="avatar" :src="avaUrl" /> -->
          <!-- <img class="avatar" src="@/assets/img/alipay.png" /> -->
          <div>
            <div class="tech-info">
              <!-- <div class="id">{{ item.id }}</div> -->
              <div class="name">技术员用户名：{{ postList[0].post_username }}</div>
            </div>
            <div class="time">回答时间：{{ postList[0].post_time }}</div>
          </div>
        </div>
        <div class="an-wrap" v-html="postList[0].post_content">
        </div>
        <div class="operation">
          <a-button type="primary" @click="nopass(postList[0])">不通过</a-button>
          <a-button
            style="background-color: #17a05d; color: white"
            @click="pass(postList[0])"
            >通过</a-button
          >
        </div>
      </a-card>
    </div>
    <a-card v-else> 无问题需要审核 </a-card>
  </div>
</template>

<script>
import { examineList } from "@/services/dataSource";
import { passPost, nopassPost } from "@/services/post";
import { renderTime } from "@/utils/render-time";
import { marked } from "marked";
export default {
  data() {
    return {
      postList: [],
      totalCount:0,
      residue:0
    };
  },
  mounted() {
    examineList()
      .then((res) => {
        this.totalCount = res.data.data.totalCount
        this.residue = res.data.data.totalCount
        this.postList = res.data.data.posts.map((item) => {
          item.post_content = marked.parse(item.post_content)
          .replace(/<img/g, "<img style='width:100%'");
          item.post_time = renderTime(item.post_time);
          item.question_time = renderTime(item.question_time);
          return item;
        });
        console.log(this.postList);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    pass(item) {
      console.log(item);
      passPost(item.post_id).then((res) => {
        if(res.status == 200){
          this.$message.success("审核成功！")
        }
        else{
          this.$message.error("审核失败！")
        }
      });
      this.postList.splice(0, 1);
      this.residue--;
    },
    nopass(item) {
      nopassPost(item.post_id).then((res) => {
        if(res.status == 200){
          this.$message.success("审核成功！")
        }
        else{
          this.$message.error("审核失败！")
        }
      });
      this.postList.splice(0, 1);
      this.residue--;
    },
  },
};
</script>

<style scoped lang="less">
.qu-wrap {
  margin: auto;
  height: 70px;
  text-align: center;
  .title {
    font-size: 30px;
    font-weight: bold;
  }
}
.tech-wrap {
  display: flex;
  height: 80px;
  .avatar {
    height: 65px;
    width: 65px;
    border-radius: 50%;
    margin: 0 30px 0 10px;
  }
  .tech-info {
    height: 40px;
    margin: auto;
    display: flex;
  }
  .id {
    font-size: 10px;
    margin-right: 20px;
  }
}
.an-wrap {
  background-color: #f3f3f3;
  min-height: 200px;
  padding: 10px;
  overflow: auto;
  margin-bottom: 20px;
  p {
    line-height: 150%;
  }
}
.operation {
  margin: auto;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>