<template>
  <div class="card-list">
    <a-list
      :grid="{ gutter: 24, lg: 3, md: 3, sm: 2, xs: 1 }"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="item.add">
          <a-button class="new-btn" type="dashed" @click="addAdmin">
            <a-icon type="plus" />新增管理员
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta @click="toDetail(item)">
              <div style="margin-bottom: 3px" slot="title">
                {{ item.username }}
              </div>
              <div class="meta-content" slot="description">
                创建时间：{{ item.createtime }}
              </div>
            </a-card-meta>
            <!-- <a slot="actions">操作一</a> -->
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { adminList } from "@/services/dataSource";
import { renderTime } from "@/utils/render-time";

export default {
  name: "CardList",
  data() {
    return {
      dataSource: [],
    };
  },
  mounted() {
    let that = this;
    console.log("进入mounted");
    adminList().then(function (res) {
      console.log(res);
      that.dataSource = res.data.data.map((item) => {
        let time = renderTime(item.createtime);
        let date = time.slice(0, 10);
        item.createtime = date;
        return item;
      });
      that.dataSource.unshift({
        add: true,
      });
    });
  },
  methods: {
    toDetail(item) {
      localStorage.removeItem("adminInfo");
      localStorage.setItem("adminInfo", JSON.stringify(item));
      // console.log("toDetail",item);
      this.$router.push({
        name: "管理员详情",
        // params: item
      });
    },
    addAdmin() {
      this.$router.push({
        name: "新增管理员",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}
.new-btn {
  border-radius: 2px;
  width: 100%;
  height: 109px;
}
.meta-content {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: 34px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.operation {
  color: white;
}
</style>
