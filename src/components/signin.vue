<template>
    <div>
        <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
    </div>
</template>

<script>
    import {AmplifyEventBus} from 'aws-amplify-vue';
    export default {
        name: 'signin',
        mounted() {
            const _this = this;
            AmplifyEventBus.$on('authState', info => {
                if (info == 'signedIn') {
                    _this.$router.push('/home')
                }
            });
        },
        data() {
            return {
                authConfig: {
                    signUpConfig: {
                        signUpFields: []
                    }
                },
                identityPool: process.env.VUE_APP_IDENTITY_POOL_ID
            }
        }
    }
</script>

<style>
    h1 {
        margin-bottom: 60px;
    }
</style>
