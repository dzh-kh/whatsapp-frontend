export default function (timestamp: number) {
  var date = new Date(timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
}
