export default function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function toFixedDown(target, digits) {
  var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = target.toString().match(re)
  return m ? parseFloat(m[1]) : this.valueOf()
}
