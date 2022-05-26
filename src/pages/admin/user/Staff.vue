<template>
  <div class="card-list">
    <div class="search-input">
      <a-input-search
        class="search-ipt"
        style="width: 522px; margin-bottom: 20px"
        placeholder="请输入用户名"
        size="large"
        enterButton="搜索技术员"
        v-model="searchInput"
        @search="onSearch"
      />
    </div>
    <a-list
      :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template>
          <a-card :hoverable="true">
            <a-card-meta @click="toDetail(item)">
              <div style="margin-bottom: 3px" slot="title">
                {{ item.username }}
              </div>
              <a-avatar
                class="card-avatar"
                slot="avatar"
                :src="item.avatar"
                size="large"
              />
              <div class="meta-content" slot="description">
                手机号：{{ item.phoneNumber }}
              </div>
              <div class="meta-content" slot="description">
                QQ号：{{ item.qqNumber }}
              </div>
              <div class="meta-content" slot="description">
                接单：{{ item.isAllow }}
              </div>
            </a-card-meta>

            <a
              v-if="item.isAllow"
              slot="actions"
              @click="clickAllow(item.userId, 0)"
              >禁止接单(退休)</a
            >
            <a v-else slot="actions" @click="clickAllow(item.userId, 1)"
              >允许接单</a
            >
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { staffList } from "@/services/dataSource";
import { staffAllow } from "@/services/edituser";
export default {
  name: "CardList",
  data() {
    return {
      dataSource: [],
      BdataSource: [],
      searchInput: "",
    };
  },
  methods: {
    clickAllow(userId, isALLow) {
      staffAllow(userId, isALLow).then((res) => {
        this.dataSource = this.dataSource.filter((item) => {
          if (item.userId != userId) {
            return item;
          } else {
            item.isAllow = res.data.data.isAllow;
            return item;
          }
        });
      });
    },
    onSearch() {
      console.log(this.searchInput);
      if (this.searchInput != "") {
        this.dataSource = this.BdataSource.filter((item) => {
          if (item.username.includes(this.searchInput)) {
            return item;
          }
        });
      } else {
        this.dataSource = this.BdataSource;
      }
    },
    toDetail(item) {
      console.log("toDetail",item);
      this.$router.push({
        name:"技术员详情",
        params: item
      })
    }
  },
  mounted() {
    let that = this;
    console.log("进入mounted");
    //获取所有公告
    // GetOrder().then(function (res) {
    staffList().then(function (res) {
      console.log(res);
      that.dataSource = res.data.data;
      console.log(that.dataSource);
      that.BdataSource = res.data.data;
    });
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
  height: 187px;
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
</style>
