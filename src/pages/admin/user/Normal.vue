<template>
  <div class="card-list">
    <div class="search-input">
      <a-input-search
        class="search-ipt"
        style="width: 522px; margin-bottom: 20px"
        placeholder="请输入用户名"
        size="large"
        enterButton="搜索普通用户"
        v-model="searchInput"
        @search="onSearch"
      />
    </div>
    <a-list
      :grid="{ gutter: 24, lg: 3, md: 3, sm: 2, xs: 1 }"
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
            </a-card-meta>
            <a
              v-if="item.isBan"
              slot="actions"
              @click="clickBan(item.userId, 0)"
              >解除禁用</a
            >
            <a v-else slot="actions" @click="clickBan(item.userId, 1)">禁用</a>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { normalList } from "@/services/dataSource";
import { userUrban } from "@/services/edituser";
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
    clickBan(userId, isBan) {
      userUrban(userId, isBan).then((res) => {
        this.dataSource = this.dataSource.filter((item) => {
          if (item.userId != userId) {
            return item;
          } else {
            item.isBan = res.data.data.userInfo.isBan;
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
        name:"用户详情",
        params: item
      })
    }
    
			// toEditDish(record) {
			// 	this.$router.push({
			// 		name: "editdish",
			// 		params: record
			// 	})
			// },
  },
  mounted() {
    let that = this;
    normalList().then(function (res) {
      that.dataSource = res.data.data;
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
.operation {
  color: white;
}
</style>
