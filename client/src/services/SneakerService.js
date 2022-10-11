import Api from '@/services/Api'

export default {
    index() {
        return Api().get('sneakers')
    },
    show(sneakerId){
        return Api().get('sneaker/'+sneakerId)
    },
    post(sneaker){
        return Api().post('sneaker', sneaker)
    },
    put(sneaker){
        return Api().put('sneaker/'+sneaker.id, sneaker)
    },
    delete(sneaker){
        return Api().delete('sneaker/'+sneaker.id, sneaker)
    },
}