import * as t from '../types'

const main = (state ={},action) => {
    switch(action.type){
        case t.GET_ALL_APPS:
            return {...state, mainData:action.payload}
        default:
            return {...state};
    }
}

export default main;