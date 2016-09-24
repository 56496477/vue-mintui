<template>
    <div>

        <m-header fixed title="首页"></m-header>
        <div class="con">
            <m-loadmore :top-method="loadTop" :top-status.sync="topStatus">
                <div v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <m-cell v-for="item in items" :title="item.title" :label="item.last_reply_at"></m-cell>
                </div>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">
                        <m-spinner type="snake"></m-spinner>
                    </span>
                </div>
                <p v-show="loading" class="page-infinite-loading">
                    <m-spinner type="fading-circle"></m-spinner>
                    加载中...
                </p>
            </m-loadmore>

        </div>
    </div>
</template>

<script>
    import {
        Header,
        Cell,
        Loadmore,
        Spinner
    } from 'mint-ui'

    export default {
        components: {
            MHeader: Header,
            MCell: Cell,
            MLoadmore: Loadmore,
            MSpinner: Spinner
        },
        data() {
            return {
                items: [],
                limit: 20,
                topStatus: ''
            }
        },
        methods: {
            getList: function() {
                this.$http.get('https://cnodejs.org/api/v1/topics/?page=1&tab=all&limit=' + this.limit)
                    .then((res) => {
                        this.items = res.data.data;
                    })
                    .catch((res) => {
                        console.log('error')
                    })
            },
            loadTop: function(id) {
                setTimeout(() => {
                    this.$http.get('https://cnodejs.org/api/v1/topics/?page=1&tab=all&limit=20')
                        .then((res) => {
                            this.items = res.data.data;
                            this.$broadcast('onTopLoaded', id);
                        })
                        .catch((res) => {
                            console.log('error')
                        })
                }, 1000)
            },
            loadMore: function() {
                this.loading = true;
                this.limit += 20;
                setTimeout(() => {
                    this.getList();
                    this.loading = false;
                }, 1500);
            }
        },
        ready() {
            console.log('ready......')
            this.getList();
        }
    }
</script>

<style>
    .con {
        margin-top: 40px;
    }
    
    .mint-spinner {
        display: inline-block;
        vertical-align: middle;
    }
    
    .mint-spinner-snake {
        margin: 0 auto;
    }
</style>