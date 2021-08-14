export default function () {
  var images = new Array()
  for (let i = 0; i < arguments.length; i++) {
    images[i] = new Image()
    images[i].src = arguments[i]
    console.log("Image Preloader: Preloaded " + arguments[i])
  }
}
