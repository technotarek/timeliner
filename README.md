# Timeliner

## Overview
Build a simple, interactive, historical timeline with HTML, CSS, and jQuery. The benefits of this timeline script are that it's (1) fully accessible and 508 compliant (an original requirement) (2) simple, (3) able to handle nearly any form of content, and (4) printer friendly. There's also plenty of room for you to get creative with the styling. (Please drop me a line if you do do something cool with it.)

## Demo
*	http://www.technotarek.com/timeliner/timeliner.html

Other, more complex timeline plugins are available. If your needs are far greater than those provided here, consider one of the following:

*	https://github.com/VeriteCo/Timeline
*	http://www.csslab.cl/2011/08/18/jquery-timelinr/
*	http://timeglider.com/jquery/


## Requirements
*	jQuery
*	Optional: Jack Moore's ColorBox jQuery plugin

## Usage
1. Include screen.css and timeliner.js (or timeliner.min.js). Optionally, include also responsive.css for basic responsive behavior on phones and mobile devices below 480px wide (iPad responsive behavior forthcoming).

2. Wrap your timeline in an element with an ID of timelineContainer. You can set your own container using the plugin's options

		<div id="timelineContainer">
			...
		</div>

3. Separate the major marker content (e.g., content for each century, year, decade etc) into elements with a class of timelineMajor

		<div class="timelineMajor">
			...
		</div>

4. Wrap the major markers in an element with a class of 'timelineMajorMarker'

		<h2 class="timelineMajorMarker">1954</h2>

5. Separate the individual events into DL elements with a class of timelineMinor

		<dl class="timelineMinor">
			...
		</dl>

6. Wrap the title of the individual events in a DT and A tag; give each DT a unique ID

		<dt id="19540517"><a>Brown vs Board of Education</a></dt>

7. Wrap the (hidden) content of each event in a DL tag; give each DL an ID based on the DT with 'EX' appended, a class of 'timeline', and set the display to 'none'

		<dd class="timelineEvent" id="19540517EX" style="display: none;">
			...
		</dd>

8. Instantiate:

		$.timeliner();

9. Or, instantiate with options:

		$.timeliner({
			timelineContainer: '#timelineContainer', // value: selector of the main element holding the timeline's content, default to #timelineContainer
			startState: 'closed', // value: closed | open, default to closed; determines whether the timeline is initially collapsed or fully expanded
			startOpen: [], // value: array of IDs of single timelineEvents, default to empty; determines the minor event that you want to display open by default on page load
			baseSpeed: 200, // value: any integer, default to 200; determines the base speed, some animations are a multiple (4x) of the base speed
			speed: 4, // value: numeric, defalut to 4; a multiplier applied to the base speed that sets the speed at which an event's conents are displayed and hidden
			fontOpen: '1.2em', // value: any valid CSS font-size value, defaults to 1em; sets the font size of an event after it is opened
			fontClosed: '1em', // value: any valid CSS font-size value, defaults to 1em; sets the font size of an event after it is closed
			expandAllText: '+ expand all', // value: string; defaults to '+ expand all'
			collapseAllText: '- collapse all' // value: string; defaults to '- collapse all'
		});

10. Options: Most options are self explanatory based on example above. For the startOpen option, provide an array of IDs of specific timelineEvents such as ['#event01EX'] or ['#event01EX','#event02EX']. This will set those timelineEvents to open by default. See the demo at  http://www.technotarek.com/timeliner/timeliner.html for a working example.

11. Add an expand/collapse all events by adding the following inside of the main #timelineContainer. If you used the expandAll option when instantiating Timeliner, then update the value \(but not the class\) of the anchor to match:

		<div class="timelineToggle"><p><a class="expandAll">+ expand all</a></p></div>

## Sample

A timeline with only one major marker and two events would look like this:

	<div id="timelineContainer">
		<div class="timelineMajor">
			<h2 class="timelineMajorMarker">Major Marker</h2>
			<dl class="timelineMinor">
				<dt id="event01"><a>Event</a></dt>
				<dd class="timelineEvent" id="event01EX" style="display: none; ">
					<p>Content about the event goes here.</p>
				</dd><!-- /.timelineEvent -->
			</dl><!-- /.timelineMinor -->
			<dl class="timelineMinor">
				<dt id="event02"><a>Another Event</a></dt>
				<dd class="timelineEvent" id="event02EX" style="display: none; ">
					<p>Content about the other event.</p>
				</dd><!-- /.timelineEvent -->
			</dl><!-- /.timelineMinor -->
		</div><!-- /.timelineMajor -->
	</div><!-- /#timelineContainer -->

## Additional Examples
*	http://www.investigatingpower.org/timelines/mccarthyism/
*	http://www.ncld-youth.info/index.php?id=61

## Change Log

###### v1.5.responsive (7/9/2013)
*	Added basic responsive behavior for phone/mobile devices below 480px wide (supported partially by code contributed by Geus Maxime)

###### v1.5 (6/7/2013)
*	startOpen option now accepts multiple timeline events

###### v1.4.1 (6/7/2013)
*	Merged in openStart-fix \(via rs017991\)

###### v1.4 (4/27/2013)
*	Fixed jQuery 1.9 Toggle deprecation \(#0d2755 via Marco129\)
*	Customization for expand/collpase all \(#927fac via Marco129\)
*	Updated ColorBox plugin for jQuery 1.9

###### v1.3 (1/25/2013)
*	Major js code simplification and optimization

###### v1.2 (1/24/2013)
*	Added in additional instantiation options
*	Fixed startOpen bug

###### v1.1 (1/23/2013)
*	Added startOpen option

###### v1.0 (5/1/2012)
*	First release

## Credits
The content used in the repo and in the demo is from the Investigating Power project (http://www.investigatingpower.org), a website which I developed on behalf of author and journalist Charles Lewis.

The repo is packaged with a version of Jack Moore's ColorBox jQuery plugin (http://www.jacklmoore.com/colorbox). It is for demonstration purposes only. See https://github.com/jackmoore/colorbox for support.

### License
Timeliner by Tarek Anandan is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License. Really all that's important to me is that you try to [let me know](http://www.technotarek.com/contact "contact") if you implement it somewhere so I can take a peek.