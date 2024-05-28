// File Size
export const filesize = size => {
    return size / 1024 / 1024 > 1024 ? `${(size / 1024 / 1024 / 1024).toFixed(2)} GB` : size / 1024 / 1024 > 1 ? `${(size / 1024 / 1024).toFixed(2)} MB` : `${(size / 1024).toFixed(2)} KB`
}