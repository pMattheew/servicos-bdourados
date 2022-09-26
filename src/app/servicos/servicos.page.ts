import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { CadastroServicoPage } from '../cadastro-servico/cadastro-servico.page';
import { ServicosService } from '../resources/services/servico.service';
import { Servico } from '../resources/models/servico.model';
import { UsuarioService } from '../resources/services/user.service';

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
    // check de autenticação
    if (!this.usrService.estaLogado())
    {
      this.usrService.deslogar();
      this.nav.navigateBack('/login');
    } 
    else
    {
      const loading = await this.loadingCtrl.create({message:'Carregando serviços...'});
      loading.present();

      this.carregarServicos();

      loading.dismiss();
    }
  }

  async carregarServicos() {

    this.servicos$ = this.servicosService.getServicos().pipe(
      tap((servicos) => {
        return servicos;
      })
    )

  }

  async atualizarServicos(event) {

    this.carregarServicos();

    setTimeout(() => {
      event.target.complete();
    }, 2000);

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

  async excluirServico(id) {

    const loading = await this.loadingCtrl.create({message:'Excluindo...'});
    loading.present();

    this.servicosService.deleteServico(id)
      .pipe(take(1))
      .subscribe(() => {

        document.getElementById(id).classList.remove('card');
        document.getElementById(id).style.margin = '5% auto';
        document.getElementById(id).innerHTML = `
          <div class="alert alert-info">
            Serviço excluído com sucesso!
          </div>
        `;

        loading.dismiss();

      });
    

  }

}
