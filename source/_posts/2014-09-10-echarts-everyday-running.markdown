---
layout: post
title: "ECharts.js：每日跑步记录"
date: 2014-09-10 22:33
comments: true
keywords: echarts.js
categories: JavaScript
---
工作了将近两个月，也就是每周末去踢一下午球，总是感觉体力不支，随时要挂。决定工作日的晚上出去跑一跑。下了个虎扑跑步APP，记录里程、时长、卡路里等参数，然后用百度的ECharts.js来呈现自己每天的跑步运动量于此。

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
	        trigger: 'axis'
	    },
	    legend: {
	        data:['里程','卡路里']
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
	            data : ['2014-09-10', '2014-09-11']
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
	                formatter: '{value} cal'
	            }
	        }
	    ],
	    series : [
	        {
	            name:'里程',
	            type:'bar',
	            data:[3.09, 0],
	            yAxisIndex: 0,
	            markLine : {
	                data : [
	                    {type : 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name:'卡路里',
	            type:'bar',
	            data:[282, 0],
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