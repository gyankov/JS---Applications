import Sammy from 'sammy';
import 'jquery';
import { UserController } from 'userControllers';

const content = '#content';

var sammyApp = new Sammy(content, function () {
    this.get('#/', function () {
        this.redirect('#/home')
    });
    this.get('#/home', UserController.home);
    this.get('#/register', UserController.register);
    this.get('#/login', UserController.login);
    this.get('#/logout', UserController.logout);
    this.get('#/profiles/:username', function () {
        UserController.getUser(this.params.username)
    });
    this.get('#/home/:pattern', function () {
        UserController.searchMaterials(this.params.pattern)
    });
    this.get('#/materials/:id', function () {
        UserController.getMaterialById(this.params.id)
    });

    this.get('#/post', UserController.postMaterial);
    this.get('#/want-to-watch', UserController.wantToWatch);
    this.get('#/watched',UserController.watched )
    this.get('#/watching',UserController.watching )
    this.get('#/categories',UserController.all )
    
    

});


$(function () {
    sammyApp.run('#/');
});