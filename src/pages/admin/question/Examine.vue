<template>
  <div>
    <div v-if="postList.length != 0" style="height: 450px;overflow: hidden;">
      <a-card v-for="(item, i) in postList" v-bind:key="i">
        <div class="qu-wrap">
          <div class="title">{{ item.title }}</div>
          <div class="time">{{ item.questTime }}</div>
        </div>
        <div class="tech-wrap">
          <!-- <img class="avatar" :src="avaUrl" /> -->
          <img class="avatar" src="@/assets/img/alipay.png" />
          <div>
            <div class="tech-info">
              <div class="id">{{ item.id }}</div>
              <div class="name">{{ item.name }}</div>
            </div>
            <div class="time">{{ item.answertTime }}</div>
          </div>
        </div>
        <div class="an-wrap">
          <p v-html="item.answer"></p>
        </div>
        <div class="operation">
          <a-button type="primary" @click="no">不通过</a-button>
          <a-button style="background-color: #17a05d; color: white"
            >通过</a-button
          >
        </div>
      </a-card>
    </div>
    <a-card v-else> 无问题需要审核 </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [
        {
          title: "电脑黑屏怎么办",
          questTime: "2022-4-15",
          id: "技术员编号",
          name: "技术员用户名",
          answertTime: "2022-5-7",
          avaUrl: "@/assets/img/alipay.png",
          answer:
            "控制面板→所有控制面板项→电源选项→编辑计划设置→使计算机进入睡眠状态为：“从不”。睡眠设置为永不睡眠或者设置自己想要得方式。2、电脑黑屏怎么办——电脑系统被破坏或中毒如果电脑系统被破坏或中毒引起的黑屏，这个好判断。直接重启开机进入bois界面或按F8看看能否进入安全模式，如果开机能出bois界面或能进安全模式就说明硬件本身没有坏，只是操作系统问题。解决方法：重新安装操作系统问题就可以解决了。",
        },
        {
          title: "怎么办",
          questTime: "2022-3-2",
          id: "技术员编号",
          name: "技术员用户名",
          answertTime: "2022-5-7",
          avaUrl: "@/assets/img/alipay.png",
          answer: "解决方法：重新安装操作系统问题就可以解决了。",
        },
      ],
      title: "电脑黑屏怎么办",
      questTime: "2022-4-15",
      id: "技术员编号",
      name: "技术员用户名",
      answertTime: "2022-5-7",
      avaUrl: "@/assets/img/alipay.png",
      answer:
        "控制面板→所有控制面板项→电源选项→编辑计划设置→使计算机进入睡眠状态为：“从不”。睡眠设置为永不睡眠或者设置自己想要得方式。2、电脑黑屏怎么办——电脑系统被破坏或中毒如果电脑系统被破坏或中毒引起的黑屏，这个好判断。直接重启开机进入bois界面或按F8看看能否进入安全模式，如果开机能出bois界面或能进安全模式就说明硬件本身没有坏，只是操作系统问题。解决方法：重新安装操作系统问题就可以解决了。",
    };
  },
  methods:{
    no(){
      this.postList.splice(0,1)
    }
  }
};
</script>

<style scoped lang="less">
.qu-wrap {
  margin: auto;
  height: 70px;
  text-align: center;
  .title {
    font-size: 30px;
    font-weight: bold;
  }
}
.tech-wrap {
  display: flex;
  height: 80px;
  .avatar {
    height: 65px;
    width: 65px;
    border-radius: 50%;
    margin: 0 30px 0 10px;
  }
  .tech-info {
    height: 40px;
    margin: auto;
    display: flex;
  }
  .id {
    font-size: 10px;
    margin-right: 20px;
  }
}
.an-wrap {
  background-color: #f3f3f3;
  min-height: 200px;
  padding: 10px;
  margin-bottom: 20px;
  p {
    line-height: 150%;
  }
}
.operation {
  margin: auto;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
