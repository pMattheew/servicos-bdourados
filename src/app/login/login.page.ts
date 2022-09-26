import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { UsuarioService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private loadingCtrl: LoadingController,
    public alerta: AlertController,
    private nav: NavController,
    private usrService: UsuarioService

  ) { }

  ngOnInit() {
    if (!this.usrService.estaLogado()) 
      this.usrService.deslogar(); 
    else
      this.nav.navigateForward('/servicos');
    
    this.initUsuarioForm();
  }

  initUsuarioForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  
  async criarAlerta(titulo: string, msg: string) {

    const alert = await this.alerta.create({
      header: titulo,
      message: msg,
      buttons: ['OK']
    });

    return alert.present();
  }
  
  async fazerLogin() {

    const loading = await this.loadingCtrl.create({message:'Carregando...'});

    loading.present();

    this.usrService.logarUsuario(this.form.value)
    .pipe(take(1))
    .subscribe(() => {

      this.usrService.logar();
      loading.dismiss();
      this.nav.navigateForward('/servicos');
      this.criarAlerta('=D','Usuário logado com sucesso!');

    }, () => {

      this.usrService.deslogar();
      loading.dismiss();
      this.criarAlerta('Ops!','A autenticação falhou, verifique os dados e tente novamente.');
    })
    
  }

}
