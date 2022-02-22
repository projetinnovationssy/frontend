import axios from "axios"

class FastClient {
    constructor(url, logout) {
        this.url = url
        this.conf = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
        this.signin = "/signin"
        this.signup = "/signup"
        this.privateVideo = "/api/video/get/user"
        this.publicVideo = "/api/video/get/public/all"
        this.streamUrl = "/api/video/stream?video_id="
        this.thumbUrl = "/api/video/thumb?video_id="
        this.deletevid = "/api/video/delete"
        this.uploadurl = "/api/video/upload"
        this.updateurl = "/api/video/update"
        this.deleteaccounturl = "/api/user/delaccount"
        this.changepassurl = "/api/user/changepass"
        this.logout = logout
    }

    getVideoStreamURL(id) {
        return this.url + this.streamUrl + id
    }

    getTumbnail(id, callback) {
        let url = this.url + this.thumbUrl + id
        let conf = { ...this.conf, responseType: "blob" }
        axios.get(url, conf)
            .then((response) => {
                if (response != null) {
                    let thumbnail = URL.createObjectURL(response.data)
                    callback(thumbnail)
                }
            })
    }

    getTokenAndLogin(userData, callback) {
        axios.post(this.url + this.signin, userData)
            .then((response) => {
                if (response.data.token != null) {
                    callback(response.data.token)
                }
            }).catch((error) => {
                if (error.response.status == 403) {
                    alert("incorrect credentials")
                }
            })
    }

    signUp(userData, callback) {
        axios.post(this.url + this.signup, userData)
            .then((response) => {
                if (response.data.description == "User is Created Successfully") {
                    alert("We have registered you!! you will be redirected to the login page")
                    callback()
                } else if (response.data.description == "User Alredy Exist") {
                    alert("We can't register you, User Alredy Exist")
                } else {
                    alert("We can't register you, verify your information and try again!")
                }
            })
            .catch((error) => {
                alert("We can't register you, verify your information and try again!")
            })

    }




    getOwnList(callback) {
        axios.get(this.url + this.privateVideo, this.conf)
            .then((response) => {
                if (response.data != null) {
                    let videoList = response.data.obj
                    callback(videoList)
                }
            })
            .catch((err) => {
                if (err.response.status == 403) {
                    //
                }
            })
    }
    getPublicList(callback) {
        axios.get(this.url + this.privateVideo, this.conf)
            .then((response) => {
                if (response.data != null) {
                    let videoList = response.data.obj
                    callback(videoList)
                }
            })
            .catch((err) => {
                if (err.response.status == 403) {
                    //
                }
            })
    }

    delete(id, name, callback) {
        let data = new FormData()
        let url = this.url + this.deletevid
        data.append("video_id", id)
        axios.post(url, data, this.conf)
            .then((response) => {
                if (response.data.obj == true) {
                    alert(response.data.description + "! video: " + name)
                    callback()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    upload(name, description, thumbnail, videoFile,callback, popupclose) {
        let videoForm = new FormData()
        videoForm.append("name", name)
        videoForm.append("description", description)
        videoForm.append("visibility", true)
        videoForm.append("thumbnail", thumbnail)
        videoForm.append("video", videoFile)
        let url = this.url + this.uploadurl
        axios.post(url, videoForm,this.conf)
        .then((response)=>{
            if(response.data.obj == true){
                callback()
            }
            else{
                alert(response.data.description)
                popupclose()
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    update(id, name, description, callback, popupclose){
        let videoForm = new FormData()
        videoForm.append("video_id", id)
        videoForm.append("name", name)
        videoForm.append("description", description)
        let url = this.url + this.updateurl
        axios.post(url, videoForm,this.conf)
        .then((response)=>{
            if(response.data.obj == true){
                callback()
            }
            else{
                alert(response.data.description)
                popupclose()
            }
        }).catch((error)=>{
            console.log(error)
        })

    }

    deleteaccount(){
        let url = this.url + this.deleteaccounturl
        axios.post(url,"",this.conf)
        .then((response)=>{
            if(response.data.obj == true){
                this.logout()
            }
            else{
                alert(response.data.description)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    changepass(oldpassword, newpassword, cpassword){
        let url = this.url + this.changepassurl
        let userData = new FormData()
        userData.append("opass", oldpassword)
        userData.append("npass", newpassword)
        userData.append("cpass", cpassword)
        axios.post(url, userData, this.conf)
        .then((response)=>{
            if (response.data.obj == false) {
                alert(response.data.description)
            }
            else {
                alert(response.data.description + "! you will be redirected to the login page")
                this.logout()
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    
}

export default FastClient