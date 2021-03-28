var showTimedEvents = true;
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'UTC',
    editable: true,
    initialView: 'resourceTimelineDay',
    initialDate: '2020-06-16',
    headerToolbar: {
      left: 'prev,next today filter unfilter',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimeGridDay'
    },
    customButtons: {
      filter: {
        text: 'hide timed events!!!',
        click: function() {
          showTimedEvents = false
          calendar.setOption('filterResourcesWithEvents', true)
          calendar.refetchEvents()
          console.log('hidding events...')
        }
      },
      unfilter: {
        text: 'reveal timed events',
        click: function() {
          showTimedEvents = true
          calendar.setOption('filterResourcesWithEvents', false)
          calendar.refetchEvents()
          console.log('revealing events...')
        }
      } 
    },
    loading: function( isLoading ) {
      console.log('loading', isLoading)
    },
    resourceAreaHeaderContent: 'Rooms',
    views: {
      resourceTimelineDay: { buttonText: 'timeline' },
      resourceTimeGridDay: { buttonText: 'timeGrid' }
    },
    events: function(fetchInfo, success) {
      var rawEvents = [
        {
          resourceId: 'a',
          title: 'Timed Event',
          start: '2020-06-16T16:00:00+00:00'
        },
        {
          resourceId: 'b',
          title: 'Conference',
          start: '2020-06-16'
        },
        {
          resourceId: 'c',
          title: 'Meeting',
          start: '2020-06-16T10:30:00+00:00',
          end: '2020-06-16T12:30:00+00:00'
        },
        {
          resourceId: 'a',
          title: 'Lunch',
          start: '2020-06-16T12:00:00+00:00'
        }
      ]
      if (!showTimedEvents) {
        rawEvents = rawEvents.filter(function(rawEvent) {
          return rawEvent.start.length <= 10
        })
      }
      success(rawEvents)
    },
    resources: [
      {
        id: 'a',
        title: 'Auditorium A'
      },
      {
        id: 'b',
        title: 'Auditorium B'
      },
      {
        id: 'c',
        title: 'Auditorium C'
      },
      {
        id: 'd',
        title: 'Auditorium D'
      }
    ]
  });

  calendar.render();
});