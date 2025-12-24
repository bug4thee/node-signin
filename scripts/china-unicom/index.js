const axios = require("axios");
// 引入server酱
const sendServer = require("../../thirdpart/serverChan");

// 请求地址
const daySigninUrl = "https://activity.10010.com/sixPalaceGridTurntableLottery/signin/daySign";

// 获取 cookie 值
const cookieValue = process.env.CHINA_UNICOM_SIGNIN_COOKIE?.trim();

class UnicomSign {
  constructor(headers) {
    this.msgTitle = "中国联通签到";
    this.headers = headers;
  }
  async daysign() {
    const { data } = await axios.post(
      daySigninUrl,
      {},
      { headers: this.headers }
    );
    const { code, data: signData, desc } = data;
    if (code == "0000") {
      const { redSignMessage } = signData
      console.log("✓ 联通签到成功！", `抽奖奖励：${redSignMessage}`);
      sendServer(`${this.msgTitle}：成功`, `抽奖奖励：${redSignMessage}`);
    } else {
      console.log("✗ 联通签到失败！", desc);
      sendServer(`${this.msgTitle}：失败`, desc);
    }
  }
}

const headers = {
  "user-agent":
    "Mozilla/5.0 (Linux; Android 16; PLC110 Build/BP2A.250605.015; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/139.0.7258.94 Mobile Safari/537.36; unicom{version:android@12.0800,desmobile:0};devicetype{deviceBrand:OnePlus,deviceModel:PLC110};OSVersion/16;ltst;",
  referer: "https://img.client.10010.com",
  origin: "https://img.client.10010.com",
  "content-type": "application/x-www-form-urlencoded",
  cookie: cookieValue,
  accept: "application/json, text/plain, */*",
};

if (cookieValue) {
  const unicom = new UnicomSign(headers);
  unicom.daysign();
} else {
  console.log("✗ 执行中断，环境变量未配置：CHINA_UNICOM_SIGNIN_COOKIE");
}
