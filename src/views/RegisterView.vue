<template>
    <div class="main" :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
        <div class="content">
            <div class="content-title">
                <h1>register</h1>
            </div>
            <div class="content-form">
                <div class="input">
                    <input v-model.trim="form.email" type="txt" class="input-text" autofocus="" placeholder="请输入邮箱地址">
                </div>
                <div class="input">
                    <input v-model.trim="form.password1" type="password" class="input-text" autofocus=""
                        placeholder="请输入登录密码">
                </div>
                <div class="input">
                    <input v-model.trim="form.password2" type="password" class="input-text" autofocus=""
                        placeholder="请输入确认密码">
                </div>
                <div class="input">
                    <div class="content-left">
                        <div v-if="isPerson">
                            <el-result style="float: left; margin-left: 40px;" icon="success"></el-result>
                            <span style="line-height: 48px; margin-left: 10px;">验证成功</span>
                        </div>

                    </div>
                    <div class="content-right">
                        <el-button type="info" class="btn-verify" @click="recaptcha">进行人机身份验证</el-button>
                    </div>
                </div>
                <div class="input">
                    <el-button type="primary" class="btn" @click="register">注册</el-button>
                </div>
                <div class="link">
                    <router-link to="/login">
                        <p class="link-a">登录</p>
                    </router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import api from '../api/register'
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import { isValidPassword, isValidEmail } from '../utils/check.js'

export default {
    components: {
    },
    data() {
        return {
            imageUrl: 'https://w.wallhaven.cc/full/yx/wallhaven-yxr5ld.jpg',
            form: {
                email: '',
                password1: '',
                password2: '',
                token: '',
            },
            isPerson: false,
        }
    },
    methods: {
        async recaptcha() {
            await this.$recaptchaLoaded()

            this.form.token = await this.$recaptcha('login')

            this.isPerson = true;
        },
        async register() {
            if (this.form.email == '') {
                ElNotification({
                    title: '信息不全',
                    message: h('i', { style: 'color: teal' }, '邮箱为空'),
                })
                return
            }
            if (this.form.password1 == '') {
                ElNotification({
                    title: '信息不全',
                    message: h('i', { style: 'color: teal' }, '登录密码为空'),
                })
                return
            }
            if (this.form.password2 == '') {
                ElNotification({
                    title: '信息不全',
                    message: h('i', { style: 'color: teal' }, '确认密码为空'),
                })
                return
            }
            if (this.form.token == '') {
                ElNotification({
                    title: '人机检测',
                    message: h('i', { style: 'color: teal' }, '未进行人机身份检测'),
                })
                return
            }
            if (!isValidEmail(this.form.email)) {
                ElNotification({
                    title: '信息错误',
                    message: h('i', { style: 'color: teal' }, '邮箱格式错误'),
                })
                return
            }
            if (this.form.password1 != this.form.password2) {
                ElNotification({
                    title: '信息错误',
                    message: h('i', { style: 'color: teal' }, '密码不一致'),
                })
                return
            }
            if (!isValidPassword(this.form.password1)) {
                ElNotification({
                    title: '信息错误',
                    message: h('i', { style: 'color: teal' }, '密码长度6-16位字符,包含数字与字母，不为空'),
                })
                return
            }

            const formData = new FormData();
            formData.append("email", this.form.email)
            formData.append("password", this.form.password1)
            formData.append("token", this.form.token)
            const loading = this.$loading({
                lock: true,
                text: '邮件发送中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            await api.register(formData).then(Response => {
                loading.close();
                if (Response.data.code == -1) {
                    ElNotification({
                        title: '注册失败',
                        message: h('i', { style: 'color: teal' }, Response.data.message),
                    })
                } else if (Response.data.code == 0) {
                    ElNotification({
                        title: '邮件发送成功',
                        message: h('i', { style: 'color: teal' }, "邮件已发送至您的邮箱，请进行验证"),
                    })
                } else {
                    console.log("error")
                }
                this.form.token = ''
                this.isPerson = false;
            })
        }
    }
}


</script>

<style scoped>
/* 添加样式 */
.main {
    width: 100vw;
    height: 100vh;
    background-size: 100% 100%;
    /* 设置背景图片大小为容器的宽度和高度 */
    overflow: hidden;
}

.main>.content {
    width: 30vw;
    height: 56vh;
    background-color: rgba(255, 255, 255, 0.8);
    /* 白色背景透明度为50% */
    margin: 22vh auto;
    border-radius: 30px;
    overflow: hidden;
}

.content>.content-title {
    width: 90%;
    height: 15%;
    border-radius: 30px;
    margin: 1vh auto;
}

.content-title>h1 {
    padding-top: 2vh;
    text-align: center;
    color: black;
}

.content>.content-form {
    width: 90%;
    height: 75%;
    border-radius: 30px;
    margin: 1vh auto;
    overflow: hidden;
}

.content-form>.input {
    width: 80%;
    border-radius: 0.375rem;
    border-width: 1px;
    margin: 0 auto;
    margin-top: 20px;
    /* background: wheat; */
    overflow: hidden;
}

.input-text {
    width: 100%;
    border-radius: 0.375rem;
    border-width: 1px;
    border: 1px solid rgb(137, 137, 146);
    padding: 1rem;
    font-size: 16px;
    font-family: inherit;
    color: rgb(94 94 114);
}

.content-form>.link {
    width: 80%;
    border-radius: 0.375rem;
    border-width: 1px;
    text-align: right;
    margin: 0 auto;
    margin-top: 10px;
    padding-right: 20px;
}

.link>.link-a:hover {
    cursor: pointer;
    /* 设置鼠标停留时为小手 */
}

.input .btn {
    width: 100%;
    height: 100%;
    padding: 1rem;
    font-size: 18px;
    font-weight: 600;
}

.btn-verify {
    width: 100%;
    height: 100%;
    padding: 1rem;
    font-size: 18px;
    font-weight: 600;
}

.input .content-left {
    float: left;
    width: 50%;
    height: 48px;
    background: field;
}

.input .content-right {
    float: right;
    width: 50%;
    height: 48px;
    background: yellow;
}

.el-result {
    padding: 0;
    margin-top: 8px;
}

::v-deep .el-result__icon svg {
    height: 30px;
    width: 30px;
}
</style>