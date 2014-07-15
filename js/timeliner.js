/*
* Timeliner.js
* @version		1.6.1
* @copyright	Tarek Anandan (http://www.technotarek.com)
*/
;(function($) {

        $.timeliner = function(options) {
            if ($.timeliners == null) {
                $.timeliners = { options: [] };
                $.timeliners.options.push(options);
            }
            else {
                $.timeliners.options.push(options);
            }
            $(document).ready(function() {
                for (var i=0; i<$.timeliners.options.length; i++) {
                    startTimeliner($.timeliners.options[i]);
                }
            });
        }

        function startTimeliner(options) {
            var settings = {
                timelineContainer: options['timelineContainer'] || '#timelineContainer', // value: selector of the main element holding the timeline's content
                // default to #timelineContainer
                timelineEXContent: options['timelineEXContent'] || '.timelineEvent', // value: tag structure where expanded content will live.
                // A timeline Item's EX ID should always be on this item.
                timelineSection: options['timelineSection'] || '.timelineMajor',
                timelineSectionMarker: options['timelineSectionMarker'] || '.timelineMajorMarker',
                timelineTriggerContainer: options['timelineTriggerContainer'] || '.timelineMinor dt', // value: tag structure for the container that will trigger the expand
                // A timeline item's ID should always be on this item.
                timelineTriggerAnchor: options['timelineTriggerAnchor'] || 'a', // value: tag structure from the trigger container to the anchor that will be tagged 'open' or 'closed'
                EXContentIdSuffix: options['timelineEXContentSuffix'] || 'EX', // value: ID suffix to identify expanded content
                oneOpen: options['oneOpen'] || false, // value: true | false
                // default to false; sets whether only one item on the timeline can
                // be open at a time. If true, other items will close when one is opened.
                startState: options['startState'] || 'closed', // value: closed | open,
                // default to closed; sets whether the timeline is
                // initially collapsed or fully expanded
                startOpen: options['startOpen'] || [], // value: array of IDs of
                // single timelineEvents, default to empty; sets
                // the minor events that you want to display open
                // by default on page load
                baseSpeed: options['baseSpeed'] || 200, // value: numeric, default to
                // 200; sets the base speed for animation of the
                // event marker
                speed: options['speed'] || 4, // value: numeric, defalut to 4; a
                // multiplier applied to the base speed that sets
                // the speed at which an event's conents are
                // displayed and hidden
                fontOpen: options['fontOpen'] || '1.2em', // value: any valid CSS
                // font-size value, defaults to 1em; sets the font
                // size of an event after it is opened
                fontClosed: options['fontClosed'] || '1em', // value: any valid CSS
                // font-size value, defaults to 1em; sets the font
                // size of an event after it is closed
                expandAllText: options ['expandAllText'] || '+ expand all', // value:
                // string, sets the text of the expandAll selector
                // after the timeline is fully collapsed
                collapseAllText: options['collapseAllText'] || '- collapse all' // // value:
                // string, sets the text of the expandAll selector
                // after the timeline is fully expanded
            };

            function openEvent(eventHeading,eventBody) {
                $(eventHeading)
                    .removeClass('closed')
                    .addClass('open')
                    .animate({ fontSize: settings.fontOpen }, settings.baseSpeed);
                $(eventBody).show(settings.speed*settings.baseSpeed);
            }

            function closeEvent(eventHeading,eventBody) {
                $(eventHeading)
                    .animate({ fontSize: settings.fontClosed }, 0)
                    .removeClass('open')
                    .addClass('closed');
                $(eventBody).hide(settings.speed*settings.baseSpeed);
            }


            if ($(settings.timelineContainer).data('started')) {
                return;                 // we already initialized this timelineContainer
            } else {
                $(settings.timelineContainer).data('started', true);
                $(settings.timelineContainer+" "+".expandAll").html(settings.expandAllText);
                $(settings.timelineContainer+" "+".collapseAll").html(settings.collapseAllText);

                // If startState option is set to closed, hide all the events; else, show fully expanded upon load
                if(settings.startState==='closed')
                {
                    // Close all items
                    $(settings.timelineContainer+" "+settings.timelineEXContent).hide();

                    // show startOpen events
                    $.each($(settings.startOpen), function(index, value) {
                        //openEvent($(value).parent(settings.timelineContainer).find(settings.timelineTriggerContainer+" "+settings.timelineTriggerAnchor),$(value+settings.EXContentIdSuffix));
                        openEvent($(value).find(settings.timelineTriggerAnchor),$(value+settings.EXContentIdSuffix));
                    });

                }else{

                    // Open all items
                    openEvent($(settings.timelineContainer+" "+settings.timelineTriggerContainer+" "+settings.timelineTriggerAnchor),$(settings.timelineContainer+" "+settings.timelineEXContent));

                }

                // Minor Event Click
                $(settings.timelineContainer).on("click",settings.timelineTriggerContainer,function(){

                    var currentId = $(this).attr('id');

                    // if the event is currently open
                    if($(this).find(settings.timelineTriggerAnchor).is('.open'))
                    {

                        closeEvent($(settings.timelineTriggerAnchor,this),$("#"+currentId+settings.EXContentIdSuffix))

                    } else{ // if the event is currently closed

                        if( settings.oneOpen == true ) {
                            closeEvent($(this).parents(settings.timelineContainer).find(settings.timelineTriggerAnchor,settings.timelineTriggerContainer),$(this).parents(settings.timelineContainer).find(settings.timelineEXContent));
                        }

                        openEvent($(settings.timelineTriggerAnchor, this),$("#"+currentId+settings.EXContentIdSuffix));

                    }

                });

                // Major Marker Click
                // Overrides the 'oneOpen' option
                $(settings.timelineContainer).on("click",settings.timelineSectionMarker,function()
                {

                    // number of minor events under this major event
                    var numEvents = $(this).parents(settings.timelineSection).find(settings.timelineTriggerContainer).length;

                    // number of minor events already open
                    var numOpen = $(this).parents(settings.timelineSection).find('.open').length;

                    // This closes other items if oneOpen is true. It looks odd if an item in the section was open. Need to improve this.
                    if( settings.oneOpen == true ) {
                        closeEvent($(this).parents(settings.timelineContainer).find(settings.timelineTriggerAnchor,settings.timelineTriggerContainer),$(this).parents(settings.timelineContainer).find(settings.timelineEXContent));
                    }

                    if(numEvents > numOpen )
                    {

                        openEvent($(this).parents(settings.timelineSection).find(settings.timelineTriggerAnchor,settings.timelineTriggerContainer),$(this).parents(settings.timelineSection).find(settings.timelineEXContent));

                    } else{

                        closeEvent($(this).parents(settings.timelineSection).find("dl.timelineMinor a"),$(this).parents(settings.timelineSection).find(settings.timelineEXContent));

                    }
                });

                // All Markers/Events
                $(settings.timelineContainer+" "+".expandAll").click(function()
                {
                    if($(this).hasClass('expanded'))
                    {

                        closeEvent($(this).parents(settings.timelineContainer).find(settings.timelineTriggerAnchor,settings.timelineTriggerContainer),$(this).parents(settings.timelineContainer).find(settings.timelineEXContent));
                        $(this).removeClass('expanded').html(settings.expandAllText);

                    } else{

                        openEvent($(this).parents(settings.timelineContainer).find(settings.timelineTriggerAnchor,settings.timelineTriggerContainer),$(this).parents(settings.timelineContainer).find(settings.timelineEXContent));
                        $(this).addClass('expanded').html(settings.collapseAllText);

                    }
                });
            }
	    };

})(jQuery);
