/*
* Timeliner.js
* @version		1.0
* @copyright	Tarek Anandan (http://www.technotarek.com)
*/

$(document).ready(function() {
	//hide elements
	$(".timelineEvent").hide();


	// Single Event
	$(".timelineMinor dt").toggle(function(){

		var currentId = $(this).attr('id');

		// open Event
		$("a",this)
			.removeClass('closed')
			.addClass('open')
			.animate({ fontSize: "1.2em" }, 200);

		$("#"+currentId+"EX").show(600);

	},function()
	{
		var currentId = $(this).attr('id');

		// close Event
		$("a",this)
			.animate({ fontSize: "1.0em" }, 0)
			.removeClass('open')
			.addClass('closed');

		$("#"+currentId+"EX").hide(500);

	});

	// Single Year
	$(".timelineMajor h2").toggle(function()
	{
		// reset all animations
		$(this).parents(".timelineMajor").find("dt a","dl.timelineMinor")
			.animate({ fontSize: "1.2em" }, 400)
			.removeClass('closed')
			.addClass('open');
		$(this).parents(".timelineMajor").find(".timelineEvent").show(800);

	},function()
	{
		// reset all animations
		$(this).parents(".timelineMajor").find("dl.timelineMinor a")
			.animate({ fontSize: "1.0em" }, 400)
			.removeClass('open')
			.addClass('closed');
		$(this).parents(".timelineMajor").find(".timelineEvent").hide(800);
	});

	// All Years/Events
	$(".expandAll").toggle(function()
	{
		// reset all animations
		$(this).parents("#timelineContainer").find("dt a","dl.timelineMinor")
			.animate({ fontSize: "1.2em" }, 400)
			.removeClass('closed')
			.addClass('open');
		$(this).parents("#timelineContainer").find(".timelineEvent").show(800);
		$(this).html("- collapse all");

	},function()
	{
		// reset all animations
		$(this).parents("#timelineContainer").find("dl.timelineMinor a")
			.animate({ fontSize: "1.0em" }, 400)
			.removeClass('open')
			.addClass('closed');
		$(this).parents("#timelineContainer").find(".timelineEvent").hide(800);
		$(this).html("+ expand all");
	});
});