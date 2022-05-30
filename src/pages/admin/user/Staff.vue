<template>
  <div class="card-list">
    <div style="display: flex">
      用户名：<a-input
        class="search-ipt"
        style="width: 200px; margin: 0 20px 20px 0;"
        placeholder="请输入用户名"
        size="middle"
        v-model="searchInput"
      />
      年份：
      <a-select :default-value="year" style="width: 120px" @change="changeYear">
        <a-select-option :value="item" :key="i" v-for="(item, i) in yearList">
          {{ item }}
        </a-select-option>
      </a-select>
      <a-button @click="onSearch">搜索</a-button>
        <!-- enterButton="搜索技术员"
         -->
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
                :src="item.avatarUrl"
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
      yearList: [],
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
      localStorage.removeItem("staffID");
      localStorage.setItem("staffID", JSON.stringify(item.userId));
      console.log("toDetail", item);
      this.$router.push({
        name: "技术员详情",
        // params: item
      });
    },
  },
  mounted() {
    let that = this;
    console.log("进入mounted");
    let nowdate = new Date();
    let year = nowdate.getFullYear();
    year++;
    console.log(year);
    for (let i = 0; i < 5; i++) {
      this.yearList.push(year--);
      console.log("第" + i + "个" + this.yearList[i]);
    }
    staffList().then(function (res) {
      console.log(res);
      let lineTocamel = JSON.parse(
        JSON.stringify(res.data.data)
          .replace(/receive_interval/g, "receiveInterval")
          .replace(/create_time/g, "createTime")
          .replace(/is_staff/g, "isStaff")
          .replace(/is_vip/g, "isVip")
          .replace(/order_transfer/g, "orderTransfer")
          .replace(/qq_number/g, "qqNumber")
          .replace(/vip_id/g, "vipId")
          .replace(/is_ban/g, "isBan")
          .replace(/next_time/g, "nextTime")
          .replace(/user_id/g, "userId")
          .replace(/repair_count/g, "repairCount")
          .replace(/last_time/g, "lastTime")
          .replace(/phone_number/g, "phoneNumber")
          .replace(/is_allow/g, "isAllow")
          .replace(/post_count/g, "postCount")
          .replace(/avatar_url/g, "avatarUrl")
      );
      that.dataSource = lineTocamel;
      that.BdataSource = lineTocamel;
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
