import html2canvas from 'html2canvas';
export const html2Img = () => {
    html2canvas(document.body).then(canvas => {
        console.log(canvas.toDataURL());
        const img = new Image();
        img.src = canvas.toDataURL();
        document.getElementById('app').appendChild(img);
    })
}