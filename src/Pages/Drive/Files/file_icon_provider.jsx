import image from "./icons/image.png";
import pdf from "./icons/pdf.png";
import mp3 from "./icons/mp3.png";
import txt from "./icons/txt.png";
import video from "./icons/video.png";
import zip from "./icons/zip.png";
import docs from "./icons/docs.png";
// File Icon
const check = (mimetype, ext) => {
    if (mimetype.includes(ext)) {
        return true
    }
    return false
}

export const fileIconProvider = (fileType) => {
    if (fileType === '.pdf') {
        return pdf
    }
    else if (fileType === '.mp3') {
        return mp3
    }
    else if (fileType === '.txt') {
        return txt
    }
    else if (fileType === '.mp4' || fileType === '.mkv' || fileType === '.webm') {
        return video
    }
    else if (fileType === '.zip') {
        return zip
    }
    else if (fileType === '.doc' || fileType === '.docx') {
        return docs
    }
    else if (fileType === '.png' || fileType === '.jpg' || fileType === '.jpeg' || fileType === '.gif' || fileType === '.webp' || fileType === '.svg') {
        return image
    }
}