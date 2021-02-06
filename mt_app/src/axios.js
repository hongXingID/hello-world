import axios from 'axios';

axios.defaults.baseURL = 'http://open.duyiedu.com';
axios.interceptors.request.use(function (config) {
    config.params = {
        ...config.params,
        appkey: "redStar_1581059962011"
    }
    return config;
}, function () {

})

export default axios;