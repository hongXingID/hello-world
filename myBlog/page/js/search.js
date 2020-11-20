

const searchResult = new Vue({
    el: "#search_result",
    data: {
        articleList: [],
        handleTime(time) {
            let da = time;
            da = new Date(da);
            let year = da.getFullYear() + '年';
            let month = da.getMonth() + 1 + '月';
            let date = da.getDate() + '日';
            let hour = da.getHours();
            let minute = da.getMinutes();
            let second = da.getSeconds();
            return year + month + date + " " + hour + ":" + minute + ":" + second;
        }
    },
    created() {


        if (location.search.split("?")[1].split("=")[0] === "w") {
            let word = location.search.split("?")[1].split("=")[1];
            axios({
                method: "get",
                url: "http://localhost:6060/api/searchBlog/" + word
            }).then(res => {
                this.articleList = res.data
                for (let i = 0; i < this.articleList.length; i++) {
                    this.articleList[i].link = "/blogContent.html?id=" + res.data[i].id + "&views=" + res.data[i].views
                }
            })
        }else if(location.search.split("?")[1].split("=")[0] === "tag"){
            let tag = location.search.split("?")[1].split("=")[1];
            axios({
                method:"get",
                url:"http://localhost:6060/api/tags/findBlogPost/"+tag
            }).then(res=>{
                this.articleList = res.data.data[0]["BlogPosts"]
                for(let i = 0;i<this.articleList.length;i++){
                   
                    this.articleList[i].link = "/blogContent.html?id=" + this.articleList[i].id + "&views=" +this.articleList[i].views
                }
                console.log(this.articleList)
            })
        }


    }
})


