/*
* Timeliner.js
* @version		2.0
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
                timelineContainer: options['timelineContainer'] || '#timeline',
                // Container for the element holding the entire timeline (e.g. a DIV)
                // value: ID or class selector
                // default: #timeline
                // note: must be unique for each timeline on page

                timelineSection: options['timelineSection'] || '.timeline-wrapper',
                // Wrapper that contains items under a specific marker (e.g., all of the events under a year on the timeline)
                // value: class selector
                // default: .timeline-wrapper
                // note: changing this selector from the default will require modifications to the CSS file in order to retain default styling

                timelineSectionMarker: options['timelineSectionMarker'] || '.timeline-year',
                // Class selector applied to each major item on the timeline, such as each year
                // value: class selector
                // default: .timeline-year

                timelineTriggerContainer: options['timelineTriggerContainer'] || '.timeline-event',
                // Class assigned to wrappers surrounding each individual event
                // value: selector
                // default: .timeline-event
                // note: changing this selector from the default will require modifications to the CSS file in order to retain default styling

                timelineTriggerAnchor: options['timelineTriggerAnchor'] || 'a',
                // Element that is wrapped around the event's title; when clicked, expands the event and reveals its full contents
                // value: tag/element
                // default: a
                // note: changing this tag from the default will require modifications to the CSS file in order to retain default styling

                timelineEXContent: options['timelineEXContent'] || '.timeline-event-ex',
                // Element that contains the event's full content to be displayed when event is expanded, an event's expanded ID should alway be on this item
                // value: class selector
                // default: .timeline-event-ex
                // note: changing this selector from the default will require modifications to the CSS file in order to retain default styling

                EXContentIdSuffix: options['timelineEXContentSuffix'] || 'EX',
                // ID suffix to identify expanded (aka EX) content
                // value: string
                // default: EX

                oneOpen: options['oneOpen'] || false,
                // sets whether only one item on the timeline can be open at a time. If true, other items will close when one is opened.
                // value: true | false
                // default: false
                // note: does not apply to events identified in startOpen option

                startState: options['startState'] || 'closed',
                // sets whether the timeline is initially collapsed or fully expanded
                // value: closed | open
                // default: closed
                // note: setting to "open" makes the startOpen option meaningless

                startOpen: options['startOpen'] || [],
                // sets the events to display expanded on page load
                // value: array of IDs of single timelineEvents (e.g., ['#event01'] or ['#event01','#event02'])
                // default: []

                baseSpeed: options['baseSpeed'] || 200,
                // sets the base speed for animation of an event
                // value: numeric
                // default: 200

                speed: options['speed'] || 4,
                // multiplier applied to the base speed that sets the speed at which an event's contents are displayed and hidden
                // value: numeric
                // default: 4

                fontOpen: options['fontOpen'] || '1.2em',
                // sets the font size of an event after it is opened
                // value: any valid CSS font-size value,
                // default: 1.2em

                fontClosed: options['fontClosed'] || '1em',
                // sets the font size of an event after it is closed
                // value: any valid CSS font-size value
                // defaults: 1em

                expandAllText: options ['expandAllText'] || '+ expand all',
                // sets the text of the expandAll selector after the timeline is fully collapsed
                // value: string
                // default: + expand all

                collapseAllText: options['collapseAllText'] || '- collapse all'
                //sets the text of the expandAll selector after the timeline is fully expanded
                // value: string
                // default: - collapse all
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
                return;
                // we already initialized this timelineContainer
            } else {
                $(settings.timelineContainer).data('started', true);
                $(settings.timelineContainer+" "+".timeline-toggle").html(settings.expandAllText);
                $(settings.timelineContainer+" "+".collapseAll").html(settings.collapseAllText);

                // If startState option is set to closed, hide all the events; else, show fully expanded upon load
                if(settings.startState==='closed')
                {
                    // Close all items
                    $(settings.timelineContainer+" "+settings.timelineEXContent).hide();

                    // show startOpen events
                    $.each($(settings.startOpen), function(index, value) {
                        openEvent($(value).find(settings.timelineTriggerAnchor),$(value+settings.EXContentIdSuffix));
                    });

                }else{

                    // Open all items
                    openEvent($(settings.timelineContainer+" "+settings.timelineTriggerContainer+" "+settings.timelineTriggerAnchor),$(settings.timelineContainer+" "+settings.timelineEXContent));

                }

                // Minor Event Click
                $(settings.timelineContainer).on("click",settings.timelineTriggerContainer+" dt",function(){

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

                        closeEvent($(this).parents(settings.timelineSection).find("dl"+settings.timelineTriggerContainer+" a"),$(this).parents(settings.timelineSection).find(settings.timelineEXContent));

                    }
                });

                // All Markers/Events
                $(settings.timelineContainer+" "+".timeline-toggle").click(function()
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
