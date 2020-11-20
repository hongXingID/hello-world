//limit为一页的数据量，page为第几页，count为当前博客评论总数
let limit = 5;
let page = 1;
let count = 0;
let id = -1;   //id=-1代表留言板留言


const blogComments = new Vue({
    el: "#blog_comments",
    count,
    data: {
        commentList: [],
        handleTime(time) {
            let da = time;
            da = new Date(da);
            let year = da.getFullYear() + '年';
            let month = da.getMonth() + 1 + '月';
            let date = da.getDate() + '日';
            let hour = da.getHours() < 10 ? "0" + da.getHours() : da.getHours();
            let minute = da.getMinutes() < 10 ? "0" + da.getMinutes() : da.getMinutes();
            let second = da.getSeconds() < 10 ? "0" + da.getSeconds() : da.getSeconds();
            return year + month + date + " " + hour + ":" + minute + ":" + second;
        }
    },
    created() {
        axios({
            method: "get",
            url: "http://localhost:6060/api/comment?id=" + id + "&limit=" + limit + "&page=" + page
        }).then(res => {
            this.count = res.data.data.total;
            count = res.data.data.total;
            this.commentList = res.data.data.datas;

            //分页组件参数
            pageTools.end = Math.ceil(count / limit)
            if (pageTools.end < pageTools.maxList) {
                pageTools.maxIndex = pageTools.end;
            } else {
                pageTools.maxIndex = pageTools.maxList;
            }

        })
    }
})

const sendComment = new Vue({
    el: "#send_comment",
    data: {
        codeValue: "",
        codeData: "",
        name: "",
        email: "",
        content: "",
        code: "",
    },
    methods: {
        sendComment() {
            if (this.code === this.codeValue) {
                if (this.name !== "" && this.email !== "" && this.content !== "") {
                    axios({
                        method: "post",
                        url: "http://localhost:6060/api/comment/",
                        data: {
                            blogId: id,
                            username: this.name,
                            content: this.content,
                            email: this.email,
                            code: this.code,
                        }
                    }).then(res => {
                        blogComments.commentList.unshift(res.data.data)
                        blogComments.count++
                    })
                    window.alert("发送成功")
                } else {
                    window.alert("信息不能有空")
                }

            } else {
                window.alert("验证码不正确")
            }

            axios({
                method: "get",
                url: "http://localhost:6060/api/blogPost/comment/code"
            }).then(res => {
                this.codeValue = res.data.text;
                this.codeData = res.data.data
            })





        },
        getCodeData() {
            axios({
                method: "get",
                url: "http://localhost:6060/api/blogPost/comment/code"
            }).then(res => {
                this.codeValue = res.data.text,
                    this.codeData = res.data.data
            })
        }
    },
    created() {
        axios({
            method: "get",
            url: "http://localhost:6060/api/blogPost/comment/code"
        }).then(res => {
            this.codeValue = res.data.text;
            this.codeData = res.data.data
        })
    }
})

const pageTools = new Vue({
    el: "#pageTools",
    data: {
        nowIndex: 1,
        clickIndex: 1,
        count: "",
        firstIndex: 1,
        maxIndex: "",
        end: "",       //最多展示的索引值
        maxList: 5,    //最多5个展示索引
    },
    methods: {
        handleClick(e) {

            this.clickIndex = +e.path[0]["innerText"];

            //点击当前页不发请求
            if (this.clickIndex !== this.nowIndex) {

                axios({
                    method: "get",
                    url: "http://localhost:6060/api/comment?id="+id+"&limit=" + limit + "&page=" + this.clickIndex
                }).then(res => {
                    blogComments.commentList = res.data.data.datas
                })

            }
            this.nowIndex = this.clickIndex;



        },
        toFirst() {
            this.clickIndex = 1;
            this.firstIndex = 1;
            axios({
                method: "get",
                url: "http://localhost:6060/api/comment?id="+id+"&limit=" + limit + "&page=1" 
            }).then(res => {
                blogComments.commentList = res.data.data.datas
            })

        },
        toEnd() {
            this.clickIndex = this.end
            this.firstIndex = this.end - this.maxIndex + 1
            axios({
                method: "get",
                url: "http://localhost:6060/api/comment?id="+id+"&limit=" + limit + "&page="+this.end 
            }).then(res => {
                blogComments.commentList = res.data.data.datas
            })

        },
        back() {
            this.firstIndex--;
            if (this.firstIndex < 1) {
                this.firstIndex = 1
            }
        },
        go() {
            this.firstIndex++;
            if (this.firstIndex + this.maxIndex - 1 > this.end) {
                this.firstIndex = this.end - this.maxIndex + 1
            }
        }
    }
})