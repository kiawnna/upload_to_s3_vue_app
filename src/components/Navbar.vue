<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/home" class="navbar-brand">SurvTech Batch App</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/home" class="nav-link">Submit Jobs</router-link>
                </li>
            </ul>
            <ul class="navbar-nav float-right">
                <li class="nav-item">
                    <amplify-sign-out></amplify-sign-out>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar'
    }
</script>

<style scoped>
    .navbar {
        margin-bottom: 60px;
    }
</style>
