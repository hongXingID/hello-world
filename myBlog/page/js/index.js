//limit为一页的数据量，page为第几页，count为博客文总数
let limit = 5;
let page = 1;
let count = 0;

const everyDay = new Vue({
    el: "#every_day",
    data: {
        content: ""
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created() {
        //请求数据，给content赋值
        async function fetchEveryDay() {
            const result = await fetch("http://localhost:6060/api/saying?limit=1&page=1")
                .then(res => res.json())
                .then(res => res)
            everyDay.content = result.datas[0].content;
        }
        fetchEveryDay()
    }
})

const articleList = new Vue({
    el: "#article_list",
    data: {
        articleList: [],
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
    computed: {

    },
    created() {
        //发送请求


        axios({
            method: "get",
            url: "http://localhost:6060/api/blogPost?limit=" + limit + "&page=" + page
        }).then(res => {
            count = res.data.total;

            //分页组件参数
            pageTools.end = Math.ceil(count / limit)
            if (pageTools.end < pageTools.maxList) {
                pageTools.maxIndex = pageTools.end;
            } else {
                pageTools.maxIndex = pageTools.maxList;
            }

            //文章内容
            this.articleList = res.data.datas
            for (let i = 0; i < this.articleList.length; i++) {
                this.articleList[i].link = "/blogContent.html?id=" + this.articleList[i].id + "&views=" + this.articleList[i].views
            }

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
                    url: "http://localhost:6060/api/blogPost?limit=" + limit + "&page=" + this.clickIndex
                }).then(res => {
                    articleList.articleList = res.data.datas
                    for (let i = 0; i < articleList.articleList.length; i++) {
                        articleList.articleList[i].link = "/blogContent.html?id=" + articleList.articleList[i].id + "&views=" + articleList.articleList[i].views
                    }
                })

            }

            this.nowIndex = this.clickIndex;



        },
        toFirst() {
            this.clickIndex = 1;
            this.firstIndex = 1;
            axios({
                method: "get",
                url: "http://localhost:6060/api/blogPost?limit=" + limit + "&page=1"
            }).then(res => {
                articleList.articleList = res.data.datas
                for (let i = 0; i < articleList.articleList.length; i++) {
                    articleList.articleList[i].link = "/blogContent.html?id=" + articleList.articleList[i].id + "&views=" + articleList.articleList[i].views
                }
            })

        },
        toEnd() {
            this.clickIndex = this.end
            this.firstIndex = this.end - this.maxIndex + 1
            axios({
                method: "get",
                url: "http://localhost:6060/api/blogPost?limit=" + limit + "&page="+ this.end
            }).then(res => {
                articleList.articleList = res.data.datas
                for (let i = 0; i < articleList.articleList.length; i++) {
                    articleList.articleList[i].link = "/blogContent.html?id=" + articleList.articleList[i].id + "&views=" + articleList.articleList[i].views
                }
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
