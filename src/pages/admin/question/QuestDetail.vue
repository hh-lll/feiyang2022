<template>
  <page-layout :title="'问答号：' + postInfo.postId">
    <detail-list size="small" :col="2" slot="headerContent">
      <detail-list-item term="客户ID">{{
        questInfo.questionId ? questInfo.questionId : "无"
      }}</detail-list-item>
      <detail-list-item term="技术员ID">{{
        postInfo.postId ? postInfo.postId : "无"
      }}</detail-list-item>
      <detail-list-item term="提问时间">{{
        questInfo.questionTime ? questInfo.questionTime : "无"
      }}</detail-list-item>
      <detail-list-item term="回答时间">{{
        postInfo.postTime ? postInfo.postTime : "无"
      }}</detail-list-item>
      <detail-list-item term="审核状态">{{ postInfo.status?'已审核':'未审核' }}</detail-list-item>
    </detail-list>
    <a-card style="margin-top: 24px" :bordered="false" title="提问信息">
      <detail-list :col="2">
        <detail-list-item term="用户ID">{{
          questInfo.questionId
        }}</detail-list-item>
        <detail-list-item term="用户名">{{
          questInfo.questionUsername
        }}</detail-list-item>
        <detail-list-item term="提问内容">{{
          questInfo.questionContent
        }}</detail-list-item>
      </detail-list>
      <img
        :src="questInfo.questionImage"
        alt=""
        class="img"
        style="width: 100%"
      />
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="回答信息">
      <detail-list :col="2">
        <detail-list-item term="用户ID">{{
          postInfo.postUser
        }}</detail-list-item>
        <detail-list-item term="用户名">{{
          postInfo.postUsername
        }}</detail-list-item>
        <detail-list-item term="回答内容"></detail-list-item>
      </detail-list>
    </a-card>
    <a-card :bordered="false">
      <div class="an-wrap" v-html="postInfo.postContent"></div>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import DetailList from "@/components/tool/DetailList";
import { renderTime } from "@/utils/render-time";
// import AStepItem from '@/components/tool/AStepItem'
import { mapState } from "vuex";
import { marked } from "marked";
import { getpostInfo } from "@/services/dataSource";

// import HeadInfo from '@/components/tool/HeadInfo';

const DetailListItem = DetailList.Item;
// const AStepItemGroup = AStepItem.Group

export default {
  name: "AdvancedDetail",
  // components: {HeadInfo, AStepItemGroup, AStepItem, DetailListItem, DetailList, PageLayout},
  components: { DetailListItem, DetailList, PageLayout },
  data() {
    return {
      questInfo: {
        questionId: "",
        questionContent: "",
        questionImage: "",
        questionUser: "",
        questionUsername: "",
        questionTime: "",
      },
      postInfo: {
        postId: "",
        postContent: "",
        postUser: "",
        postUsername: "",
        postTime: "",
        status: "",
      },
    };
  },
  computed: {
    ...mapState("setting", ["isMobile"]),
  },
  mounted() {
    this.getDataFromRoute();
  },
  methods: {
    onTabChange(key) {
      console.log(key);
    },
    getDataFromRoute() {
      let postId = JSON.parse(localStorage.getItem("postID"));
      let status = JSON.parse(localStorage.getItem("postStatus"));
      console.log("objectstatusstatusstatusstatusstatus",status);
      getpostInfo(postId).then((res) => {
        let params = res.data.data.post;
        console.log("params", params);
        this.questInfo.questionId = params.question_id;
        this.questInfo.questionContent = params.question_content;
        this.questInfo.questionImage = params.question_image;
        this.questInfo.questionUser = params.question_user;
        this.questInfo.questionUsername = params.question_username;
        this.questInfo.questionTime = renderTime(params.question_time);

        this.postInfo.postId = params.post_id;
        this.postInfo.postContent = marked
          .parse(params.post_content)
          .replace(/<img/g, "<img style='width:100%'");
        this.postInfo.postUser = params.post_user;
        this.postInfo.postUsername = params.post_username;
        this.postInfo.postTime = renderTime(params.post_time);
        // this.postInfo.status = params.status;
        this.postInfo.status = status;
      });
      // let params = this.$route.params;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
