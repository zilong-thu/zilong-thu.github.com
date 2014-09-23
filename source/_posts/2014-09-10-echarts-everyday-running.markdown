---
layout: post
title: "ECharts.js：每日跑步记录"
date: 2014-09-10 22:33
comments: true
keywords: echarts.js
categories: JavaScript
---
工作了将近两个月，也就是每周末去踢一下午球，总是感觉体力不支，随时要挂。决定工作日的晚上出去跑一跑。下了个虎扑跑步APP，记录里程、时长、卡路里等参数，然后用百度的ECharts.js来呈现自己每天的跑步运动量于此。

后来的数据包括周末外出踢球的跑步估测值。

记录的时间：2014-09-10之后的十天

<!-- more -->

<div id="echarts-everyday-running" style="width:100%;"></div>

<script src="/javascripts/echarts/echarts-plain.js"></script>
<script>

(function(){
	var domEC = document.getElementById('echarts-everyday-running');

	domEC.style.height = parseInt(domEC.offsetWidth) * 0.618 + 'px';

	var option = {
	    title : {
	        text: '每日跑步运动量 @wzl',
	        subtext: '真实数据'
	    },
	    tooltip : {
	        trigger: 'axis',
	        type: 'shadow'
	    },
	    legend: {
	        data:['里程','耗时']
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : ['2014-09-10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            axisLabel : {
	                formatter: '{value} km'
	            }
	        },{
	            type : 'value',
	            axisLabel : {
	                formatter: '{value} hour'
	            }
	        }
	    ],
	    series : [
	        {
	            name:'里程',
	            type:'bar',
	            data:[3.09, 0, 0, 4, 3.5, 0, 0, 0, 0, 0, 2.5, 2.5],
	            yAxisIndex: 0,
	            markLine : {
	                data : [
	                    {type : 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name:'耗时',
	            type:'bar',
	            data:[0.4, 0, 0, 2, 3, 0, 0, 0, 0, 0, 2, 2.2],
	            yAxisIndex: 1,
	            markLine : {
	                data : [
	                    {type : 'average', name : '平均值'}
	                ]
	            }
	        }
	    ]
	};

	var myChart = echarts.init(domEC);
	 myChart.setOption(option);

})();

</script>