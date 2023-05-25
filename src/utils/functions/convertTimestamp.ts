export default function (timestamp: number) {
  var date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();

  // Will display time in 03:10 format
  var formattedTime = hours + ":" + minutes.substr(-2);

  return formattedTime;
}
