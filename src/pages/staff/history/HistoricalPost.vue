<template>
  <a-card>
    <div>
      <a-table
        :columns="columns"
        :row-key="(record) => record.postId"
        :data-source="postData"
        :loading="loading"
      >
        <!-- :pagination="pagination"
        @change="handleTableChange" -->
        <a-button
          slot="action"
          slot-scope="text, record"
          @click="() => toPostDetail(record)"
        >
          详情
        </a-button>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { postList } from "@/services/dataSource";
import { mapGetters } from "vuex";
import { renderTime } from "@/utils/render-time";
const columns = [
  {
    title: '回答编号',
    dataIndex: 'postId'
  },
  {
    title: '发布时间',
    dataIndex: 'createTime',
  },
  {
    title: '问题编号',
    dataIndex: 'relatedQuestionId',
    sorter: (a, b) => a.relatedQuestionId - b.relatedQuestionId
  },
  {
    title: '访问数',
    dataIndex: 'visitCount',
  },
  {
    title: '审核状态',
    dataIndex: 'status',
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]


export default {
  name: 'QueryList',
  computed: {
    ...mapGetters("account", ["user"]),
  },
  // components: {StandardTable},
  data () {
    return {
      columns: columns,
      postData: [],
    }
  },
  methods: {
    toPostDetail(record){
      localStorage.removeItem("postID");
      localStorage.setItem("postID", JSON.stringify(record.postId));
      localStorage.removeItem("postStatus");
      localStorage.setItem("postStatus", JSON.stringify(record.status));
      console.log("record", record);
      this.$router.push({
        name: "问答详情",
        // params: record,
      });
    }
  },
  mounted(){
    let that = this
    postList(this.user.userId).then((res) => {
      that.postData = res.data.data.staff.map((item)=>{
        item.createTime=renderTime(item.createTime)
        return item;
      })
      console.log(res);
      console.log(that.postData);
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
