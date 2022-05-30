import {PASS_POST,NOPASS_POST,UPLOAD_FILE,POST_ADD} from './api'
import {METHOD, request} from '@/utils/request'

export async function passPost(postId) {
  return request(PASS_POST, METHOD.GET, {
    postId: postId,
  })
}

export async function nopassPost(postId) {
  return request(NOPASS_POST, METHOD.GET, {
    postId: postId,
  })
}
export async function uploadImg(file) {
  console.log("进入uploadImguploadImguploadImguploadImguploadImguploadImg");
  console.log(file);
  return request(UPLOAD_FILE, METHOD.POST, file,{
    headers: {
        'Content-Type': 'multipart/form-data'
    }})
}

export async function addPost(userId,postContent,relatedQuestionId) {
  // console.log(file);
  return request(POST_ADD, METHOD.POST, {
    userId: userId,
    postContent: postContent,
    relatedQuestionId: relatedQuestionId
  })
}
export default {passPost,nopassPost}