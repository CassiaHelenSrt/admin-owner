import { Component } from '@angular/core';
export interface Campaign {
  id: number;
  name: string;
  description: string;
  banner: string;
  status: 'AGENDADA' | 'ATIVA' | 'ENCERRADA';
  messagesSent: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  stats = {
    clients: 1215,
    appointments: 324,
    revenue: 980,
  };

  appointments = [
    {
      client: 'Alessandra',
      service: 'Corte + Escova',
      time: '10:00',
    },
    {
      client: 'Helena',
      service: 'Coloração',
      time: '11:30',
    },
    {
      client: 'Larissa',
      service: 'Hidratação',
      time: '13:00',
    },
  ];

  campaigns: Campaign[] = [
    {
      id: 1,
      name: 'Promoção Relâmpago',
      description: 'Corte + escova com 30% de desconto',
      banner: '/assets/login.jpg',
      status: 'ATIVA',
      messagesSent: 300,
      startDate: new Date('2026-03-10'),
      endDate: new Date('2026-03-12'),
      createdAt: new Date(),
    },
    {
      id: 1,
      name: 'Promoção Relâmpago',
      description: 'Corte + escova com 30% de desconto',
      banner: '/assets/login.jpg',
      status: 'ENCERRADA',
      messagesSent: 300,
      startDate: new Date('2026-03-10'),
      endDate: new Date('2026-03-12'),
      createdAt: new Date(),
    },
  ];
}
