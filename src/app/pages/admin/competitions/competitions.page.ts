import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
import { AlertService } from 'src/app/services/alert.service';
import { Competition, CompetitionsService } from 'src/app/services/competitions.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.page.html',
  styleUrls: ['./competitions.page.scss'],
  standalone: false
})
export class CompetitionsPage implements OnInit {

  breadcrumbs = [
    { label: 'breadcrumbs.admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'breadcrumbs.competitions', navigate: '/admin/competitions', icon: 'trophy-outline' }
  ];

  addingCompetition: boolean = false;
  editingCompetition: boolean = false;

  competitions: Competition[] = [];
  filteredCompetitions: Competition[] = [];

  newCompetition: Competition = {
    _id: '',
    title: {
      ca: '',
      es: '',
      en: ''
    }, 
    description: {
      ca: '',
      es: '',
      en: ''
    }, 
    images: []
  };

  uploadedImagesFiles: File[] = [];
  uploadedImages: string[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  constructor(
    private competitionsService: CompetitionsService,
    private alertService: AlertService,
    private alertConfirmService: AlertConfirmService
  ) { }

  ngOnInit() {
    this.loadCompetitions();
  }

  /**
   * Cargar todos las competiciones desde la API
   */
  loadCompetitions() {
    this.competitionsService.getAllCompetitions().subscribe(response => {
      this.competitions = response;
      this.filteredCompetitions = response;
    });
  }

  toggleAddCompetition() {
    this.addingCompetition = !this.addingCompetition;
    if (!this.addingCompetition) {
      this.resetForm();
    }
    if (this.editingCompetition) {
      this.resetForm();
      this.editingCompetition = !this.editingCompetition;
    }
  }

  resetForm() {
    this.newCompetition = {
      _id: '',
      title: {
        ca: '',
        es: '',
        en: ''
      }, 
      description: {
        ca: '',
        es: '',
        en: ''
      }, 
      images: []
    };
    this.uploadedImages = [];
    this.uploadedImagesFiles = [];
  }

  /**
   * Filtrar competiciones en la barra de búsqueda
   * @param event - Evento del ion-searchbar
   */
  filterCompetitions(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredCompetitions = this.competitions;
      return;
    }

    this.filteredCompetitions = this.competitions.filter(competition => (
      competition.title.ca.toLowerCase().includes(searchTerm) ||
      competition.title.es.toLowerCase().includes(searchTerm) ||
      competition.title.en.toLowerCase().includes(searchTerm)
    ));
  }

  toggleEditingCompetition(competition: Competition) {
    if (this.addingCompetition) {
      this.resetForm();
      this.addingCompetition = !this.addingCompetition;
    }
    this.newCompetition = JSON.parse(JSON.stringify(competition));
    this.uploadedImages = competition.images;
    this.editingCompetition = true;
  }

  onFileSelected(event: any) {
    const files = event.target.files as FileList;
    if (files && files.length) {
      this.uploadedImagesFiles = [];
  
      Array.from(files).forEach((file: File) => {
        this.uploadedImagesFiles.push(file);
      });

      this.uploadedImages = [];

      Array.from(files as FileList).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  saveCompetition () {
    if (this.uploadedImagesFiles.length > 0) {
      const formData = new FormData();
      formData.append('competition', JSON.stringify(this.newCompetition));
      this.uploadedImagesFiles.forEach((file, index) => {
        formData.append(`images`, file);
      });
      this.competitionsService.postCompetition(formData).subscribe({
        next: () => {
          this.loadCompetitions();
          this.alertService.showAlert('success', 'settings.competitions.added_title', 'settings.competitions.added_message');
          this.toggleAddCompetition();
        },
        error: (error) => {
          if (error.status === 400) {
            this.alertService.showAlert('error', 'alerts.duplicate_title', 'alerts.duplicate_message');
          } else {
            this.alertService.showAlert('error', 'alerts.error_title', 'settings.competitions.error_message');
            this.toggleAddCompetition();
          }
        }
      });
    } else {
      this.alertService.showAlert('error', 'settings.competitions.images_required', 'settings.competitions.images_required_message');
    }
  }

  updateCompetition () {
    const formData = new FormData();
    formData.append('competition', JSON.stringify(this.newCompetition));
    this.uploadedImagesFiles.forEach((file, index) => {
      formData.append(`images`, file);
    });
    this.competitionsService.updateCompetition(this.newCompetition._id, formData).subscribe({
      next: () => {
        this.loadCompetitions();
        this.alertService.showAlert('success', 'settings.competitions.updated', 'settings.competitions.updatedMessage');
        this.editingCompetition = false;
      },
      error: (error) => {
        this.alertService.showAlert('error', 'alerts.error_title', 'settings.competitions.error_message');
        this.editingCompetition = false;
      }
    });
  }

  async confirmDelete() {
    const confirmed = await this.alertConfirmService.showAlert('error', 'general.delete', 'settings.competitions.delete');
    if (confirmed) {
      this.deleteCompetitions();
    } 
  }

  deleteCompetitions() {
    this.competitionsService.deleteCompetition(this.newCompetition._id).subscribe(() => {
      this.loadCompetitions();
      this.alertService.showAlert('success', 'settings.competitions.deleted', 'settings.competitions.deletedMessage');
      this.editingCompetition = false;
      this.resetForm();
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'settings.competitions.error_delete');
      this.editingCompetition = false;
      this.resetForm();
    });
  }

}
