export class Color {


    public static getCorrectTextColor(rgb: string): string {

        if (rgb === undefined || rgb === null) return '#fff';


        let rgbArray = rgb.split("(")[1].split(")")[0].split(",");
        // console.log(hex)

        const threshold = 130;
        const hRed = +rgbArray[0];
        const hGreen = +rgbArray[1];
        const hBlue = +rgbArray[2];
    
        function hexToR(h: string) {
          return parseInt(cutHex(h).substring(0, 2), 16);
        }
    
        function hexToG(h: string) {
          return parseInt(cutHex(h).substring(2, 4), 16);
        }
    
        function hexToB(h: string) {
          return parseInt(cutHex(h).substring(4, 6), 16);
        }
    
        function cutHex(h: string) {
          return h.charAt(0) === '#' ? h.substring(1, 7) : h;
        }
    
        const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
        if (cBrightness > threshold) {
          return '#000000';
        } else {
          return '#ffffff';
        }
      }
}
