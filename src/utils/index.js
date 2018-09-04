// 工具库
export function showText(text){
    wx.showToast({
        title:text,
        icon:'success'
    })
}

export function showModal(title,content){
    wx.showModal({
        title,
        content,
        showCancel:false
    })
}