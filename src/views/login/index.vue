<template>
    <div class="login">
        <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)"/>
        <div class="container">
            <div class="title">
                <h3>手机号登录</h3>
                <p>未注册的手机号登录后将自动注册</p>
            </div>
            <div class="form">
                <div class="form-item">
                    <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
                </div>
                <div class="form-item">
                    <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
                    <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode" >
                </div>
                <div class="form-item">
                    <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
                    <button @click="getCode">
                        {{ second === totalSecond ? '获取验证码' : second + '秒后重新获取'}}
                    </button>
                </div>
            </div>
            <div @click="login" class="login-btn">登录</div>
        </div>
    </div>
</template>

<script scope>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
    name:'Login',
    data(){
        return{
            picUrl:'',     //存储请求渲染的图片地址
            picKey:'',       //将来请求传递的图片验证码唯一标识
            totalSecond:60,     //总秒数
            second: 60,           //倒计时开始秒数
            timer: null,      //定时器id
            mobile:'' ,         //手机号码
            picCode:'',    //输入的图形验证码
            msgCode: ''     //短信验证码
        }
    },
    created(){
        this.getPicCode();
    },
    methods:{
        async getPicCode(){
            const { data: { base64, key }} = await getPicCode()
            this.picUrl = base64;
            this.picKey = key;
        },


        //封装校验方法  手机号，验证码是否合法
        vailFn(){
            if(!/^1[3-9]\d{9}$/.test(this.mobile)){
                this.$toast('请输入正确的手机号码')
                return false
            }
            if(!/^\w{4}$/.test(this.picCode)){
                this.$toast('请输入正确的验证码')
                return false
            }
            return true
        },

        //获取短信验证码
        async getCode(){
            if(!this.vailFn()){
                return
            }

            //发送短信
            const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
            // console.log(res)
            this.$toast('短信发送成功')

            if(!this.timer && this.second === this.totalSecond){
                //开启倒计时
                this.timer = setInterval(()=> {
                    this.second--
                    if (this.second <= 0) {
                        clearInterval(this.timer)
                        this.timer = null
                        this.second = this.totalSecond
                    }
                }, 1000)
                this.$toast('短信发送成功')
            }
        },

        //登录
        async login(){
            if(!this.vailFn()){
                return
            }
            if(!/^\d{6}$/.test(this.msgCode)){
                return
            }

            const res = await codeLogin(this.mobile, this.msgCode)
            this.$store.commit('user/setUserInfo', res.data)
            this.$toast('登录成功')
            this.$router.push('/')
            console.log(res)
        },

        //销毁定时器
        destroyed(){
            clearInterval(this.timer)
        }
    }
    
}


</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ec3c3c,#ff1115);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>