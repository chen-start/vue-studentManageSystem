<template>
    <div class="start">
        <h1>如果没有跳转登录请点击此连接</h1>
        <a @click="toLogin">localhost:8080/login</a>
    </div>
</template>

<script>
export default {
    name: 'start',
    created(){
        this.$router.push('/login');
    },
    methods:{
        toLogin(){
            this.$router.push('/login');
        }
    }
}
</script>