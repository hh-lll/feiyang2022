<template>
  <div>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="问题详情"
    ></a-card>
    <div class="question-wrap">
      <div class="title">{{ questionData.questionContent }}</div>
      <div>
        <img :src="questionData.questionImage" alt="" class="img" />
      </div>
    </div>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="回答问题"
    ></a-card>
    <div class="answer-wrap">
      <mavon-editor
        v-model="content"
        ref="md"
        @change="change"
        style="min-height: 600px"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
      />
      <a-button
        type="primary"
        size="large"
        @click="submit"
        style="margin: 20px; width: 160px"
        >提交</a-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { uploadImg, addPost } from "@/services/post";

export default {
  components: {
    mavonEditor,
  },
  computed: {
    ...mapGetters("account", ["user"]),
  },
  name: "Answer",
  data() {
    return {
      text: "",
      questionData: Object,
      content: "", // 输入的markdown
      html: "", // 及时转的html
    };
  },
  methods: {
    getDataFromRoute() {
      this.questionData = this.$route.params;
      console.log(this.questionData);
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    submit() {
      if (this.content != "") {
        let userId = this.user.userId;
        let content = this.content;
        addPost(userId, content, this.questionData.questionId).then((res) => {
          if (res.data.status == true) {
            this.$message.success("回答成功");
            this.$router.push({
              name: "Q&A",
            });
          } else {
            this.$message.error("回答失败");
          }
        });
      } else {
        this.$message.warning("请输入答案");
      }
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      uploadImg(formdata).then((res) => {
        let url = "http://162.14.64.229:8080/" + res.data.data.filePath;
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        this.$refs.md.$img2Url(pos, url);
      });
    },
  },
  mounted() {
    console.log("进入mounted");
    this.getDataFromRoute();
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
.question-wrap {
  background-color: white;
  padding: 20px;
  .title {
    font-size: 1.2em;
    font-weight: bold;
  }
  .img {
    height: 300px;
    z-index: 2147483647;
    transition: all 0.2s linear;
  }
}
.answer-wrap {
  background-color: white;
  font-size: 1.1em;
  text-align: center;
}
</style>
