var baseUrl = "https://www.manjiexiang.cn/";//https://blog.manjiexiang.cn/ http://192.168.0.110:8000/
module.exports={
  getOpenId: baseUrl.concat('edu/getOpenId?code='), //openid
  postUserInfo: baseUrl.concat('edu/postUserInfo'),//用户信息
  getMission: baseUrl.concat('api/result/'), //用户关卡
  getQues:baseUrl.concat('api/p_ques/'), //小学题目
  getQuesM: baseUrl.concat('api/m_ques/'), //初中题目
  postPoint: baseUrl.concat('edu/postPoint/'), //结果提交
  rank:baseUrl.concat('api/rank'),  //排行榜
  wrongQues: baseUrl.concat('api/wrongQues'),  //错题集
  postError: baseUrl.concat('edu/postError'), //纠错
  error:baseUrl.concat('api/error'), //错题集
  postAdvice: baseUrl.concat('edu/postAdvice'), //纠错
  sentence: baseUrl.concat('api/sentence'), //句子
  postCopy: baseUrl.concat('edu/postCopy'), //复制提交

}