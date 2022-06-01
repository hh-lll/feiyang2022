<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false">
      <div>
        <div>
          <a-row justify="start" :gutter="[0, 32]">
            <a-col :md="12" :sm="24">
              问题内容：
              <a-input
                placeholder="请输入问题内容"
                style="width: 150px"
                v-model="content"
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
    <a-card style="margin-top: 24px" :bordered="false" title="问题列表">
      <a-table
        :columns="columns"
        :row-key="(record) => record.questionId"
        :data-source="dataSource"
        :loading="loading"
      >
        <!-- :pagination="pagination" -->
        <!-- @change="handleTableChange" -->
        <!-- > -->
        <a-button
          slot="edit"
          slot-scope="text, record"
          @click="() => toAnswer(record)"
        >
          回答问题
        </a-button>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { renderTime } from "@/utils/render-time";
import { questionList } from "@/services/dataSource";
const columns = [
  {
    title: "问题编号",
    dataIndex: "questionId",
    // width: "20%",
  },
  {
    title: "提问内容",
    dataIndex: "questionContent",
  },
  {
    title: "提问用户ID",
    dataIndex: "userId",
  },
  {
    title: "提问时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    key: "edit",
    dataIndex: "edit",
    scopedSlots: {
      customRender: "edit",
    },
  },
];
export default {
  name: "QuestListS",
  data() {
    return {
      advanced: true,
      allQuestionNum: "",
      dataSource: [],
      columns: columns,
      content:"",
      // pagination: {
      //   total: 0,
      //   current: 1,
      //   pageSize: 8,
      //   defaultPageSize: 8,
      //   showTotal: (total) => `共 ${total} 条数据`,
      //   onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      // },
    };
  },
  methods: {
    // handleTableChange(e) {
    //   console.log(e);
    //   let that = this;
    //   let current = e.current;
    //   that.pagination.current = current;
    //   questionList(current).then(function (res) {
    //     console.log(res);
    //     that.dataSource = res.data.data.questions.map((item) => {
    //       let time = renderTime(item.createTime);
    //       let date = time.slice(0, 10);
    //       item.createTime = date;
    //       return item;
    //     });
    //     console.log(this.orderData);
    //   });
    // },
    toAnswer(record) {
      console.log("record", record);
      this.$router.push({
        name: "回答问题",
        params: record,
      });
    },
    submitQuery(){
      let that = this
    questionList(this.content).then(function (res) {
      console.log(res);
      // that.allOrderNum = res.data.otherData.page.rows;
      that.dataSource = res.data.data.questions.map((item) => {
        let time = renderTime(item.createTime);
        let date = time.slice(0, 10);
        item.createTime = date;
        return item;
      });
      // that.pagination.total = res.data.otherData.page.rows;
      console.log(that.dataSource);
    });
    },
    clearQuery(){
      this.content = ""
    }
  },
  mounted() {
    let that = this;
    console.log("进入mounted");
    //获取第一页的订单
    questionList("").then(function (res) {
      console.log(res);
      // that.allOrderNum = res.data.otherData.page.rows;
      that.dataSource = res.data.data.questions.map((item) => {
        let time = renderTime(item.createTime);
        let date = time.slice(0, 10);
        item.createTime = date;
        return item;
      });
      // that.pagination.total = res.data.otherData.page.rows;
      console.log(that.dataSource);
    });
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
