<template>
  <div>
    <a-card :bordered="false">
      <div>
        <div>
          <a-row justify="start">
            <a-col :md="12" :sm="24">
              提问内容：
              <a-input
                placeholder="请输入提问内容"
                style="width: 150px"
                v-model="content"
              />
            </a-col>
            <a-col :md="12" :sm="24">
              审核状态：
              <a-select
                placeholder="请选择"
                ref="select"
                v-model="status"
                style="width: 120px"
              >
                <a-select-option value="未审核">未审核</a-select-option>
                <a-select-option value="已审核">已审核</a-select-option>
                <a-select-option value="所有">所有</a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-row :gutter="[0, 32]">
            <a-col :md="12" :sm="24">
              提问用户姓名：
              <a-input
                style="width: 150px"
                placeholder="请输入用户姓名"
                v-model="questionUsername"
              />
            </a-col>
            <a-col :md="12" :sm="24">
              回答技术员姓名：
              <a-input
                style="width: 150px"
                placeholder="请输入技术员姓名"
                v-model="postUsername"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="12" :sm="24">
              浏览量大于：
              <a-input-number
                style="width: 150px"
                :min="0"
                placeholder="请输入浏览量"
                v-model="visitCount"
              />
            </a-col>
            <a-col :md="12" :sm="24"> </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px">
          <a-button type="primary" @click="submitQuery">查询</a-button>
          <a-button style="margin-left: 8px" @click="clearQuery">重置</a-button>
        </span>
      </div>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
      <a-table
        :pagination="pagination"
        :loading="loading"
        :row-key="(record) => record.post_id"
        @change="handleTableChange"
        :columns="columns"
        :data-source="questData"
      >
        <a-button
          slot="action"
          slot-scope="text, record"
          @click="() => toQandADetail(record)"
        >
          详情
        </a-button>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { questionandpostList } from "@/services/dataSource";
import { renderTime } from "@/utils/render-time";
const columns = [
  {
    title: "问答编号",
    dataIndex: "post_id",
  },
  {
    title: "发布时间",
    dataIndex: "post_time",
    // sorter: true
  },
  {
    title: "问题内容",
    dataIndex: "question_content",
    sortDirections: ["descend", "ascend"],
    sortOrder: "ascend",
    sorter: (a, b) => a.question_id - b.question_id,
  },
  // {
  //   title: '回答内容',
  //   dataIndex: 'post_content',
  // },
  {
    title: "回答技术员",
    dataIndex: "post_username",
  },
  {
    title: "访问量",
    dataIndex: "visit_count",
  },
  {
    title: '审核状态',
    dataIndex: 'status',
  },
  {
    title: "查看详情",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "QueryList",
  // components: {StandardTable},
  data() {
    return {
      columns: columns,
      questData: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 8,
        defaultPageSize: 8,
        showTotal: (total) => `共 ${total} 条数据`,
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
      content: "",
      postUsername: "",
      questionUsername: "",
      visitCount: -1,
      status: "所有",
    };
  },
  methods: {
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    submitQuery() {
      let that = this;
      let content = this.content;
      let postUsername = this.postUsername;
      let questionUsername = this.questionUsername;
      let visitCount = this.visitCount;
      let status = this.status;
      if (content == "") {
        content = null;
      }
      if (postUsername == "") {
        postUsername = null;
      }
      if (questionUsername == "") {
        questionUsername = null;
      }
      if(visitCount == -1){
        visitCount = null;
      }
      if (status == "所有") {
        status = null;
      } else if (status == "已审核") {
        status = 1;
      } else {
        status = 0;
      }
      questionandpostList(
        1,
        content,
        postUsername,
        questionUsername,
        visitCount,
        status
      ).then(function (res) {
        console.log(res);
        that.questData = res.data.data.posts.map((item)=>{
          item.post_time = renderTime(item.post_time);
          return item;
        });
        that.pagination.total = res.data.data.totalCount;
        console.log(that.questData);
      });
    },
    handleTableChange(e) {
      console.log(e);
      let that = this;
      let current = e.current;
      that.pagination.current = current;
      let content = this.content;
      let postUsername = this.postUsername;
      let questionUsername = this.questionUsername;
      let visitCount = this.visitCount;
      let status = this.status;
      if (content == "") {
        content = null;
      }
      if (postUsername == "") {
        postUsername = null;
      }
      if (questionUsername == "") {
        questionUsername = null;
      }
      if (status == "所有") {
        status = null;
      } else if (status == "已审核") {
        status = 1;
      } else {
        status = 0;
      }
      questionandpostList(
        current,
        content,
        postUsername,
        questionUsername,
        visitCount,
        status
      ).then(function (res) {
        console.log(res);
        that.questData = res.data.data.posts.map((item)=>{
          item.post_time = renderTime(item.post_time);
          return item;
        });
        console.log(that.questData);
      });
    },
    toQandADetail(record) {
      localStorage.removeItem("postID");
      localStorage.setItem("postID", JSON.stringify(record.post_id));
      localStorage.removeItem("postStatus");
      localStorage.setItem("postStatus", JSON.stringify(record.status));
      console.log("record", record);
      this.$router.push({
        name: "问答详情",
        // params: record,
      });
    },
  },
  mounted() {
    let that = this;
    questionandpostList(1)
      .then((res) => {
        console.log(res);
        that.questData = res.data.data.posts.map((item)=>{
          item.post_time = renderTime(item.post_time);
          return item;
        });
        that.pagination.total = res.data.data.totalCount;
        console.log(
          "that.questDatathat.questDatathat.questData",
          that.questData
        );
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
