<template>
    <div class="main" :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
        <div class="content">
            <div class="content-title">
                <h1>login</h1>
            </div>
            <div class="content-form">
                <div class="input">
                    <input v-model.trim="form.email" type="txt" class="input-text" autofocus="" placeholder="请输入邮箱地址">
                </div>
                <div class="input">
                    <input v-model.trim="form.password" type="password" class="input-text" autofocus=""
                        placeholder="请输入登录密码" @keyup.enter="login">
                </div>
                <div class="input">
                    <el-button type="primary" class="btn" @click="login">登录</el-button>
                </div>
                <div class="link">
                    <router-link to="/register">
                        <p class="link-a">注册</p>
                    </router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
// import { useRouter } from 'vue-router'
import api from '../api/login'
import { ElNotification } from 'element-plus'
import { h } from 'vue'

export default {
    components: {
    },
    data() {
        return {
            imageUrl: 'https://w.wallhaven.cc/full/yx/wallhaven-yxr5ld.jpg',
            form: {
                password: '',
                email: '',
            },
        }
    },
    methods: {
        login() {
            const formData = new FormData();
            formData.append("email", this.form.email)
            formData.append("password", this.form.password)
            api.login(formData).then(Response => {
                if (Response.data.code == -1) {
                    ElNotification({
                        title: '登录失败',
                        message: h('i', { style: 'color: teal' }, "邮箱或密码错误"),
                    })
                    alert(Response.data.code)
                } else if (Response.data.code == 0) {
                    ElNotification({
                        title: '登录成功',
                    })
                    // 跳转到受保护的页面
                    this.$router.push('/');
                } else {
                    console.log("error")
                }
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
    height: 40vh;
    background-color: rgba(255, 255, 255, 0.8);
    /* 白色背景透明度为50% */
    margin: 25vh auto;
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
    height: 70%;
    border-radius: 30px;
    margin: 3vh auto;
    overflow: hidden;
}

.content-form>.input {
    width: 80%;
    border-radius: 0.375rem;
    border-width: 1px;
    margin: 0 auto;
    margin-top: 20px;
    background: wheat;
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
</style>