import videos from './images/videopng.png'
import image from './images/image.png'
import archive from './images/zip.png'
import pdf from './images/pdf.png'
import mp3 from './images/mp3.png'
const icons = [
    // {
    //     name: "Folder",
    //     icon: FolderOpen,
    //     bg: "#FFD1E4"
    // },
    {
        name: "Images",
        icon: image,
        bg: "#FFD1E4",
        color: "#E72D7A",
        path: "image"
    },
    {
        name: "Documents",
        icon: archive,
        bg: "#D5CEFF",
        color: "#3C337D",
        path: "application"
    },
    {
        name: "Videos",
        icon: videos,
        bg: "#CCF1B7",
        color: "#8ECA6E",
        path: "video"
    },
    {
        name: "PDF",
        icon: pdf,
        bg: "#FFEDC5",
        color: "#D1B167",
        path: "application/pdf"
    },
    {
        name: "Audio",
        icon: mp3,
        bg: "#C4E7F8",
        color: "#74A4AF",
        path: "audio"
    }
]

export { icons }