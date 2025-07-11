
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, Clock, Plus, Edit, Trash2, 
  User, MapPin, Video, Phone, ChevronLeft, ChevronRight,
  Bell, Repeat, Users, FileText, CheckSquare, Star
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'call' | 'deadline' | 'reminder' | 'task' | 'review';
  description?: string;
  location?: string;
  attendees?: string[];
  priority?: 'low' | 'medium' | 'high';
  recurring?: boolean;
  completed?: boolean;
  category?: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Riunione Revisione Finanziaria',
      date: '2024-01-15',
      time: '10:00',
      type: 'meeting',
      description: 'Revisione mensile delle performance finanziarie',
      location: 'Sala Conferenze A',
      attendees: ['team@company.com'],
      priority: 'high',
      category: 'Finanza'
    },
    {
      id: '2',
      title: 'Chiamata con Investitori',
      date: '2024-01-18',
      time: '14:30',
      type: 'call',
      description: 'Discussione risultati Q4 con gli investitori',
      attendees: ['investor@fund.com'],
      priority: 'high',
      category: 'Investimenti'
    },
    {
      id: '3',
      title: 'Scadenza Dichiarazione Fiscale',
      date: '2024-01-31',
      time: '23:59',
      type: 'deadline',
      description: 'Invio documenti fiscali Q4',
      priority: 'high',
      category: 'Fiscale'
    }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'meeting' as Event['type'],
    description: '',
    location: '',
    attendees: '',
    priority: 'medium' as Event['priority'],
    recurring: false,
    category: ''
  });

  const { toast } = useToast();

  // Calendar logic
  const today = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

  const eventCategories = ['Finanza', 'Investimenti', 'Fiscale', 'Operazioni', 'Marketing', 'HR', 'Legale'];

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
    return events.filter(event => {
      if (filterCategory !== 'all' && event.category !== filterCategory) {
        return false;
      }
      return event.date === date;
    });
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setNewEvent(prev => ({ ...prev, date: formatDate(clickedDate) }));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast({
        title: "Informazioni Mancanti",
        description: "Inserisci titolo, data e orario.",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      description: newEvent.description,
      location: newEvent.location,
      attendees: newEvent.attendees ? newEvent.attendees.split(',').map(email => email.trim()) : [],
      priority: newEvent.priority,
      recurring: newEvent.recurring,
      category: newEvent.category,
      completed: false
    };

    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? event : e));
      toast({
        title: "Evento Aggiornato",
        description: "L'evento è stato modificato con successo.",
      });
    } else {
      setEvents(prev => [...prev, event]);
      toast({
        title: "Evento Aggiunto",
        description: "Il tuo evento è stato aggiunto al calendario.",
      });
    }

    // Reset form
    setNewEvent({
      title: '',
      date: '',
      time: '',
      type: 'meeting',
      description: '',
      location: '',
      attendees: '',
      priority: 'medium',
      recurring: false,
      category: ''
    });
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      description: event.description || '',
      location: event.location || '',
      attendees: event.attendees?.join(', ') || '',
      priority: event.priority || 'medium',
      recurring: event.recurring || false,
      category: event.category || ''
    });
    setShowEventForm(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast({
      title: "Evento Eliminato",
      description: "L'evento è stato rimosso dal calendario.",
    });
  };

  const handleToggleComplete = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, completed: !event.completed } : event
    ));
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'call': return 'bg-green-100 text-green-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      case 'task': return 'bg-purple-100 text-purple-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return User;
      case 'call': return Phone;
      case 'deadline': return Clock;
      case 'reminder': return Bell;
      case 'task': return CheckSquare;
      case 'review': return FileText;
      default: return CalendarIcon;
    }
  };

  const getPriorityColor = (priority: Event['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
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
          {dayEvents.slice(0, 2).map(event => {
            const Icon = getEventTypeIcon(event.type);
            return (
              <div
                key={event.id}
                className={`text-xs p-1 rounded flex items-center space-x-1 ${getEventTypeColor(event.type)} ${event.completed ? 'opacity-50 line-through' : ''}`}
                title={event.title}
              >
                <Icon className="h-2 w-2" />
                <span className="truncate">{event.time} {event.title}</span>
                {event.priority === 'high' && <Star className="h-2 w-2 text-red-500" />}
              </div>
            );
          })}
          {dayEvents.length > 2 && (
            <div className="text-xs text-gray-500">+{dayEvents.length - 2} altri</div>
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
          <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
          <p className="text-gray-600">Gestisci i tuoi appuntamenti finanziari e scadenze</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filtra categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le categorie</SelectItem>
              {eventCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowEventForm(true)} className="bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi Evento
          </Button>
        </div>
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
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Oggi
                  </Button>
                </div>
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
              <CardTitle className="text-lg">Prossimi Eventi</CardTitle>
              <CardDescription>I tuoi prossimi appuntamenti programmati</CardDescription>
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
                      <div key={event.id} className={`p-3 border border-gray-200 rounded-lg ${event.completed ? 'opacity-60' : ''}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <EventIcon className="h-4 w-4 text-gray-500" />
                              <span className={`font-medium text-sm ${event.completed ? 'line-through' : ''}`}>
                                {event.title}
                              </span>
                              {event.priority === 'high' && (
                                <Star className={`h-3 w-3 ${getPriorityColor(event.priority)}`} />
                              )}
                            </div>
                            <div className="text-xs text-gray-600 space-y-1">
                              <div>{event.date} alle {event.time}</div>
                              {event.location && (
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {event.location}
                                </div>
                              )}
                              {event.category && (
                                <Badge variant="outline" className="text-xs">
                                  {event.category}
                                </Badge>
                              )}
                            </div>
                            <Badge className={`mt-2 ${getEventTypeColor(event.type)}`} variant="secondary">
                              {event.type === 'meeting' ? 'Riunione' : 
                               event.type === 'call' ? 'Chiamata' :
                               event.type === 'deadline' ? 'Scadenza' :
                               event.type === 'reminder' ? 'Promemoria' :
                               event.type === 'task' ? 'Attività' : 'Revisione'}
                            </Badge>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleComplete(event.id)}
                              className={event.completed ? 'text-green-600' : 'text-gray-400'}
                            >
                              <CheckSquare className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditEvent(event)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
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
                      </div>
                    );
                  })}
                {events.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nessun evento programmato</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Add Event Form */}
          {showEventForm && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingEvent ? 'Modifica Evento' : 'Aggiungi Nuovo Evento'}
                </CardTitle>
                <CardDescription>Programma un nuovo evento o scadenza</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Titolo *</label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Titolo evento"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Data *</label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Orario *</label>
                    <Input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <Select value={newEvent.type} onValueChange={(value: Event['type']) => setNewEvent(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Riunione</SelectItem>
                        <SelectItem value="call">Chiamata</SelectItem>
                        <SelectItem value="deadline">Scadenza</SelectItem>
                        <SelectItem value="reminder">Promemoria</SelectItem>
                        <SelectItem value="task">Attività</SelectItem>
                        <SelectItem value="review">Revisione</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Priorità</label>
                    <Select value={newEvent.priority} onValueChange={(value: Event['priority']) => setNewEvent(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Bassa</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <Select value={newEvent.category} onValueChange={(value) => setNewEvent(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Luogo</label>
                  <Input
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Luogo riunione o link video"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Descrizione</label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrizione evento"
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Partecipanti</label>
                  <Input
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, attendees: e.target.value }))}
                    placeholder="email1@domain.com, email2@domain.com"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={newEvent.recurring}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, recurring: e.target.checked }))}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="recurring" className="text-sm font-medium">Evento ricorrente</label>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleAddEvent} className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    {editingEvent ? 'Aggiorna Evento' : 'Aggiungi Evento'}
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setShowEventForm(false);
                    setEditingEvent(null);
                    setNewEvent({
                      title: '',
                      date: '',
                      time: '',
                      type: 'meeting',
                      description: '',
                      location: '',
                      attendees: '',
                      priority: 'medium',
                      recurring: false,
                      category: ''
                    });
                  }}>
                    Annulla
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
