<template>
    <div>
        <input type="text" v-model="user.name">
        <input type="text" v-model="user.password">
        <button @click="register">register</button>
    </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import r from "../../api/user/register"
export default defineComponent({
    name: 'register',
    setup() {
        const user = reactive({
            name: "",
            password: ""
        })

        const register = async () => {
            const res = await r(user)
            console.log(res);
        }


        return { user, register }
    }
})
</script>