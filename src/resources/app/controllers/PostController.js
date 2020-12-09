const User = require('../models/User');
const Post = require('../models/Post');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj');

class PostController {

    searchResult(req, res, next) {
        res.render('search', {
            layout: false,
        })
    }

    getInfo(req, res, next) {
        Post.findOne({ _id: req.query.key })
            .then(post => mongooseToObj(post))
            .then(post => getPostInfo(post))
            .then(post => res.json(post))
    }

}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}
async function getPostInfo(post) {
    var user = await User.findOne({ _id: post.author });
    post.authorName = user.fullname;
    post.authorAvatar = user.avatar;
    
    let updatedTime = post.updatedAt;
    let date = ("0" + updatedTime.getDate()).slice(-2);
    let month = ("0" + (updatedTime.getMonth() + 1)).slice(-2);
    let year = updatedTime.getFullYear();
    post.updatedTime = date + '/' + month + '/' + year;
    
    let createdTime = post.createdAt;
    date = ("0" + createdTime.getDate()).slice(-2);
    month = ("0" + (createdTime.getMonth() + 1)).slice(-2);
    year = createdTime.getFullYear();
    post.ceeatedDate = date + '/' + month + '/' + year;
    return post;
}
async function getPostsInfo(posts) {
    for (var post of posts) {
        var user = await User.findOne({ _id: post.author });
        post.authorName = user.fullname;
        post.authorAvatar = user.avatar;
        
        let updatedTime = post.updatedAt;
        let date = ("0" + updatedTime.getDate()).slice(-2);
        let month = ("0" + (updatedTime.getMonth() + 1)).slice(-2);
        let year = updatedTime.getFullYear();
        post.updatedTime = date + '/' + month + '/' + year;
        
        let createdTime = post.createdAt;
        date = ("0" + createdTime.getDate()).slice(-2);
        month = ("0" + (createdTime.getMonth() + 1)).slice(-2);
        year = createdTime.getFullYear();
        post.ceeatedDate = date + '/' + month + '/' + year;
    }
    return posts
}
module.exports = new PostController;