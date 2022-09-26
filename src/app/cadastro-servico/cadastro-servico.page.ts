import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable, observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ServicosService } from '../services/servico.service';
import { Servico } from '../servicos/servico.model';

@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.page.html',
  styleUrls: ['./cadastro-servico.page.scss'],
})
export class CadastroServicoPage implements OnInit {
  @Input() servico: Servico;
  isEditMode = false;
  form: FormGroup;

  constructor(
    private servicosService: ServicosService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.initAddServicoForm();

    if (this.servico)
    {
      this.isEditMode = true;
      this.setarValoresForm();
    }
  }

  initAddServicoForm() {
    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      preco: new FormControl(null, [Validators.required]),
      descricao: new FormControl(null),
    })
  }

  setarValoresForm() {
    this.form.setValue({
      nome: this.servico.nome,
      preco: this.servico.preco,
      descricao: this.servico.descricao,
    })

    this.form.updateValueAndValidity();
  }

  async fecharModal(data = null) {
    if (this.isEditMode) {
      this.modalCtrl.dismiss(data);
    }
  }

  async enviarServico() {
    const loading = await this.loadingCtrl.create({message:'Carregando...'});
    loading.present();

    let response: Observable<Servico>;

    if (this.isEditMode)
    {
      response = this.servicosService.updateServico(this.servico.id, this.form.value);
    }
    else
    {
      response = this.servicosService.addServico(this.form.value)
    }

      response.pipe(take(1)).subscribe((servico) => {
        this.form.reset();
        loading.dismiss();
        
        
        if (this.isEditMode)
        {
          this.fecharModal(servico)
        }
        else
        {
          let msg = document.createElement('div');
          msg.innerText = "Serviço atualizado com sucesso! Atualize a página.";
          msg.classList.add("alert");
          msg.classList.add("alert-info");
          document.getElementById('ic').appendChild(msg);
        }
      })
  }


}
