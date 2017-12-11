function createToolTip(array) {
 _.forEach(array, function (item) {
  eventBindToolTip(item);
 })
}
function eventBindToolTip(obj) {
 $(obj.selector).hover(function (e) {
  initToolTip(e, obj.direction, obj.string);
 }, function () {
  $(".tooltip").remove();
 })
}
function initToolTip(e, direction, string) {
 var dataObj = {};
 dataObj.left = $(e.target).offset().left;
 dataObj.top = $(e.target).offset().top;
 dataObj.width = $(e.target).outerWidth();
 dataObj.height = $(e.target).outerHeight();
 var templatString = [
  '<div class="tooltip">',
  '<div class="tooltip-wrap">',
  '<div class="tooltip-content-<%=direction%>">',
  '<%=string%>',
  '</div>',
  '</div>',
  '</div>'
 ].join("");
 var templatString = _.template(templatString);
 var dom = templatString({
   direction : direction,
   string : string
  })
  $("body").append(dom);
 var scrollTop = $(window).scrollTop()
  if (direction == "top") {
   var top = dataObj.top - parseInt($(".tooltip-content-top").outerHeight()) - 4 - scrollTop;
   var left = dataObj.left + parseInt(dataObj.width / 2) - parseInt($(".tooltip-content-top").outerWidth() / 2);
  } else if (direction == "bottom") {
   var top = dataObj.top + dataObj.height + 4 - scrollTop;
   var left = dataObj.left + parseInt(dataObj.width / 2) - parseInt($(".tooltip-content-bottom").outerWidth() / 2) - document.body.scrollLeft; ;
  } else if (direction == "left") {
   var top = dataObj.top + parseInt(dataObj.height / 2) - parseInt($(".tooltip-content-left").outerHeight() / 2) - scrollTop;
   var left = dataObj.left - parseInt(dataObj.width / 2) + 4 - document.body.scrollLeft;
  } else if (direction == "right") {
   var top = dataObj.top + parseInt(dataObj.height / 2) - parseInt($(".tooltip-content-right").outerHeight() / 2) - scrollTop;
   var left = dataObj.left + dataObj.width + 4 - document.body.scrollLeft;
  }
  $(".tooltip").css({
   'left' : left + 'px',
   'top' : top + 'px'
  })
}
// width()//这里获得的宽高跟css()数据类型不一样==内容的宽度
// innerWidth()=width()+padding
// outerWidth()=innerwidth()+border
// outerWidth(true)==outerwidth +margin

// height()
// innerHeight()
// outerHeight()
// outerHeight(true)
