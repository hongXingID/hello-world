
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
if(IsPC()){
    const randomTags = new Vue({
        el: "#random_tags",
        data: {
            tags: []
        },
        computed: {
            randomColor() {
                return function () {
                    const red = Math.random() * 255;
                    const green = Math.random() * 255;
                    const blue = Math.random() * 255;
                    return `rgb(${red},${green},${blue})`
                }
            },
            randomSize() {
                return function () {
                    const size = (Math.random() * 15 + 12) + "px";
                    return size;
                }
            }
        },
        created() {
            //发送请求
    
            axios({
                method: "get",
                url: "http://localhost:6060/api/tags?limit=15&page=1"
            }).then(res => {
                for (let i = 0; i < res.data.datas.length; i++) {
                    this.tags.push(res.data.datas[i])
                    this.tags[i].link = "/search.html?tag=" + res.data.datas[i]["tag"]
                }
            })
    
    
    
        }
    })
    
    const newHot = new Vue({
        el: "#new_hot",
        data: {
            limit: 5,
            page: 1,
            titleList: []
        },
        created() {
            axios({
                method: "get",
                url: "http://localhost:6060/api/blogPost/hotViews?limit=" + this.limit + "&page=" + this.page
            }).then(res => {
                this.titleList = res.data.rows
                for (let i = 0; i < res.data.rows.length; i++) {
                    this.titleList[i].link = "http://localhost:6060/blogContent.html?id=" + this.titleList[i]["id"] + "&views=" + this.titleList[i]["views"]
                }
            })
        }
    })
    
    const newComments = new Vue({
        el: "#new_comments",
        data: {
            limit: 5,
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
                url: "http://localhost:6060/api/comment/all?limit=" + this.limit
            }).then(res => {
                this.commentList = res.data.data.rows
            })
        }
    })
    
    const relationBlog = new Vue({
        el:"#relation_blog",
        data:{
          blogs:[
              {name:"MySearch",link:"https://www.xiaoxingdemo.cn"}
          ]
        }
    })
}



const header = new Vue({
    el: "#header",
    data: {
        word: "",
        scrollTop:false
    },
    methods: {
        scrollToTop() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollTop = scrollTop > 10
        },
        search() {
            if (this.word !== "") {
                window.open("search.html?w=" + this.word)
            }

        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollToTop)
    },
})