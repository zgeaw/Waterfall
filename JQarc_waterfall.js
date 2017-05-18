(function($) {
	var Waterfall = function(opts) {
		var _this = this;
		//默认配置参数
		this.config = {
			wrap: '.arc_waterfall', //瀑布流模块
			content: '.arc_waterfall_box', //图片模块
			columns: 3 //默认列数
		}

		if(opts && $.isPlainObject(opts)) { //默认参数扩展
			$.extend(this.config, opts);
		}
		setTimeout(function() {
			_this.init();
		}, 100); //延迟100毫秒初始化DOM
	};
	Waterfall.prototype = { //扩展waterfall属性
		init: function() { //创建弹出层
			var _this_ = this,
				config = this.config,
				$wrap = $(config.wrap),
				$content = $wrap.find(config.content),
				cols = config.columns,
				w = $wrap.outerWidth() / cols,
				hArr = [],
				totalH = [],
				maxHIndex = 0;
			$content.css({ 'width': w + 'px' });
			$content.each(function(index, value) {
				var _this = $(this),
					 h = _this.outerHeight();
				if(index < cols) {
					hArr[index] = h;
					_this.attr('style','width:'+w+'px');
				} else {
					var minH = Math.min.apply(null, hArr), //最小高度
						minHIndex = $.inArray(minH, hArr), //最小高度索引
						maxH = Math.max.apply(null, hArr); //最大高度
					maxHIndex = Math.max.apply(null, hArr); //计算模块整体高度
					_this.css({ //设置绝对定位
						'position': 'absolute'
					}).animate({						
						'top': minH + 'px',
						'left': minHIndex * w + 'px'
					},'slow');
					hArr[minHIndex] += _this.outerHeight(); //重新排序数组
				}
			});
			$wrap.height(maxHIndex); //设置模块高度
		}
	};
	window.Waterfall = Waterfall; //注册window对象
	$.Waterfall = function(config) { //注册JQ插件
		return new Waterfall(config);
	}
})(jQuery);