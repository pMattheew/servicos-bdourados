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
    private alerta: AlertController,
    private nav: NavController,
    private usrService: UsuarioService

  ) { }

  ngOnInit() {
    this.initUsuarioForm();
  }

  initUsuarioForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  
  async fazerLogin() {
    const loading = await this.loadingCtrl.create({message:'Carregando...'});
    loading.present();
    
    const alert = await this.alerta.create({
      header: "=D",
      message: 'Usuário logado com sucesso!',
      buttons: ['OK']
    });

    this.usrService.logarUsuario(this.form.value)
    .pipe(take(1))
    .subscribe((usuario) => {
      console.log(usuario);
      loading.dismiss();
      alert.present();
      this.nav.navigateForward('/servicos');
    })

  }

}
