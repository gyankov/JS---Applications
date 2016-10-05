import 'jquery';
import { templateGetter } from 'getTemplates';
import { Data } from 'data';
import toastr from 'toastr';
const content = $('#content');

class UserController {

    static home(context) {
        var materials;
        Data.getMaterials()
            .then(x => {
                console.log(x)
                materials = x;
                return templateGetter.get('materials')
            })
            .then(template => {
                content.html(template(materials.result))
                $('#btn-search').on('click', function () {
                    var pattern = $('#input-search').val();
                    context.redirect('#/home/' + pattern)
                })
            })
    }

    static register(context) {

        if (Data.isLogged()) {
            toastr.error('You are already logged!')
            context.redirect('#/home')

            return;
        }
        templateGetter.get('register')
            .then(template => {
                content.html(template)
            })
            .then(function () {
                $('#btn-signup').on('click', function () {

                    let username = $('#reg-username').val();
                    let password = $('#reg-password').val();

                    let user = {
                        username: username,
                        password: password
                    }

                    Data.register(user)
                        .then(x => {
                            context.redirect('#/login')
                        })
                        .then(x => {
                            toastr.success('Succesfully registered!')
                            context.redirect('#/login')
                        })
                })
            })


    }

    static login(context) {

        if (Data.isLogged()) {
            toastr.error('You are already logged!')
            context.redirect('#/home')

            return;
        }
        templateGetter.get('login')
            .then(template => {
                content.html(template)
            })
            .then(function () {
                $('#btn-login').on('click', function () {

                    let username = $('#login-username').val();
                    let password = $('#login-password').val();
                    let user = {
                        username: username,
                        password: password
                    }


                    Data.login(user)
                        .then(x => {
                            localStorage.setItem('username', x.result.username)
                            localStorage.setItem('authKey', x.result.authKey)
                        })
                        .then(x => {
                            toastr.success('Welcome ' + localStorage.username + '!')
                            context.redirect('#/')
                        })
                })
            })
    }

    static logout(context) {

        if (!Data.isLogged()) {
            toastr.error('You are not logged!')
            context.redirect('#/home')
            return;
        }
        var promise = new Promise((resolve, reject) => {
            localStorage.removeItem('username');
            localStorage.removeItem('authKey');
            toastr.success('Logged out!');
            context.redirect('#/home')
        })

        return promise;
    }

    static getUser(username) {
        var user;
        Data.getUser(username)
            .then(x => {
                user = x;
                return templateGetter.get('profile')
            })
            .then(template => {
                content.html(template(user.result))
            })
    }

    static searchMaterials(pattern) {
        var materials;
        Data.searchMaterials(pattern)
            .then(x => {
                materials = x;
                return templateGetter.get('materials')
            })
            .then(template => {
                content.html(template(materials.result))
                $('#btn-search').on('click', function () {
                    var pattern = $('#input-search').val();
                    window.location = window.location.origin + '#/home/' + pattern
                })
            })
    }

    static getMaterialById(id) {
        var material,
            templ;
        Data.getMaterialById(id)
            .then(x => {
                console.log(x)
                material = x;
                return templateGetter.get('singleMaterial')
            })
            .then(template => {
                templ = template;
                content.html(template(material.result))
                if (Data.isLogged()) {
                    $('#comments-form').removeClass('hidden')
                    $('#status-buttons').removeClass('hidden')

                } else {
                    $('#comments-form').addClass('hidden')
                    $('#status-buttons').addClass('hidden')

                }

                $('#btn-comment').on('click', function () {
                    var text = $('#add-coment-input').val();
                    var headers = {
                        'x-auth-key': localStorage.getItem('authKey')
                    }
                    var data = {
                        "commentText": text
                    }

                    Data.addComment(material.result.id, { data: data, headers: headers })
                        .then(x => {
                            window.location = window.location.origin + '#/home/';
                            window.location = window.location.origin + '#/materials/' + material.result.id

                        })
                })

                $('#status-buttons').on('click', function (ev) {
                     var headers = {
                        'x-auth-key': localStorage.getItem('authKey')
                    }
                    var data = {
                        id: material.result.id,
                        'category': ev.target.id

                    }

                    Data.assignCategory({data: data, headers: headers})
                    .then(x=>{
                        console.log(x)
                        toastr.success('Added to category ' + ev.target.id);
                    })
                   

                })




            })
    }

    static postMaterial(context) {
        if (!Data.isLogged()) {
            toastr.error('You have to be logged in to publish!')
            context.redirect('#/login')
            return;
        }
        templateGetter.get('post')
            .then(template => {
                content.html(template)
            })
            .then(function () {
                $('#btn-post').on('click', function () {

                    let title = $('#title-input').val();
                    let description = $('#description-input').val();
                    let img = $('#img-input').val();

                    var headers = {
                        'x-auth-key': localStorage.getItem('authKey')
                    };
                    var data = {
                        title,
                        description,
                        img
                    }

                    Data.postMaterial({ headers: headers, data: data })
                        .then(x => {
                            context.redirect('#/home')
                        })
                })
            })



    }

     static wantToWatch(){

          if (!Data.isLogged()) {
            toastr.error('You have to be logged!')
            context.redirect('#/home')

            return;
        }

         var categories;
         var headers = {
             'x-auth-key': localStorage.getItem('authKey')
         };

         Data.getByCategory('/want-to-watch', {headers: headers})
         .then(x=>{
             categories = x;
                return templateGetter.get('categories')
         })
         .then(template =>{
                content.html(template(categories.result))
             
         })
     }

     static watched(){

          if (!Data.isLogged()) {
            toastr.error('You have to be logged!')
            context.redirect('#/home')

            return;
        }

         var categories;
         var headers = {
             'x-auth-key': localStorage.getItem('authKey')
         };

         Data.getByCategory('/watched', {headers: headers})
         .then(x=>{
             categories = x;
                return templateGetter.get('categories')
         })
         .then(template =>{
                content.html(template(categories.result))
             
         })

     }

     static watching(){

          if (!Data.isLogged()) {
            toastr.error('You have to be logged!')
            context.redirect('#/home')

            return;
        }

         var categories;
         var headers = {
             'x-auth-key': localStorage.getItem('authKey')
         };

         Data.getByCategory('/watching', {headers: headers})
         .then(x=>{
             categories = x;
                return templateGetter.get('categories')
         })
         .then(template =>{
                content.html(template(categories.result))
             
         })

     }

     static all(){

          if (!Data.isLogged()) {
            toastr.error('You have to be logged!')
            context.redirect('#/home')

            return;
        }

         var categories;
         var headers = {
             'x-auth-key': localStorage.getItem('authKey')
         };

         Data.getByCategory('', {headers: headers})
         .then(x=>{
             categories = x;
                return templateGetter.get('categories')
         })
         .then(template =>{
                content.html(template(categories.result))
             
         })
     }


}

export { UserController}