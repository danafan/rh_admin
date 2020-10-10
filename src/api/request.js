import axios from './index'
import md5 from 'js-md5';
import { Message } from 'element-ui';

export default {
  post(path, params={}){
    let target = {};
    let admin_id = localStorage.getItem("admin_id");
    let secret_key = localStorage.getItem("secret_key");
    let login_token = localStorage.getItem("token");
    let timestamp = ((new Date()).getTime()/1000).toString().split('.')[0];
    if(!!admin_id){
      target.admin_id = admin_id;
      target.login_token = login_token;
      target.timestamp = timestamp;
      target.random = Math.random();
    }
    Object.assign(params, target);
    let form = new FormData();
    let obj = {};
    let arr = [];
    for(let a of Object.keys(params)){ 
      arr.push(a);
    }
    let arrSort = arr.sort(); //参数按照键名排序
    for(let b of arrSort){
      let val = params[b];
      obj[b] = val;
      form.append(b, val);
    }
    obj.secret_key = secret_key;
    let str = "";
    for(var i in obj){
      if(i != 'invitation_user' && i != 'pay_order' && i != 'feedback_material'){
        str += `${i}=${obj[i]}&`
      }
    }
    //生成签名
    str=str.substring(0,str.length-1)
    let sign = md5(str);
    form.append('sign', sign);

    return axios.post(`${path}`, form);
  },
  get(path, params={}){
    let target = {};
    let admin_id = localStorage.getItem("admin_id");
    let secret_key = localStorage.getItem("secret_key");
    let login_token = localStorage.getItem("token");
    let timestamp = ((new Date()).getTime()/1000).toString().split('.')[0];
    if(!!admin_id){
      target.admin_id = admin_id;
      target.login_token = login_token;
      target.timestamp = timestamp;
      target.random = Math.random();
    }
    Object.assign(params, target);
    let arr = [];
    let str = '';
    for(let a of Object.keys(params)){
      arr.push(a);
    }
    let arrSort = arr.sort();
    for(let b of arrSort){
      let val = params[b];
      str += `${b}=${val}&`;
    }
    if(str.indexOf("#") != -1){
      Message({message:'参数不能包含特殊字符（#、%、¥）等',type:'warning'})
      return false;
    }
    let secret = `secret_key=${secret_key}`;
    let sign = md5(str + secret);
    str = str + `sign=${sign}`
    if(!!str){
      return axios.get(`${path}?${str}`);
    }else{
      return axios.get(`${path}`);
    }
    
  }
}
