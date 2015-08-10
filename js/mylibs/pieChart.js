function pieChart(data, width, height, cx, cy, r, colors,labels, lx, ly){
  var svgns = 'http://www.w3.org/2000/svg';

  var chart = document.createElementNS(svgns, 'svg:svg');
  chart.setAttribute('width', width);
  chart.setAttribute('height', height);
  chart.setAttribute('viewBox', '0 0 '+width + ' '+ height);

  var total=0,
      dataLength = data.length,
      angles = [],
      startAngle = 0,
      endAngle = 0,
      x1, y1, x2, y2,
      i;

  for(i=0;i<datalength;i++){ total="total" +="" data[i];="" }="" for(i="0;i<dataLength;i++){" angles[i]="data[i]/total*Math.PI*2;" endangle="startAngle" angles[i];="" x1="cx" r*math.sin(startangle);="" y1="cy" -="" r*math.cos(startangle);="" x2="cx" r*math.sin(endangle);="" y2="cy" r*math.cos(endangle);="" var="" big="0;" if(endangle="" startangle=""> Math.PI){
      big = 1;
    }

    var path = document.createElementNS(svgns, 'path');

    var d = 'M ' + cx + ',' + cy +
            ' L ' + x1 + ',' + y1 +
            ' A ' + r  + ',' + r  +
            ' 0 ' + big+ ' 1 ' +
            x2 + ',' + y2 +
            ' Z';

    path.setAttribute('d',d);
    path.setAttribute('fill', colors[i]);
    path.setAttribute('stroke','black');
    path.setAttribute('stroke-width', '2');
    chart.appendChild(path);

    startAngle = endAngle;

    var icon = document.createElementNS(svgns, 'rect');
    icon.setAttribute('x', lx);
    icon.setAttribute('y', ly + 30*i);
    icon.setAttribute('width', 20);
    icon.setAttribute('height', 20);
    icon.setAttribute('fill', colors[i]);
    icon.setAttribute('stroke', 'black');
    icon.setAttribute('stroke-width', '2');
    chart.appendChild(icon);

    var label = document.createElementNS(svgns, 'text');
    label.setAttribute('x', lx + 30);
    label.setAttribute('y', ly + 30*i + 18);
    label.setAttribute('font-family', 'sans-serif');
    label.setAttribute('font-size', '16');
    label.appendChild(document.createTextNode(labels[i]));
    chart.appendChild(label);
  }

  return chart;
}

function updateTime(){
  var now = new Date();
  var second = now.getSeconds(),
      min  = now.getMinutes() + second/60,
      hour = (now.getHours() % 12 ) + min/60;
      
  var minAngle = min * 6,
      hourAngle = hour * 30,
      secAngle = second * 6;
  var minutehand = document.getElementById('minutehand'),
      hourhand = document.getElementById('hourhand'),
      secondhand = document.getElementById('secondhand');

  minutehand.setAttribute('transform', 'rotate('+ minAngle+',50,50)');
  hourhand.setAttribute('transform', 'rotate('+ hourAngle+',50,50)');
  secondhand.setAttribute('transform', 'rotate('+ secAngle +',50,50)');

  setTimeout(updateTime, 500);
}

function drawTicks(cx, cy, r, id){
  var svgns = 'http://www.w3.org/2000/svg';
  var x1, y1, x2, y2,
      r1 = 44,
      r2 = r,
      angle,
      ticks_container = document.getElementById(id);

  for(var i=0;i</datalength;i++){>