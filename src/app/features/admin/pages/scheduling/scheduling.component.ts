import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Appointment {
  client: string;
  service: string;
  date: string;
  start: string;
  end: string;
  status: string;
}

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
})
export class SchedulingComponent {
  currentDate = new Date();

  days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

  morningHours = ['08:00', '09:00', '10:00', '11:00'];
  afternoonHours = ['13:00', '14:00', '15:00', '16:00'];
  nightHours = ['18:00', '19:00', '20:00'];

  appointments: Appointment[] = [
    {
      client: 'Maria Souza',
      service: 'Extensão de Cílios',
      start: '08:00',
      end: '09:00',
      status: 'confirmed',
      date: '2026-03-06',
    },
    {
      client: 'Maria Souza',
      service: 'Extensão de Cílios',
      start: '09:00',
      end: '10:00',
      status: 'confirmed',
      date: '2026-03-06',
    },
    {
      client: 'Juliana Almeida',
      service: 'Volume Brasileiro',
      start: '14:00',
      end: '15:00',
      status: 'pending',
      date: '2026-03-06',
    },
    {
      client: 'Juliana Almeida',
      service: 'Volume Brasileiro',
      start: '19:00',
      end: '20:00',
      status: 'finished',
      date: '2026-03-06',
    },
    {
      client: 'Juliana Almeida',
      service: 'Volume Brasileiro',
      start: '18:00',
      end: '19:00',
      status: 'canceled',
      date: '2026-03-06',
    },
    {
      client: 'Juliana Almeida',
      service: 'Volume Brasileiro',
      start: '19:00',
      end: '20:00',
      status: 'canceled',
      date: '2026-03-07',
    },
    {
      client: 'Juliana Almeida',
      service: 'Volume Brasileiro',
      start: '19:00',
      end: '20:00',
      status: 'canceled',
      date: '2026-03-08',
    },
    {
      client: 'Juliana Almeida',
      service: 'Volume Brasileiro',
      start: '08:00',
      end: '09:00',
      status: 'confirmed',
      date: '2026-03-09',
    },
  ];

  appointmentsOfDay: Appointment[] = [];
  appointmentMap: { [hour: string]: Appointment } = {};

  allHours: string[] = [];
  formattedDate = '';

  ngOnInit() {
    this.allHours = [...this.morningHours, ...this.afternoonHours, ...this.nightHours];
    this.updateDate();
    this.generateMap();
    this.getAppointmentsOfDay();
  }

  updateDate() {
    const d = this.currentDate;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    this.formattedDate = `${year}-${month}-${day}`;
  }

  generateMap() {
    const date = this.formattedDate;

    this.appointmentMap = {};

    for (const a of this.appointments) {
      if (a.date === date) {
        this.appointmentMap[a.start] = a;
      }
    }
  }

  getAppointment(hour: string) {
    const date = this.formattedDate;
    console.log(date);

    return this.appointments.find((a) => a.date === date && a.start === hour);
  }

  getAppointmentsOfDay() {
    this.appointmentsOfDay = this.appointments.filter((a) => a.date === this.formattedDate);
  }

  nextDay() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.currentDate = new Date(this.currentDate);

    this.updateDate();
    this.generateMap();
    this.getAppointmentsOfDay();
  }

  prevDay() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.currentDate = new Date(this.currentDate);

    this.updateDate();
    this.generateMap();
    this.getAppointmentsOfDay();
  }
}
