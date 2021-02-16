<template>
    <div class = "row">
        <div class="col-md-12" style="visibility:hidden">
            <p>Tell me more about your in order to be contacted</p>
        </div>
        <div class="col-md-12 msg-container">
            <div class = "msg-icon">
                <v-icon name="alert-triangle" class = 'icon-failed'></v-icon>
            </div>
            <h5>Sorry, we didn't successed to submit your request</h5>
            <p>we are currently having some issue, please try again.</p>

            <button class="back" @click="back()">Go back to website</button>
        </div>
    </div>
</template>

<script>
export default {
    name : "ErrorComponent",
    methods : {
        back() {
            this.$emit('destroy')
        }
    }
}
</script>

<style scoped lang="scss">
.msg-container {
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    .msg-icon {
        width : 15%;
    }
    .icon-failed {
        font-size : 50px;
        font-weight : bold;
        color : #ff3344;
    }
    h2, h3,h4,h5 {
        margin-top : 15px;
        margin-bottom: 15px;
    }
    .back{
        margin-top : 30px;
        border : 1px solid  #3333ff;
        padding : 5px 20px;
        color : #3333ff;
        font-weight : bold;
    }
}
button {
    background : white;
}
</style>