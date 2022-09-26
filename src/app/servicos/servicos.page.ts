import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CadastroServicoPage } from '../cadastro-servico/cadastro-servico.page';
import { ServicosService } from '../services/servico.service';
import { Servico } from '../models/servico.model';
import { UsuarioService } from '../services/user.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {
  servicos$: Observable<Servico[]>;

  constructor(
    private servicosService: ServicosService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private nav: NavController,
    public usrService: UsuarioService
  ) { }

  async ngOnInit() {

    if (!this.usrService.estaLogado())
    {
      this.usrService.deslogar();
      this.nav.navigateBack('/login');
    } 
    else
    {
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

  async abrirModalEditar(servico: Servico) {
    const modal = await this.modalCtrl.create({
      component: CadastroServicoPage,
      componentProps: { servico: servico }
    })

    await modal.present();

    const { data: servicoAtualizado } = await modal.onDidDismiss();
    // encontra o serviço desatualizado e o atribui o serviço atualizado.
    if (servicoAtualizado)
    {
      this.servicos$ = this.servicos$.pipe(
          map((servicos) => {
            servicos.forEach(serv => {
              if (serv.id === servicoAtualizado.id)
              {
                serv = servicoAtualizado;
              }
              return serv;
            });
            return servicos;
        })
      )
    }
  }

}
