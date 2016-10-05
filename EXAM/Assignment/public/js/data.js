import { Requester } from 'requester'
import 'jquery'


class Data {
    static getMaterials() {
        var url = 'api/materials'
        return Requester.get(url)
    }

    static register(user) {
        var url = 'api/users';
        return Requester.post(url, { data: user })
    }

    static login(user) {
        var url = 'api/users/auth/';
        return Requester.put(url, { data: user })
    }

    static isLogged() {
        var name = localStorage.getItem('username');
        if (name) {
            return true;
        }

        return false;
    }

    static getUser(username) {
        var url = 'api/profiles/' + username;
        return Requester.get(url);
    }

    static searchMaterials(pattern) {
        var url = 'api/materials?filter=' + pattern;
        return Requester.get(url);
    }

    static getMaterialById(id) {
        var url = 'api/materials/' + id;
        return Requester.get(url);
    }
    
    static addComment(id, comment){
        var url = 'api/materials/'+id+'/comments';
        return Requester.put(url, comment);
    }

    static postMaterial(material){
        var url = 'api/materials';
        return Requester.post(url, material)
    }

    static assignCategory(category){
        var url = 'api/user-materials';
        return Requester.post(url, category)
    }
    static getByCategory(type, category){
        var url = 'api/user-materials'+type;
        return Requester.get(url, category)
    }

}

export {Data}