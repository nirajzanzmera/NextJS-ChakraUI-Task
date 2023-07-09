import * as t from '../types'
import axios from 'axios'

export function fetchAllApps(){
    const request = axios.get()
    .then(response=>response.data)
    return{
        type:t.GET_ALL_APPS,
        payload:request
    }
}
