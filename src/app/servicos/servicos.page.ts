import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServicosService } from '../services/servico.service';
import { Servico } from './servico.model';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {
  servicos$: Observable<Servico[]>;

  constructor(
    private servicosService: ServicosService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message:'Carregando...'});
    loading.present();

    this.servicos$ = this.servicosService.getServicos().pipe(
      tap((servicos) => {
        loading.dismiss();
        return servicos;
      })
    )
  }

}
