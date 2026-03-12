import { CommonModule } from '@angular/common';
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
//para o backend
//AGENDADA → ainda não começou
//ATIVA → está no período
//ENCERRADA → já terminou
@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent {
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

  ngOnInit() {
    const teste = this.isCampaignActive(this.campaigns[0]);
    console.log(teste);
  }

  // fazer esta regra no backend e so trazer os status
  isCampaignActive(campaigns: Campaign): boolean {
    const today = new Date();
    return today >= campaigns.startDate && today <= campaigns.endDate;
  }
}
