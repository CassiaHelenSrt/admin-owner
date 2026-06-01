import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from '@shared/modal/modal.component';
import { SchedulingModalComponent } from '../../components/scheduling-modal/scheduling-modal.component ';
import { SchedulingService } from '../../services/scheduling';

interface Appointment {
  client: string;
  service: string;
  start: string;
  end: string;
  status: string;
}
@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [CommonModule, ModalComponent, SchedulingModalComponent],
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
})
export class SchedulingComponent {
  currentDate = new Date();

  morningHours: string[] = [];
  afternoonHours: string[] = [];
  nightHours: string[] = [];
  appointments: Appointment[] = [];

  modalType: 'create' | null = null;
  selectedItem: any = null;

  appointmentsOfDay: Appointment[] = [];
  appointmentMap: { [hour: string]: Appointment } = {};

  allHours: string[] = [];
  formattedDate = '';

  constructor(private schedulingService: SchedulingService) {
    this.loadSchedules();
  }

  ngOnInit(): void {
    this.updateCalendarView();
  }

  loadSchedules() {
    const year = this.currentDate.getFullYear();
    const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(this.currentDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const productId = 3;

    this.schedulingService.getAvailableSlots(dateStr, productId).subscribe({
      next: (slotsData) => {
        this.processHours(slotsData.slots || []);

        this.schedulingService.getScheduling(dateStr).subscribe({
          next: (schedulesData) => {
            this.processAppointments(schedulesData);
          },
          error: (err) => console.error('Erro ao buscar agendamentos:', err),
        });
      },
      error: (err) => {
        console.error('Erro ao buscar blocos de horário:', err);
        this.clearScreen();
      },
    });
  }

  processHours(slotsFromBackend: any[]) {
    this.allHours = [];
    this.morningHours = [];
    this.afternoonHours = [];
    this.nightHours = [];

    slotsFromBackend.forEach((slot) => {
      const hourStr = slot.time;
      const hourNum = parseInt(hourStr.split(':')[0], 10);

      this.allHours.push(hourStr);

      if (hourNum < 12) {
        this.morningHours.push(hourStr as never);
      } else if (hourNum >= 12 && hourNum < 18) {
        this.afternoonHours.push(hourStr as never);
      } else {
        this.nightHours.push(hourStr as never);
      }
    });
  }

  processAppointments(backendData: any): void {
    this.appointmentMap = {};

    // Blindagem caso o backend retorne o formato de turnos ou lista pura
    const list = Array.isArray(backendData) ? backendData : backendData?.todos || [];

    this.appointmentsOfDay = list.map((item: any) => {
      const dateLocal = new Date(item.startTime);

      const hours = String(dateLocal.getHours()).padStart(2, '0');
      const minutes = String(dateLocal.getMinutes()).padStart(2, '0');

      const startHour = `${hours}:${minutes}`;

      const dateEndLocal = new Date(item.endTime);
      const endHours = String(dateEndLocal.getHours()).padStart(2, '0');
      const endMinutes = String(dateEndLocal.getMinutes()).padStart(2, '0');
      const endHour = `${endHours}:${endMinutes}`;

      const appointment: Appointment = {
        client: item.client?.name || 'Cliente Sem Nome',
        service: item.product?.name || 'Serviço Não Informado',
        start: startHour,
        end: endHour,
        status: item.status || 'pending',
      };

      this.appointmentMap[startHour] = appointment;

      console.log('appointment', appointment);
      return appointment;
    });
  }

  nextDay() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.currentDate = new Date(this.currentDate);
    this.updateCalendarView();
  }

  prevDay() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.currentDate = new Date(this.currentDate);
    this.updateCalendarView();
  }

  private updateCalendarView(): void {
    this.formattedDate = this.currentDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    this.loadSchedules();
  }

  private clearScreen(): void {
    this.allHours = [];
    this.morningHours = [];
    this.afternoonHours = [];
    this.nightHours = [];
    this.appointmentsOfDay = [];
    this.appointmentMap = {};
  }

  openCreateModal() {
    this.selectedItem = null; // importante
    this.modalType = 'create';
  }

  closeModal() {
    this.modalType = null;
    this.selectedItem = null;
  }

  createAppointment(data: any) {
    const newAppointment = {
      ...data,
      id: Date.now(),
    };

    this.appointments.push(newAppointment);

    console.log('form', this.appointments.push(newAppointment));
  }

  handleSave(data: any) {
    this.createAppointment(data);
    this.closeModal();
  }
}
