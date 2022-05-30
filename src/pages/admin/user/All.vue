<template>
  <div class="card-list">
    <div class="search-input">
      <a-input-search
        class="search-ipt"
        style="width: 522px; margin-bottom: 20px"
        placeholder="请输入用户名"
        size="large"
        enterButton="搜索用户"
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
                <!-- {{ item.userId }} -->
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
          </a-card>
        </template>
      </a-list-item>
    </a-list>
    <a-list
      :grid="{ gutter: 24, lg: 3, md: 3, sm: 2, xs: 1 }"
      :dataSource="dataSourceAdmin"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template>
          <a-card :hoverable="true">
            <a-card-meta>
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
import { normalList, staffList, adminList } from "@/services/dataSource";
import { renderTime } from "@/utils/render-time";
export default {
  name: "CardList",
  data() {
    return {
      dataSource: [],
      dataSourceAdmin: [],
      BdataSource: [],
      BdataSourceAdmin: [],
      searchInput: "",
    };
  },
  methods: {
    onSearch() {
      console.log(this.searchInput);
      console.log(this.dataSource.length);
      if (this.searchInput != "") {
        this.dataSource = this.BdataSource.filter((item) => {
          if (item.username.includes(this.searchInput)) {
            return item;
          }
        });
        this.dataSourceAdmin = this.BdataSourceAdmin.filter((item) => {
          if (item.username.includes(this.searchInput)) {
            return item;
          }
        });
      } else {
        this.dataSource = this.BdataSource;
      }
    },
    toDetail(item) {
      console.log("toDetail", item);
      if (item.isStaff == 0) {
        this.$router.push({
          name: "用户详情",
          params: item,
        });
      } else {
        this.$router.push({
          name: "技术员详情",
          params: item,
        });
      }
    },
  },
  mounted() {
    let that = this;
    normalList().then(function (res) {
      that.dataSource = res.data.data;
      that.BdataSource = res.data.data;
      console.log("查询完普通用户", that.dataSource);
      staffList().then(function (res) {
        // 先将json对象转为json字符串，再替换你要替换的属性名，最后再转为json对象
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
        );
        console.log("查询完技术员", lineTocamel);
        that.dataSource = that.dataSource.concat(lineTocamel);
        console.log("合并后", that.dataSource);
        that.BdataSource = that.dataSource.concat(lineTocamel);
      });
    });
    adminList().then(function (res) {
      console.log(res);
      that.dataSourceAdmin = res.data.data.map((item) => {
        let time = renderTime(item.createtime);
        let date = time.slice(0, 10);
        item.createtime = date;
        return item;
      });
      that.BdataSourceAdmin = res.data.data.map((item) => {
        let time = renderTime(item.createtime);
        let date = time.slice(0, 10);
        item.createtime = date;
        return item;
      });
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
