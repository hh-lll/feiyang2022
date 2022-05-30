<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="问答编号"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="状态"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-select placeholder="请选择">
                <a-select-option value="1">已回答</a-select-option>
                <a-select-option value="2">未回答</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="浏览次数"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input-number style="width: 100%" placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
          <a-row v-if="advanced">
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="提问日期"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-date-picker style="width: 100%" placeholder="请输入更新日期" />
            </a-form-item>
          </a-col>
          
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="描述"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{advanced ? '收起' : '展开'}}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
      </a-form>
    </div>
    <div>
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
    </div>
  </a-card>
</template>

<script>
import { questionandpostList } from "@/services/dataSource";
const columns = [
  {
    title: '问答编号',
    dataIndex: 'post_id'
  },
  {
    title: '发布时间',
    dataIndex: 'post_time',
    // sorter: true
  },
  {
    title: '问题内容',
    dataIndex: 'question_content',
    sortDirections: ['descend', 'ascend'],
    sortOrder: 'ascend',
    sorter: (a, b) => a.question_id - b.question_id,
  },
  // {
  //   title: '回答内容',
  //   dataIndex: 'post_content',
  // },
  {
    title: '回答技术员',
    dataIndex: 'post_username',
  },
  {
    title: '访问量',
    dataIndex: 'visit_count',
  },
  {
    title: '查看详情',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'QueryList',
  // components: {StandardTable},
  data () {
    return {
      advanced: true,
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
    }
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
      questionandpostList(current).then(function (res) {
        console.log(res);
        that.questData = res.data.data.posts;
        console.log(that.questData);
      });
    },
    toQandADetail(){

    },
  },
  mounted(){
      let that = this;
    questionandpostList(1).then((res) => {
      console.log(res);
      that.questData = res.data.data.posts
      that.pagination.total = res.data.data.totalCount;
      console.log("that.questDatathat.questDatathat.questData",that.questData);
    }).catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
