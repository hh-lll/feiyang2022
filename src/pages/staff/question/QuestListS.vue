<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="问题列表">
      <div :class="advanced ? 'search' : null">
        <a-form layout="horizontal">
          <div :class="advanced ? null : 'fold'">
            <a-row>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="规则编号"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-input placeholder="请输入" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="使用状态"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-select placeholder="请选择">
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="调用次数"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-input-number style="width: 100%" placeholder="请输入" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="更新日期"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-date-picker
                    style="width: 100%"
                    placeholder="请输入更新日期"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="使用状态"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-select placeholder="请选择">
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="描述"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-input placeholder="请输入" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <span style="float: right; margin-top: 3px">
            <a-button type="primary">查询</a-button>
            <a-button style="margin-left: 8px">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? "收起" : "展开" }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </span>
        </a-form>
      </div>
      <a-table
        :columns="columns"
        :row-key="(record) => record.questionId"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
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
      pagination: {
        total: 0,
        current: 1,
        pageSize: 8,
        defaultPageSize: 8,
        showTotal: (total) => `共 ${total} 条数据`,
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
    };
  },
  methods: {
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    handleTableChange(e) {
      console.log(e);
      let that = this;
      let current = e.current;
      that.pagination.current = current;
      questionList(current).then(function (res) {
        console.log(res);
        that.dataSource = res.data.data.questions.map((item) => {
          let time = renderTime(item.createTime);
          let date = time.slice(0, 10);
          item.createTime = date;
          return item;
        });
        console.log(this.orderData);
      });
    },
    toAnswer(record) {
      console.log("record", record);
      this.$router.push({
        name: "回答问题",
        params: record,
      });
    },
  },
  mounted() {
    let that = this;
    console.log("进入mounted");
    //获取第一页的订单
    questionList(1).then(function (res) {
      console.log(res);
      // that.allOrderNum = res.data.otherData.page.rows;
      that.dataSource = res.data.data.questions.map((item) => {
        let time = renderTime(item.createTime);
        let date = time.slice(0, 10);
        item.createTime = date;
        return item;
      });
      // that.pagination.total = res.data.otherData.page.rows;
      console.log(that.orderData);
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
