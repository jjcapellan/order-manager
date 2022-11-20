async function resizeBlobImg(blob, maxW, maxH, callback) {
    let bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");

    // Scale
    const ratioW = maxW / bitmap.width;
    const ratioH = maxH / bitmap.height;    
    let ratio = ratioH < ratioW ? ratioH : ratioW;
    canvas.width = bitmap.width * ratio;
    canvas.height = bitmap.height * ratio;

    const ctx = canvas.getContext("2d");    
    ctx.scale(ratio, ratio);
    ctx.drawImage(bitmap, 0, 0);
    
    canvas.toBlob(callback, "image/jpeg", 0.92);
}

export { resizeBlobImg };