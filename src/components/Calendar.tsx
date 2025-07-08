
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, Clock, Plus, Edit, Trash2, 
  User, MapPin, Video, Phone, ChevronLeft, ChevronRight 
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'call' | 'deadline' | 'reminder';
  description?: string;
  location?: string;
  attendees?: string[];
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Financial Review Meeting',
      date: '2024-01-15',
      time: '10:00',
      type: 'meeting',
      description: 'Monthly financial performance review',
      location: 'Conference Room A',
      attendees: ['team@company.com']
    },
    {
      id: '2',
      title: 'Investor Call',
      date: '2024-01-18',
      time: '14:30',
      type: 'call',
      description: 'Q4 results discussion with investors',
      attendees: ['investor@fund.com']
    },
    {
      id: '3',
      title: 'Tax Filing Deadline',
      date: '2024-01-31',
      time: '23:59',
      type: 'deadline',
      description: 'Submit Q4 tax documents'
    }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'meeting' as Event['type'],
    description: '',
    location: '',
    attendees: ''
  });

  const { toast } = useToast();

  // Calendar logic
  const today = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setNewEvent(prev => ({ ...prev, date: formatDate(clickedDate) }));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in title, date, and time.",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      description: newEvent.description,
      location: newEvent.location,
      attendees: newEvent.attendees ? newEvent.attendees.split(',').map(email => email.trim()) : []
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      type: 'meeting',
      description: '',
      location: '',
      attendees: ''
    });
    setShowEventForm(false);
    
    toast({
      title: "Event Added",
      description: "Your event has been successfully added to the calendar.",
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "The event has been removed from your calendar.",
    });
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'call': return 'bg-green-100 text-green-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return User;
      case 'call': return Phone;
      case 'deadline': return Clock;
      case 'reminder': return CalendarIcon;
      default: return CalendarIcon;
    }
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-24"></div>);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    const dayEvents = getEventsForDate(dateString);
    const isToday = today.getDate() === day && 
                   today.getMonth() === currentDate.getMonth() && 
                   today.getFullYear() === currentDate.getFullYear();
    const isSelected = selectedDate?.getDate() === day &&
                      selectedDate?.getMonth() === currentDate.getMonth() &&
                      selectedDate?.getFullYear() === currentDate.getFullYear();

    calendarDays.push(
      <div
        key={day}
        onClick={() => handleDateClick(day)}
        className={`h-24 p-1 border border-gray-200 cursor-pointer hover:bg-gray-50 ${
          isToday ? 'bg-blue-50 border-blue-300' : ''
        } ${isSelected ? 'bg-blue-100 border-blue-400' : ''}`}
      >
        <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
          {day}
        </div>
        <div className="space-y-1 mt-1">
          {dayEvents.slice(0, 2).map(event => (
            <div
              key={event.id}
              className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate"
              title={event.title}
            >
              {event.time} {event.title}
            </div>
          ))}
          {dayEvents.length > 2 && (
            <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Manage your financial meetings and deadlines</p>
        </div>
        <Button onClick={() => setShowEventForm(true)} className="bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-0 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="h-8 flex items-center justify-center font-medium text-gray-500 text-sm">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0 border border-gray-200">
                {calendarDays}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Panel */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>Your next scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events
                  .filter(event => new Date(event.date + 'T' + event.time) >= new Date())
                  .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
                  .slice(0, 5)
                  .map(event => {
                    const EventIcon = getEventTypeIcon(event.type);
                    return (
                      <div key={event.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <EventIcon className="h-4 w-4 text-gray-500" />
                              <span className="font-medium text-sm">{event.title}</span>
                            </div>
                            <div className="text-xs text-gray-600 space-y-1">
                              <div>{event.date} at {event.time}</div>
                              {event.location && (
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                            <Badge className={`mt-2 ${getEventTypeColor(event.type)}`} variant="secondary">
                              {event.type}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                {events.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No events scheduled</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Add Event Form */}
          {showEventForm && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add New Event</CardTitle>
                <CardDescription>Schedule a new event or deadline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Event title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date *</label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Time *</label>
                    <Input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as Event['type'] }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="call">Call</option>
                    <option value="deadline">Deadline</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Meeting location or video link"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Event description"
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Attendees</label>
                  <Input
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, attendees: e.target.value }))}
                    placeholder="email1@domain.com, email2@domain.com"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleAddEvent} className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                  <Button variant="outline" onClick={() => setShowEventForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
