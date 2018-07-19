var baseUrl = "http://192.168.1.100:8000/";
module.exports={
  getOpenId: baseUrl.concat('edu/getOpenId?code='), //openid
  postUserInfo: baseUrl.concat('edu/postUserInfo'),//用户信息
  getMission: baseUrl.concat('api/result/'), //用户关卡
  getQues:baseUrl.concat('api/p_ques/'), //题目
  postResult: baseUrl.concat('edu/postResult/'), //结果提交
}