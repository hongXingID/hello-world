

const admin = new Vue({
    el: "#admin",
    data: {
        //左侧列表
        mainLeftList: ["管理员管理", "博文管理", "评论管理", "每日一句管理", "留言管理", "标签管理"],

        //limit统一为10
        limit: 10,

        // 模块显示
        adminDisplay: "block",
        blogPostDisplay: "none",
        commentDisplay: "none",
        everydayDisplay: "none",
        messageDisplay: "none",
        tagDisplay: "none",

        // 管理员管理
        clickIndex: 0,
        adminCount: 0,
        adminList: [],
        username: "",
        password: "",

        //博文管理
        blogPostList: [],
        blogPostCount: 0,
        blogPostPage: 1,

        //评论管理
        commentList: [],
        commentCount: 0,
        commentPage: 1,

        //每日一句管理
        sayingList: [],
        sayingCount: 0,
        sayingPage: 1,

        //留言管理
        messageList: [],
        messageCount: 0,
        messagePage: 1,

        //标签管理
        tagList: [],
        tagCount: 0,
        tagPage: 1,

    },
    methods: {
        // 处理左侧列表的选中背景
        handleClick(e) {
            this.clickIndex = +e.path[0]["dataset"]["index"];
            if (this.clickIndex === 0) {
                this.adminDisplay = "block";
                this.blogPostDisplay = "none";
                this.commentDisplay = "none";
                this.everydayDisplay = "none";
                this.messageDisplay = "none";
                this.tagDisplay = "none";
            } else if (this.clickIndex === 1) {
                this.adminDisplay = "none";
                this.blogPostDisplay = "block";
                this.commentDisplay = "none";
                this.everydayDisplay = "none";
                this.messageDisplay = "none";
                this.tagDisplay = "none";
            } else if (this.clickIndex === 2) {
                this.adminDisplay = "none";
                this.blogPostDisplay = "none";
                this.commentDisplay = "block";
                this.everydayDisplay = "none";
                this.messageDisplay = "none";
                this.tagDisplay = "none";
            } else if (this.clickIndex === 3) {
                this.adminDisplay = "none";
                this.blogPostDisplay = "none";
                this.commentDisplay = "none";
                this.everydayDisplay = "block";
                this.messageDisplay = "none";
                this.tagDisplay = "none";
            } else if (this.clickIndex === 4) {
                this.adminDisplay = "none";
                this.blogPostDisplay = "none";
                this.commentDisplay = "none";
                this.everydayDisplay = "none";
                this.messageDisplay = "block";
                this.tagDisplay = "none";
            } else if (this.clickIndex === 5) {
                this.adminDisplay = "none";
                this.blogPostDisplay = "none";
                this.commentDisplay = "none";
                this.everydayDisplay = "none";
                this.messageDisplay = "none";
                this.tagDisplay = "block";
            }
        },

        // 点击管理员管理发生的事件
        deleteAdmin(e) {
            if (this.adminList.length !== 1) {
                const adminId = e.path[0]["dataset"]["index"]
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;
                    axios({
                        method: "delete",
                        url: "http://localhost:6060/api/blogLogin/" + adminId,
                    }).then(() => {
                        axios({
                            method: "get",
                            url: "http://localhost:6060/api/blogLogin"
                        }).then(res => {
                            this.adminCount = res.data.data.count;
                            this.adminList = res.data.data.rows;
                            isAxios = true;
                        })
                    })

                }
            }
        },
        addAdmin() {
            axios({
                method: "post",
                url: "http://localhost:6060/api/blogLogin/addAdmin",
                data: {
                    loginId: this.username,
                    loginPwd: this.password
                }
            });
            axios({
                method: "get",
                url: "http://localhost:6060/api/blogLogin"
            }).then(res => {
                this.adminCount = res.data.data.count;
                this.adminList = res.data.data.rows
            })

        },

        //点击博文管理发生的事件
        deleteBlogPost(e) {
            const adminId = e.path[0]["dataset"]["index"]
            let isAxios = true;
            if (isAxios) {
                isAxios = false;
                axios({
                    method: "delete",
                    url: "http://localhost:6060/api/blogPost/" + adminId
                }).then(() => {
                    //重新渲染博文管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/blogPost?limit=" + this.limit + "&page=" + this.blogPostPage
                    }).then(res => {
                        this.blogPostCount = res.data.total;
                        this.blogPostList = res.data.datas;
                        isAxios = true;
                    })

                })



            }

        },

        //点击评论管理发生的事件
        deleteComment(e) {
            const commentId = e.path[0]["dataset"]["index"]
            let isAxios = true;
            if (isAxios) {
                isAxios = false;
                axios({
                    method: "delete",
                    url: "http://localhost:6060/api/comment/" + commentId
                }).then(() => {
                    //重新渲染评论管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/comment/all?limit=" + this.limit + "&page=" + this.commentPage
                    }).then(res => {
                        this.commentList = res.data.data.rows;
                        isAxios = true
                    })
                })
            }
        },

        //点击每日一句管理发生的事件
        deleteSaying(e) {
            const sayingId = e.path[0]["dataset"]["index"]
            let isAxios = true;
            if (isAxios) {
                isAxios = false;
                axios({
                    method: "delete",
                    url: "http://localhost:6060/api/saying/" + sayingId
                }).then(() => {
                    //重新渲染管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/saying?limit=" + this.limit + "&page=" + this.sayingPage
                    }).then(res => {
                        this.sayingCount = res.data.total;
                        this.sayingList = res.data.datas;
                        isAxios = true;
                    })
                })
            }
        },

        //点击评论管理发生的事件
        deleteMessage(e) {

            const commentId = e.path[0]["dataset"]["index"]
            let isAxios = true;
            if (isAxios) {
                isAxios = false;
                axios({
                    method: "delete",
                    url: "http://localhost:6060/api/comment/" + commentId
                }).then(() => {
                    //重新渲染留言管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/comment?id=-1"
                    }).then(res => {
                        this.messageList = res.data.data.datas;
                        isAxios = true
                    }
                    )
                })
            }

        },

        //点击标签管理发生的事件
        deleteTag(e){

            const tagId = e.path[0]["dataset"]["index"]
            let isAxios = true;
            if (isAxios) {
                isAxios = false;
                axios({
                    method: "delete",
                    url: "http://localhost:6060/api/tags/" + tagId
                }).then(() => {
                    //重新渲染标签管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/tags?&limit=" + this.limit + "&page=" + this.tagPage
                    }).then(res => {
                        this.tagList = res.data.datas;
                        isAxios = true
                    }
                    )
                })
            }

        },

        //切换page
        lastpage(e) {
            if (this.blogPostDisplay === "block") {
                this.blogPostPage--;
                if (this.blogPostPage <= 1) {
                    this.blogPostPage = 1
                }
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/blogPost?limit=" + this.limit + "&page=" + this.blogPostPage
                    }).then(res => {
                        this.blogPostCount = res.data.total;
                        this.blogPostList = res.data.datas;
                        isAxios = true;
                    })
                }
            } else if (this.commentDisplay === "block") {
                this.commentPage--;
                if (this.commentPage < 1) {
                    this.commentPage = 1
                }
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/comment/all?limit=" + this.limit + "&page=" + this.commentPage
                    }).then(res => {
                        this.commentList = res.data.data.rows;
                        isAxios = true
                    })
                }
            } else if (this.everydayDisplay === "block") {
                this.sayingPage--;
                if (this.sayingPage <= 1) {
                    this.sayingPage = 1
                }
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/saying?limit=" + this.limit + "&page=" + this.sayingPage
                    }).then(res => {
                        this.sayingCount = res.data.total;
                        this.sayingList = res.data.datas;
                        isAxios = true;
                    })
                }
            } else if (this.messageDisplay === "block") {
                this.messagePage--;
                if (this.messagePage <= 1) {
                    this.messagePage = 1
                }
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;

                    //重新渲染留言管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/comment?id=-1&limit=" + this.limit + "&page=" + this.messagePage
                    }).then(res => {
                        this.messageList = res.data.data.datas;
                        this.messageCount = res.data.data.total;
                        isAxios = true
                    }
                    )

                }
            }else if(this.tagDisplay === "block"){
                this.tagPage--;
                if (this.tagPage <= 1) {
                    this.tagPage = 1
                }
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;

                    //重新渲染标签管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/tags?limit=" + this.limit + "&page=" + this.tagPage
                    }).then(res => {
                        this.tagCount = res.data.total;
                        this.tagList = res.data.datas;
                        isAxios = true
                    }
                    )

                }
            }
        },

        nextpage(e) {
            if (this.blogPostDisplay === "block") {
                const maxPage = Math.ceil(this.blogPostCount / this.limit);
                this.blogPostPage++;
                if (this.blogPostPage >= maxPage) {
                    this.blogPostPage = maxPage;
                }
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/blogPost?limit=" + this.limit + "&page=" + this.blogPostPage
                    }).then(res => {
                        this.blogPostCount = res.data.total;
                        this.blogPostList = res.data.datas;
                        isAxios = true;
                    })
                }
            } else if (this.commentDisplay === "block") {
                const maxPage = Math.ceil(this.commentCount / this.limit);
                this.commentPage++;
                if (this.commentPage >= maxPage) {
                    this.commentPage = maxPage;
                }
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/comment/all?limit=" + this.limit + "&page=" + this.commentPage
                    }).then(res => {
                        this.commentList = res.data.data.rows;
                        isAxios = true
                    })
                }
            } else if (this.everydayDisplay === "block") {
                const maxPage = Math.ceil(this.sayingCount / this.limit);
                this.sayingPage++;
                if (this.sayingPage >= maxPage) {
                    this.sayingPage = maxPage;
                }
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/saying?limit=" + this.limit + "&page=" + this.sayingPage
                    }).then(res => {
                        this.sayingCount = res.data.total;
                        this.sayingList = res.data.datas;
                        isAxios = true;
                    })
                }
            } else if (this.messageDisplay === "block") {
                const maxPage = Math.ceil(this.messageCount / this.limit);
                this.messagePage++;
                if (this.messagePage >= maxPage) {
                    this.messagePage = maxPage;
                }
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/comment?id=-1&limit=" + this.limit + "&page=" + this.messagePage
                    }).then(res => {
                        this.messageList = res.data.data.datas;
                        this.messageCount = res.data.data.total;
                        isAxios = true
                    })
                }
            }else if(this.tagDisplay === "block"){
                const maxPage = Math.ceil(this.tagCount / this.limit);
                this.tagPage++;
                if (this.tagPage >= maxPage) {
                    this.tagPage = maxPage;
                }
                let isAxios = true;
                if (isAxios) {
                    isAxios = false;
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/tags?limit=" + this.limit + "&page=" + this.tagPage
                    }).then(res => {
                        this.tagCount = res.data.total;
                        this.tagList = res.data.datas;
                        isAxios = true
                    })
                }
            }
        }
    },

    created() {
        axios({
            method: "get",
            url: "http://localhost:6060/api/blogLogin/whoami"
        }).then(res => {
            if (res.data.data) {
                //初次加载的请求

                // 管理员界面的数据
                axios({
                    method: "get",
                    url: "http://localhost:6060/api/blogLogin"
                }).then(res => {
                    this.adminCount = res.data.data.count;
                    this.adminList = res.data.data.rows;

                    //博文管理界面的数据
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/blogPost?limit=" + this.limit + "&page=1"
                    }).then(res => {
                        this.blogPostCount = res.data.total;
                        this.blogPostList = res.data.datas;
                    })

                    //评论管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/comment/all"
                    }).then(res => {
                        this.commentCount = res.data.data.count
                        this.commentList = res.data.data.rows;
                    })

                    //每日一句管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/saying"
                    }).then(res => {
                        this.sayingCount = res.data.total;
                        this.sayingList = res.data.datas;
                    })

                    //留言管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/comment?id=-1&limit=" + this.limit + "&page=" + this.messagePage
                    }).then(
                        res => {
                            this.messageList = res.data.data.datas;
                            this.messageCount = res.data.data.total;
                        }
                    )

                    //标签管理界面
                    axios({
                        method: "get",
                        url: "http://localhost:6060/api/tags?&limit=" + this.limit + "&page=" + this.tagPage
                    }).then(res => {
                        this.tagCount = res.data.total;
                        this.tagList = res.data.datas;
                    })


                })



            } else {
                window.location.href = 'http://localhost:6060/login.html'
            }
        }).catch(res => {
            if (res.response.status === 403) {
                window.location.href = 'http://localhost:6060/login.html'
            }
        })
    }
})