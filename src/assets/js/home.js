export default{
	getWindowWH(){
       return{
       	w:window.innerWidth,
       	h:window.innerHeight
       }
	},
	initWid(){
		let w;
		if(window.innerWidth>1240){
               w = 1240+"px";
			}else{
				w = "100%";
			}
		return w;	
	},
	replaceAll(s1,s2,str) {
        return str.replace(new RegExp(s1,"gm"),s2);
    },
	GetQueryString(key){
    var url = document.location.toString();
　　　　var arrObj = url.split("?");

　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;

　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");

　　　　　　　　if (arr != null && arr[0] == key) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}

    }
}