<script setup>
import { InputText } from 'primevue'
import { ref } from 'vue';
import piracyInfo from "@/assets/piracy-info.json"
import Bili from "@/assets/source-logo/B站.svg"
import XHShu from "@/assets/source-logo/小红书.svg"
import DouYin from "@/assets/source-logo/抖音.svg"
import KShou from "@/assets/source-logo/快手.svg"
import XiGua from "@/assets/source-logo/西瓜视频.svg"
import TTiao from "@/assets/source-logo/今日头条.svg"
import TieBa from "@/assets/source-logo/百度贴吧.svg"
import Baidu from "@/assets/source-logo/百度.svg"
import WeiBo from "@/assets/source-logo/新浪微博.svg"

const vidID = ref("")
const selectedSource = ref({ icon: Bili, value: 'Bili' })
const sourceOptions = ref([
    { icon: Bili, value: 'Bili' },
    { icon: XHShu, value: 'XHShu' },
    { icon: DouYin, value: 'DouYin' },
    { icon: KShou, value: 'KShou' },
    { icon: TTiao, value: 'TTiao' },
    { icon: Baidu, value: 'Baidu' },
    { icon: WeiBo, value: 'WeiBo' },
])

const entryHint = ref({
  "Bili":"[B站域名]/video/[->这一部分<-]",
  "XHShu":"[小红书域名]/discovery/item/[->这一部分<-]?...",
  "DouYin":"[抖音域名]/[->这一部分<-]/",
  "KShou":"[快手域名]/f/[->这一部分<-]",
  "TTiao":"[头条域名]/video/[->这一部分<-]/",
  "Baidu":"[百度域名]/r/[->这一部分<-]?...",
  "WeiBo":"[微博域名]/[->含中间斜杠/的两部分<-]"
})

const resultTitle = ref("❓尚未输入内容")
const resultSummary = ref("请输入各平台的视频编码，来查找其是否存在盗运的情况")
const resultDetail = ref("访问<a>主页</a>以举报盗运的视频或对已有条目进行申诉和修正")

function searchPiracy(){
  if(!vidID.value){
    resultTitle.value = "❓尚未输入内容"
    resultSummary.value = "请输入各平台的视频编码，来查找其是否存在盗运的情况"
    resultDetail.value = "访问<a>主页</a>以举报盗运的视频或对已有条目进行申诉和修正"
  }
  else{
    let searchSource = selectedSource.value['value']
    //console.log(searchSource)
    let searchResult = undefined
    try{
      searchResult = piracyInfo[searchSource][vidID.value]
    }
    catch(err){

    }
    //console.log(searchResult)
    if( searchResult != undefined ){
      //searchResult = searchResult[vidID.value]
      resultTitle.value = "✔️找到了被盗运的视频"
      resultSummary.value = "原视频的来源是<strong>"+searchResult["sourcesite"]+"</strong>"
      resultDetail.value = "链接详情请<a target=\"_blank\" href=\""+searchResult["sourcelink"]+"\">点此跳转</a>"
    }
    else{
      resultTitle.value = "❌未找到被盗运的视频"
      resultSummary.value = "请确认输入的编码格式正确，且正确选择了对应的平台"
      resultDetail.value = "此项目依赖社区的举报，我们欢迎您为此做出贡献"
  }
  }
  
}

console.log(piracyInfo)

</script>

<template>
  <header>
    <h1>你可能是视频盗运的受害者！</h1>
    <h2>输入相关编号，查看视频来源↓</h2>
  </header>

  <main>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <SelectButton v-model="selectedSource" :options="sourceOptions" data-key="value" :allow-empty="false" v-on:change="searchPiracy()" fluid="fluid">
        <template #option="slotProps">
          <img :src="slotProps.option.icon" alt="icon" style="width: 20px; height: 20px;"/>
        </template>
      </SelectButton>
      <InputText v-model="vidID" :placeholder="entryHint[selectedSource['value']]" fluid="fluid" v-on:input="searchPiracy()"/>
      <Card style="width: 28rem;">
        <template #title>{{ resultTitle }}</template>
        <template #content>
            <p class="m-0">
              <span v-html="resultSummary"></span>
            </p>
            <p>
              <span v-html="resultDetail"></span>
            </p>
        </template>
      </Card>
    </div>
  </main>
</template>

<style scoped>

</style>
