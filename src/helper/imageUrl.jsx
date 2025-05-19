export const imageurl = (url) => {
    const serverUrl = "http://localhost:4500"
    // const serverUrl = "https://http://localhost:4500"
    if (url?.includes("http")) {
        return url
    }
    else if (url) {
        return `${serverUrl}/${url}`
    } // Image Url
    else {
        return 'https://docs.material-tailwind.com/img/face-2.jpg'
    }
}
// image URL

// export const imageurl = (url) => {
//     if (url?.includes("http")) {
//         return url
//     }
//     else if (url === "/images/avater.png" || url === "") {
//         return `https://social-media.mdtamiz.com/uploads/posts/5454545/333692911_avater.png`
//     }
//     else {
//         const link = `https://social-media.mdtamiz.com/${url || "uploads/posts/5454545/836795297_Dots-Preloader.gif"}`
//         return link
//     }
// }